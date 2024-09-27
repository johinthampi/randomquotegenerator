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