const quotes = [
{
    quote: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
  },
  {
    quote: "Life is what happens when you're busy making",
    author: "John Lennon",
  },
  {
    quote: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
    author: " Mahatma Gandhi",
  },
  {
    quote: "That which does not kill us makes us stronger.",
    author: "Friedrich Nietzsche",
  },
  {
    quote: "We must not allow other people’s limited perceptions to define us.",
    author: "Virginia Satir",
  },
  {
    quote: "Do what you can, with what you have, where you are.",
    author: "Theodore Roosevelt",
  },
  {
    quote: "Be yourself; everyone else is already taken.",
    author: "Oscar Wilde",
  },
  {
    quote: "TThis above all: to thine own self be true.",
    author: "William Shakespeare"
  },
  {
    quote: "If you cannot do great things, do small things in a great way.",
    author: "Napoleon Hill"
  },
  {
    quote: "If opportunity doesn’t knock, build a door.",
    author: "Milton Berle"
  },
];

const quote = document.querySelector("#quote span:first-child");
const author = document.querySelector("#quote span:last-child");


const todaysQuote = quotes[Math.floor(Math.random() * quotes.length)];

quote.innerText = `${todaysQuote.quote} \n`;  
author.innerText = ` from ${todaysQuote.author}`; 