import React, { useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function App() {
  const inputRef = useRef(null);

  async function copythetext() {
    try {
      await navigator.clipboard.writeText(inputRef.current.value);
      alert("Text copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  }

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });

  const { transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <>
      <div className="container-fluid">
        <div className="container text-center mainBody ">
          <h1 className="pt-3 text-center">Speech to Text Converter</h1>
          <div>
            <p>Click "Start Listening" button to see the text!</p>
            <textarea
              className="h-100"
              ref={inputRef}
              value={transcript}
            ></textarea>
            <div className="d-lg-flex justify-content-around py-4">
              <button className="my-2 mx-2" onClick={copythetext}>
                Copy text
              </button>
              <button className="my-2 mx-2" onClick={startListening}>
                Start Listening
              </button>
              <button
                className="my-2 mx-2"
                onClick={SpeechRecognition.stopListening}
              >
                Stop Listening
              </button>
            </div>
            <button
              className="mb-4"
              onClick={() => window.location.reload(false)}
            >
              Clear all
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
