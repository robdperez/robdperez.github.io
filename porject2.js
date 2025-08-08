window.phoneNumber = "";

/* randomize locations */
function randomizeButtonPositions() {
    const positions = [];
    const buttonSize = 50;
    const minDistance = 60;

    /* prevent overlap buttons */
    const clearButton = document.querySelector('.clear-button');
    const topBoundary = clearButton.offsetTop + clearButton.offsetHeight + 20;
    const bottomBoundary = window.innerHeight - 20;
    const availableHeight = bottomBoundary - topBoundary;

    /* loop to randomize */
    for (let i = 0; i <= 9; i++) {
        const btn = document.querySelector('.btn' + i);
        let valid = false;
        let attempts = 0;
        let randTop, randLeft;

        /* try to find a good spot */
        while (!valid && attempts < 100) {
            randTop = topBoundary + Math.floor(Math.random() * (availableHeight - buttonSize));
            randLeft = Math.floor(Math.random() * (window.innerWidth - buttonSize));

            if (randTop < topBoundary || randTop > bottomBoundary - buttonSize) {
                attempts++;
                continue;
            }

            valid = true;

            /* check if it's too close to other buttons */
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

        /* save position and move button there */
        positions.push({ top: randTop, left: randLeft });
        btn.style.position = 'absolute';
        btn.style.top = randTop + "px";
        btn.style.left = randLeft + "px";
    }
}

/* shows rip box */
function showRipBox() {
    document.getElementById('rip-box').style.display = 'block';
}

/* hides rip box */
function hideRipBox() {
    document.getElementById('rip-box').style.display = 'none';
}

/* shows captcha box */
function showCaptchaBox() {
    const captchaBox = document.getElementById('captcha-box');
    captchaBox.style.display = 'block';
    document.getElementById('captcha-input').value = '';
    setTimeout(() => {
        document.getElementById('captcha-input').focus();
    }, 100);
}

function closeCaptchaBox() {
    document.getElementById('captcha-box').style.display = 'none';
}

/* intro overlay delay, rip message */
window.onload = function () {
    setTimeout(function () {
        const overlay = document.getElementById('intro-overlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
        showRipBox();
    }, 4000);
};

/* adds digit to phone number */
function addDigit(digit) {
    window.phoneNumber += digit;
    document.getElementById("phone").innerHTML = window.phoneNumber;

    const errorBox = document.getElementById("error-box");
    if (errorBox) errorBox.style.display = "none";

    const confirmBox = document.getElementById("confirmation-box");
    if (confirmBox) confirmBox.style.display = "none";

    hideRipBox();
}

/* clears phone number and resets buttons */
function clearPhone() {
    window.phoneNumber = "";
    document.getElementById("phone").innerHTML = "";

    const confirmBox = document.getElementById("confirmation-box");
    if (confirmBox) confirmBox.style.display = "none";

    const errorBox = document.getElementById("error-box");
    if (errorBox) errorBox.style.display = "none";

    hideRipBox();
    randomizeButtonPositions();
}

/* checks if phone number is valid */
function confirmPhone() {
    if (window.phoneNumber.length !== 10) {
        const errorBox = document.getElementById("error-box");
        if (errorBox) errorBox.style.display = "block";

        const confirmBox = document.getElementById("confirmation-box");
        if (confirmBox) confirmBox.style.display = "none";

        hideRipBox();
        return;
    }

    showCaptchaBox();
}

/* checks answer */
function submitCaptcha() {
    const input = document.getElementById('captcha-input').value.trim();

    /* alow for commas and spaces*/
    const normalizedInput = input.replace(/,/g, '');

    if (normalizedInput === "5571") {
        closeCaptchaBox();

        const confirmBox = document.getElementById("confirmation-box");
        if (confirmBox) confirmBox.style.display = "block";

        const errorBox = document.getElementById("error-box");
        if (errorBox) errorBox.style.display = "none";
    } else {
        /* wrong answer error */
        const errorBox = document.getElementById("error-box");
        if (errorBox) {
            closeCaptchaBox();
            errorBox.textContent = "CAPTCHA Incorrect";
            errorBox.style.display = "block";
        }

        const confirmBox = document.getElementById("confirmation-box");
        if (confirmBox) confirmBox.style.display = "none";
    }
}
