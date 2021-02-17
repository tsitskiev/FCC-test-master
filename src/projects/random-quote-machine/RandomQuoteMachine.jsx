import React, { useState } from 'react';

const RandomQuoteMachine = () => {
  const quotes = [
    {
      quote: '“Live as if you were to die tomorrow. Learn as if you were to live forever.”',
      author: '– Mahatma Gandhi',
    },
    { quote: '“That which does not kill us makes us stronger.”', author: '– Friedrich Nietzsche' },
    {
      quote:
        '“Be who you are and say what you feel, because those who mind don’t matter and those who matter don’t mind.”',
      author: '– Bernard M. Baruch',
    },
    {
      quote: '“We must not allow other people’s limited perceptions to define us.”',
      author: '– Virginia Satir',
    },
    {
      quote: '“Do what you can, with what you have, where you are.”',
      author: '– Theodore Roosevelt',
    },
    { quote: '“Be yourself; everyone else is already taken.”', author: '– Oscar Wilde' },
    { quote: '“This above all: to thine own self be true.”', author: '– William Shakespeare' },
    {
      quote: '“If you cannot do great things, do small things in a great way.”',
      author: '– Napoleon Hill',
    },
    { quote: '“If opportunity doesn’t knock, build a door.”', author: '– Milton Berle' },
  ];

  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

  const newQuoteHandler = () => {
    const newQuote = quotes[getRandomInt(9)];
    setCurrentQuote(newQuote);
  };

  return (
    <div className="content">
      <div className="quote-machine" id="quote-box">
        <div className="text" id="text">
          {currentQuote.quote}
        </div>
        <div className="author" id="author">
          {currentQuote.author}
        </div>
        <button onClick={newQuoteHandler} className="new-quote" id="new-quote">
          New qoute
        </button>
        <a target="_blank" href="twitter.com/intent/tweet" className="tweet-quote" id="tweet-quote">
          <svg viewBox="0 0 24 24" style={{ height: '24px' }}>
            <g>
              <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
            </g>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default RandomQuoteMachine;
