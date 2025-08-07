window.phoneNumber = "";

function randomizeButtonPositions() {
  const positions = [];
  const buttonSize = 50;
  const minDistance = 60;

  const clearButton = document.querySelector('.clear-button');
  const topBoundary = clearButton.offsetTop + clearButton.offsetHeight + 20;
  const bottomBoundary = window.innerHeight - 20;
  const availableHeight = bottomBoundary - topBoundary;

  for (let i = 0; i <= 9; i++) {
    const btn = document.querySelector('.btn' + i);
    let valid = false;
    let attempts = 0;
    let randTop, randLeft;

    while (!valid && attempts < 100) {
      randTop = topBoundary + Math.floor(Math.random() * (availableHeight - buttonSize));
      randLeft = Math.floor(Math.random() * (window.innerWidth - buttonSize));

      if (randTop < topBoundary || randTop > bottomBoundary - buttonSize) {
        attempts++;
        continue;
      }

      valid = true;

      for (let j = 0; j < positions.length; j++) {
        const dx = randLeft - positions[j].left;
        const dy = randTop - positions[j].top;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < minDistance) {
          valid = false;
          break;
        }
      }

      attempts++;
    }

    positions.push({ top: randTop, left: randLeft });
    btn.style.position = 'absolute';
    btn.style.top = randTop + "px";
    btn.style.left = randLeft + "px";
  }
}

// Run on page load
window.onload = function () {
  randomizeButtonPositions();

  setTimeout(function () {
    const overlay = document.getElementById('intro-overlay');
    if (overlay) {
      overlay.style.display = 'none';
    }
    alert("Oh no! The numbers passed away and turned into ghosts! Find their ghosts around the page to input your phone number.");
  }, 4000);
};

function addDigit(digit) {
  window.phoneNumber = window.phoneNumber + digit;
  document.getElementById("phone").innerHTML = window.phoneNumber;
}

function clearPhone() {
  window.phoneNumber = "";
  document.getElementById("phone").innerHTML = "";

  const confirmBox = document.getElementById("confirmation-box");
  if (confirmBox) {
    confirmBox.style.display = "none";
  }

  randomizeButtonPositions();
}

function confirmPhone() {
  const userInput = prompt("CAPTCHA, prove your human and type in the code:\n Hint: one of Michael Jordan's jersey numbers + Universe code of the Citadel of Ricks × the 38th digit of Pi squared. Now divide that by 2.");

  

  const cleanedInput = userInput.replace(/,/g, '').trim();

  if (cleanedInput !== "5571") {
    alert("Hahahahahah try again.");
    clearPhone();
  } else {
    const confirmBox = document.getElementById("confirmation-box");
    confirmBox.style.display = "block";
  }
}
