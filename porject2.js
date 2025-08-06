 window.phoneNumber = "";

  function addDigit(digit) {
    window.phoneNumber = window.phoneNumber + digit;

    document.getElementById("phone").innerHTML = window.phoneNumber;
  }

  function clearPhone() {
    window.phoneNumber = "";

    document.getElementById("phone").innerHTML = "";
  }

  function confirmPhone() {
    var userInput = prompt("Enter the secret code to confirm the phone number:\n Hint: one of Michael Jordans jersey numbers + Universe code of the citadel of Ricks times the 38th digit of Pi squared. Now find a factor of that number you just calculated and thats the answer");
  
    if (userInput !== "5,571") {
      alert("Hahahahahah try again.");
      clearPhone();
    } else {
      alert("Phone number confirmed!");
    }
  }