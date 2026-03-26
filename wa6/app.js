// ===== Helpers =====
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function safeJsonParse(str, fallback) {
  try { return JSON.parse(str); } catch { return fallback; }
}

// ===== Footer year =====
const yearEl = $('[data-year]');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Theme toggle (saved) =====
const themeToggle = $('[data-theme-toggle]');
const root = document.documentElement;

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  if (themeToggle) {
    themeToggle.innerHTML = theme === "light"
      ? "<span aria-hidden='true'>☀</span>"
      : "<span aria-hidden='true'>☾</span>";
  }
}

const savedTheme = localStorage.getItem("theme");
applyTheme(savedTheme === "light" ? "light" : "dark");

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") || "dark";
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem("theme", next);
  });
}

// ===== Mobile nav =====
const navToggle = $('[data-nav-toggle]');
const navLinks = $('[data-nav-links]');

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  $$('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// ===== Modal =====
const modal = $('[data-modal]');
const modalCloseEls = $$('[data-modal-close]');
let lastFocused = null;

const modalProject = $('[data-modal-project]');
const modalImage = $('[data-modal-image]');
const modalTitle = $('[data-modal-title]');
const modalSubtitle = $('[data-modal-subtitle]');
const modalYear = $('[data-modal-year]');
const modalRole = $('[data-modal-role]');
const modalTools = $('[data-modal-tools]');
const modalProblem = $('[data-modal-problem]');
const modalSolution = $('[data-modal-solution]');
const modalResults = $('[data-modal-results]');
const modalGallery = $('[data-modal-gallery]');
const modalImg = $('[data-modal-img]');

function openModal(mode) {
  if (!modal) return;
  lastFocused = document.activeElement;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  modal.setAttribute("data-mode", mode);
  document.body.style.overflow = "hidden";
  $(".modal-close", modal)?.focus();
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("data-mode");
  document.body.style.overflow = "";
  if (lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
}

modalCloseEls.forEach(el => el.addEventListener("click", closeModal));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal?.classList.contains("is-open")) closeModal();
});

function openProjectModalFromCard(card) {
  const title = card.dataset.title || "Project";
  const subtitle = card.dataset.subtitle || "";
  const year = card.dataset.year || "";
  const role = card.dataset.role || "";
  const tools = card.dataset.tools || "";
  const problem = card.dataset.problem || "";
  const solution = card.dataset.solution || "";
  const results = card.dataset.results || "";
  const images = safeJsonParse(card.dataset.images, []);

  if (modalTitle) modalTitle.textContent = title;
  if (modalSubtitle) modalSubtitle.textContent = subtitle;
  if (modalYear) modalYear.textContent = year;
  if (modalRole) modalRole.textContent = role;
  if (modalTools) modalTools.textContent = tools;
  if (modalProblem) modalProblem.textContent = problem;
  if (modalSolution) modalSolution.textContent = solution;
  if (modalResults) modalResults.textContent = results;

  if (modalGallery) {
    modalGallery.innerHTML = "";
    (images || []).slice(0, 6).forEach((src, i) => {
      const shot = document.createElement("button");
      shot.type = "button";
      shot.className = "shot";
      shot.setAttribute("aria-label", `Open image ${i + 1} for ${title}`);
      shot.innerHTML = `<img src="${src}" alt="${title} image ${i + 1}" loading="lazy">`;
      shot.addEventListener("click", () => openImageModal(src, `${title} image ${i + 1}`));
      modalGallery.appendChild(shot);
    });
  }

  openModal("project");
}

function openImageModal(src, alt) {
  if (modalImg) {
    modalImg.src = src;
    modalImg.alt = alt || "Gallery image";
  }
  openModal("image");
}

// “View Case Study” buttons (don’t open modal when clicking demo link)
$$("[data-open-details]").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const card = btn.closest(".card");
    if (card) openProjectModalFromCard(card);
  });
});

// Allow clicking card background to open case study too
$$(".card").forEach(card => {
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openProjectModalFromCard(card);
    }
  });
  card.addEventListener("click", (e) => {
    // if they clicked a link/button, ignore
    if (e.target.closest("a,button")) return;
    openProjectModalFromCard(card);
  });
});

// Graphic design gallery -> click image to view larger
$$("[data-gallery-src]").forEach(btn => {
  btn.addEventListener("click", () => {
    const src = btn.getAttribute("data-gallery-src");
    const img = btn.querySelector("img");
    openImageModal(src, img?.alt || "Design image");
  });
});
