// const quoteContainer = document.getElementById("quote-container");
// const quoteText = document.getElementById("quote");
// const authorText = document.getElementById("author");
// const twitterBtn = document.getElementById("twitter");
// const newQuoteBtn = document.getElementById("new-quote");
// // Get Quote from API

// const proxyUrl = "https://api.allorigins.win/raw?url=";
// const apiUrl = "https://zenquotes.io/api/random";

// async function getQuote() {
//   try {
//     const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));
//     const data = await response.json();
//     console.log(data);

//     // If author is blank replace unknown
//     if (data.quoteAuthor === "") {
//       authorText.innerText = "Unknown";
//     } else {
//       authorText.innerText = data.quoteAuthor;
//     }

//     // Reduce font size for long quotes
//     if (data.quoteText.length > 120) {
//       quoteText.classList.add("long-quote");
//     } else {
//       quoteText.classList.remove("long-quote");
//     }

//     quoteText.innerText = data.quoteText;
//   } catch (error) {
//     getQuote();
//   }
// }

// // Tweet quote
// function tweetQuote() {
//   const quote = quoteText.innerText;
//   const author = authorText.innerText;
//   const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} -${author}`;
//   window.open(twitterUrl, "_blank");
// }

// // Event listeners
// newQuoteBtn.addEventListener("click", getQuote);
// twitterBtn.addEventListener("click", tweetQuote);

// getQuote();

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");

// API URL with CORS Proxy
const proxyUrl = "https://api.allorigins.win/raw?url=";
const apiUrl = "https://zenquotes.io/api/quotes";

let quotesArray = [];
let currentIndex = 0;

// Fetch multiple quotes
async function getQuotes() {
  try {
    const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));
    quotesArray = await response.json(); // Store quotes in an array
    currentIndex = 0; // Reset index
    showQuote(); // Show the first quote
  } catch (error) {
    console.log("Whoops, no quotes", error);
  }
}

// Display the current quote
function showQuote() {
  if (quotesArray.length > 0) {
    const quote = quotesArray[currentIndex].q;
    const author = quotesArray[currentIndex].a || "Unknown";

    quoteText.innerText = quote;
    authorText.innerText = author;

    // Reduce font size for long quotes
    if (quote.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }

    // Move to next quote (loop back to the start if needed)
    currentIndex = (currentIndex + 1) % quotesArray.length;
  }
}

// Tweet quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

// Event listeners
newQuoteBtn.addEventListener("click", showQuote);
twitterBtn.addEventListener("click", tweetQuote);

// Fetch quotes on page load
getQuotes();
