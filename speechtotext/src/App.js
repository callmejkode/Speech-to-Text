import React, { useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function App() {
  const inputRef = useRef();

  async function copythetext() {
    try {
      await navigator.clipboard.writeText(inputRef.current.value);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      alert("Failed to copy text");
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
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title text-black" id="staticBackdropLabel">
                Text Copied!
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body text-black">
              Thanks for using my application :D{" "}
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
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
              <button
                className="my-2 mx-2"
                onClick={copythetext}
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
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
