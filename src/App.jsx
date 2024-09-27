import React, { useState, useEffect } from "react";
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";


function App() {
  const [content, setContent] = useState('');
  const newquote = () => {
    axios
      .get("https://dummyjson.com/quotes")
      .then((response) => {
        const { data } = response;
        setContent(data.quotes[Math.floor(Math.random() * data.quotes.length)]);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  useEffect(() => {onabort
    newquote();
  }, []);

  useEffect(() => {
    if (content?.author) {
      const authorClass = content.author.toLowerCase().replace(/[().]/g, '') 
      .replace(/\s+/g, '-');
      document.body.className = authorClass; 
    }
  }, [content]);

  return (
    <>
      <div className="wrapper">
        <header>QUOTE OF THE DAY</header>
        <div className="content">
          <div className="quote-area">
            <i className="fas fa-quote-left"></i>
            <p className="quote">{content?.quote}</p>
            <i className="fas fa-quote-right"></i>
          </div>
          <div className="author">
            <span className="author">{content?.author}</span>
          </div>
        </div>
        <div className="buttons">
          <div className="features">
            <ul>
              <li className="speech">
                <SpeechComponent quoteText={content?.quote} authorName={content?.author} />
              </li>
            </ul>
            <button id="newquote" onClick={newquote}>New Quote</button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

const SpeechComponent = ({ quoteText, authorName }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synth = window.speechSynthesis;

  const handleSpeech = () => {
    if (quoteText && authorName) {
      let utterance = new SpeechSynthesisUtterance(
        `${quoteText} by ${authorName}`
      );
      synth.speak(utterance);
      setIsSpeaking(true);

      
      const interval = setInterval(() => {
        if (!synth.speaking) {
          setIsSpeaking(false);
          clearInterval(interval);
        }
      }, 10);
    }
  };

  useEffect(() => {
    return () => {
      if (synth.speaking) {
        synth.cancel();
      }
    };
  }, [synth]);

  return (
    <button
      className={`speech-btn ${isSpeaking ? "active" : ""}`}
      onClick={handleSpeech}
    >
      <i class="fa-solid fa-volume-high fa-lg"></i>
    </button>
  );
};

export default App;