const customName = document.getElementById('customname');
const randomize = document.querySelector('.randomize');
const story = document.querySelector('.story');

function randomValueFromArray(array){
  const random = Math.floor(Math.random()*array.length);
  return array[random];
}

const storyText = "It was a 94 fahrenheit in New York, so :insertx: swung through the city. When they reached :inserty:, they stopped in shock for a moment, then :insertz:. Bob saw the whole thing — he couldn’t believe :insertx: had such incredible powers, but he wasn’t surprised, :insertx: had carried over 300 pounds before.";

const insertX = ["Spiderman", "Venom", "Spider-Gwen"];

const insertY = ["the Statue of Liberty", "the Empire State Building", "the Brooklyn Bridge"];

const insertZ = [ "knocked out Doc Ock in one punch", "webbed up the Green Goblin", "swung kicked the Lizard"];

randomize.addEventListener('click', result);

function result() {

    let newStory = storyText
    
    const xItem = randomValueFromArray(insertX);
    const yItem = randomValueFromArray(insertY);
    const zItem = randomValueFromArray(insertZ);

    newStory = newStory.replace(/:insertx:/g, xItem);
    newStory = newStory.replace(":inserty:", yItem);
    newStory = newStory.replace(":insertz:", zItem);

  if(customName.value !== '') {
    const name = customName.value;
    newStory = newStory.replace("Bob", name);

  }

  if(document.getElementById("uk").checked) {
    const weight = Math.round(300);
    const temperature =  Math.round(94);

  }

  if(document.getElementById("uk").checked) {
    const weight = Math.round(300 / 14) + " stone";
    const temperature = Math.round((94 - 32) * 5 / 9) + " centigrade";

    newStory = newStory.replace("94 fahrenheit", temperature);
    newStory = newStory.replace("300 pounds", weight);
  }

  story.textContent = newStory;
  story.style.visibility = 'visible'
}
