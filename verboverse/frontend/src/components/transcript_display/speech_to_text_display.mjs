import React, { useState, useEffect } from 'react';
import Video_connection from '../video_connection/video_connection.mjs';
import { useCookies } from "react-cookie";
import { signup, login, logout, me } from '../../services/userApiService.js';
import { useNavigate } from 'react-router-dom';
let SpeechRecognition = window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;

let recognizing = false;
let finalTranscript = '';
let ignore_onend;
let start_timestamp;

function Transcript() {
  const [cookies, setCookie] = useCookies(['token']);
  const [info, setInfo] = useState('Off');
  const [interimSpan, setInterimSpan] = useState('');
  const [finalSpan, setFinalSpan] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    recognition.onstart = function() {
      recognizing = true;
    };
    
    recognition.onerror = function(event) {
      if (event.error === 'no-speech') {
        ignore_onend = true;
      }
      else if (event.error === 'audio-capture') {
        setInfo('Error: No microphone');
        ignore_onend = true;
      }
      else if (event.error === 'not-allowed') {
        if (event.timeStamp - start_timestamp < 100) {
          setInfo('Error: Blocked');
        } else {
          setInfo('Error: Denied');
        }
        ignore_onend = true;
      }
    };
    
    recognition.onend = function() {
      if (ignore_onend || ignore_onend === undefined) {
        recognition.start();
        return;
      }
      recognizing = false;
      setInfo('Off');
    };
    
    recognition.onresult = function(event) {
      var interimTranscript = '';
      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      finalTranscript = capitalize(finalTranscript);
      setInterimSpan(linebreak(finalTranscript) + linebreak(interimTranscript));
      setFinalSpan(linebreak(finalTranscript));
    };
  });

  useEffect(()=>{
    if(recognizing === false)
      recognition.start();
    start_timestamp = performance.now();
    setInterval(()=>{
      finalTranscript = '';
    }, 5000);
  }, []);

  return(
    <div id="results">
      <Video_connection transcription_text={interimSpan} recognition={recognition}/>
        {/* <span id="info"> ({info}):<br /></span> */}
        {/* <span id="finalSpan" style={{color:'black'}}>{finalSpan}</span> */}
        <span id="interimSpan" style={{color:'blue'}}>{interimSpan}</span>
    </div>
  );
}

var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

var first_char = /\S/;
function capitalize(s) {
  return s.replace(first_char, function(m) { return m.toUpperCase(); });
}

export default Transcript;
