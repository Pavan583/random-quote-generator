const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterButton = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')
let apiQuotes = []
//show loading
function loading() {
  loader.hidden = false
  quoteContainer.hidden = true
}

// hide loading
function complete() {
  quoteContainer.hidden = false
  loader.hidden = true
}

// New Quote function
function newQuote() {
  loading()
  // pick random quote from the Quote array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
  authorText.textContent = quote.author
  if (quote.text.length > 100) {
    quoteText.classList.add('long-quote')
  } else {
    quoteText.classList.remove('long-quote')
  }

  quoteText.textContent = quote.text
  complete()
}
// Get quotes from API's
async function getQuotes() {
  loading()
  const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'
  try {
    const response = await fetch(apiUrl)
    apiQuotes = await response.json()
    newQuote()
  } catch (error) {
    alert(error)
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet${quoteText.textContent} - ${authorText.textContent}`
  window.open(twitterUrl, '_blank')
}

// Event listeners
newQuoteBtn.addEventListener('click', newQuote)
twitterButton.addEventListener('click', tweetQuote)

getQuotes()
