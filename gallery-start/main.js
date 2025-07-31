const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
const imageFilenames = ['spiderman1.jpg', 'spiderman2.webp', 'spiderman3.jpg', 'spiderman4.webp', 'spidergwen.jpeg'];
/* Declaring the alternative text for each image file */

const altTexts = {'spiderman1.jpg': 'Andrew Garfield Spiderman', 'spiderman2.webp': 'Tobey Maguire Spiderman', 'spiderman3.jpg': 'Tom Holland Spiderman', 'spiderman4.webp': 'Miles Morales Spiderman', 'spidergwen.jpeg': 'Gwen Stacy Spiderwoman'};

/* Looping through images */

for (let i = 0; i < imageFilenames.length; i++) {
    const newImage = document.createElement('img');
    newImage.setAttribute('src', `../img/${imageFilenames[i]}`);
    newImage.setAttribute('alt', altTexts[imageFilenames[i]]);
    
    newImage.addEventListener('click', function() {
    displayedImage.setAttribute('src', `../img/${imageFilenames[i]}`);
    displayedImage.setAttribute('alt', altTexts[imageFilenames[i]]);});

    thumbBar.appendChild(newImage);
  }

/* Wiring up the Darken/Lighten button */

btn.addEventListener('click', function () {
    const currentClass = btn.getAttribute('class');
  
    if (currentClass === 'dark') {
      btn.setAttribute('class', 'light');
      btn.textContent = 'Lighten';
      overlay.style.backgroundColor = 'rgb(0 0 0 / 50%)';
    } else {
      btn.setAttribute('class', 'dark');
      btn.textContent = 'Darken';
      overlay.style.backgroundColor = 'rgb(0 0 0 / 0%)';
    }
  });