const newQuote = document.querySelector("#js-new-quote");
newQuote.addEventListener('click', getHero);

const showAnswer = document.querySelector("#js-tweet");
showAnswer.addEventListener('click', displayAnswer);

const endpoint = "https://akabab.github.io/superhero-api/api/all.json";

let allHeroes = []; 
let json = ''; 

async function loadHeroes() {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) throw Error(response.statusText);

    allHeroes = await response.json();
    getHero();
  } catch (err) {
    console.log(err); 
    alert('Failed to fetch superhero data.');
  }
}

function getHero() {
  const randomIndex = Math.floor(Math.random() * allHeroes.length);
  json = allHeroes[randomIndex];
  displayQuote(json.name, json.images.md);
  clearAnswer(); 
}

function displayQuote(name, imageUrl) {
  const quoteText = document.querySelector('#js-quote-text');
  quoteText.innerHTML = `
    <strong>${name}</strong><br>
    <img src="${imageUrl}" alt="${name}" style="max-width: 200px;">
  `;
}

function displayAnswer() {
  const stats = json.powerstats;
  const answerArea = document.querySelector("#js-answer-text");

  let statsHTML = `<ul>`;
  for (let stat in stats) {
    statsHTML += `<li><strong>${stat}:</strong> ${stats[stat]}</li>`;
  }
  statsHTML += `</ul>`;

  answerArea.innerHTML = statsHTML;
}

function clearAnswer() {
  document.querySelector("#js-answer-text").innerHTML = "";
}

loadHeroes();