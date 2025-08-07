window.phoneNumber = "";

/* randomize locations*/
function randomizeButtonPositions() {
  const positions = [];
  const buttonSize = 50;
  const minDistance = 60;

  /*  prevent overlap with buttons*/
  const clearButton = document.querySelector('.clear-button');
  const topBoundary = clearButton.offsetTop + clearButton.offsetHeight + 20;
  const bottomBoundary = window.innerHeight - 20;
  const availableHeight = bottomBoundary - topBoundary;

  // loop to randomize
  for (let i = 0; i <= 9; i++) {
    const btn = document.querySelector('.btn' + i);
    let valid = false;
    let attempts = 0;
    let randTop, randLeft;

    // try to find a spot that isn't too close to others
    while (!valid && attempts < 100) {
      randTop = topBoundary + Math.floor(Math.random() * (availableHeight - buttonSize));
      randLeft = Math.floor(Math.random() * (window.innerWidth - buttonSize));

      if (randTop < topBoundary || randTop > bottomBoundary - buttonSize) {
        attempts++;
        continue;
      }

      valid = true;

      // check if it's too close to other buttons
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

    // save position and move button there
    positions.push({ top: randTop, left: randLeft });
    btn.style.position = 'absolute';
    btn.style.top = randTop + "px";
    btn.style.left = randLeft + "px";
  }
}

window.onload = function () {
  randomizeButtonPositions();

  // hide intro and show alert
  setTimeout(function () {
    const overlay = document.getElementById('intro-overlay');
    if (overlay) {
      overlay.style.display = 'none';
    }
    alert("Oh no! The numbers passed away and turned into ghosts! Find their ghosts around the page to input your phone number.");
  }, 4000);
};

// adds digit to phone number
function addDigit(digit) {
  window.phoneNumber = window.phoneNumber + digit;
  document.getElementById("phone").innerHTML = window.phoneNumber;
}

// clears phone number and resets buttons
function clearPhone() {
  window.phoneNumber = "";
  document.getElementById("phone").innerHTML = "";

  const confirmBox = document.getElementById("confirmation-box");
  if (confirmBox) {
    confirmBox.style.display = "none";
  }

  randomizeButtonPositions();
}

// checks if user's answer is correct
function confirmPhone() {
  const userInput = prompt("CAPTCHA, prove your human and type in the code:\n Hint: one of Michael Jordan's jersey numbers + Universe code of the Citadel of Ricks × the 38th digit of Pi squared. Now divide that by 2.");

  // remove commas and spaces
  const cleanedInput = userInput.replace(/,/g, '').trim();

  // wrong answer resets everything
  if (cleanedInput !== "5571") {
    alert("Hahahahahah try again.");
    clearPhone();
  } else {
    // correct answer shows verification message
    const confirmBox = document.getElementById("confirmation-box");
    confirmBox.style.display = "block";
  }
}
