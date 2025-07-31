const newQuote = document.querySelector("#js-new-quote");
newQuote.addEventListener('click', getQuote);

const showAnswer = document.querySelector("#js-tweet");
showAnswer.addEventListener('click', displayAnswer);

const endpoint = "https://trivia.cyberwisp.com/getrandomchristmasquestion";

let json = ''; 

async function getQuote() {
  try {
    
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw Error(response.statusText);
    }

    json = await response.json();
    displayQuote(json.question);
    clearAnswer(); 
  } catch (err) {
    console.log(err); 
    alert('Failed to fetch a new trivia.');
  }
}

function displayQuote(quote) {
  const quoteText = document.querySelector('#js-quote-text');
  quoteText.textContent = quote;
}

function displayAnswer() {
  const answerArea = document.querySelector("#js-answer-text");
  answerArea.textContent = json.answer;
}

function clearAnswer() {
  const answerArea = document.querySelector("#js-answer-text");
  answerArea.textContent = "";
}

getQuote();

