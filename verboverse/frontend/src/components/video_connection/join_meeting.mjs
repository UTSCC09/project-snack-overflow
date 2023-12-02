import React, { useState } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import classnames from 'classnames';
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';
const firebaseConfig = {
    apiKey: "AIzaSyDeiAhAi21ev36X-B0z9_sN4YexK7o1VY4",
    authDomain: "project-snack-overflow.firebaseapp.com",
    databaseURL: "https://project-snack-overflow-default-rtdb.firebaseio.com/",
    projectId: "project-snack-overflow",
    storageBucket: "project-snack-overflow.appspot.com",
    messagingSenderId: "689507442231",
    appId: "1:689507442231:web:01a87229e518f779f5e9b2",
    measurementId: "G-MVSPE072K6"
  };
  
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  const firestore = firebase.firestore();
  
  const servers = {
      iceServers: [
        {
          urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
        },
      ],
      iceCandidatePoolSize: 10,
    };
let localStream;
const callinput = React.createRef();
const Join_meeting = () =>{
    const [micIcon, setMicIcon] = useState("unmute-icon");
    const [cameraIcon, setCameraIcon] = useState("camera-on-icon");
    const [iconDisabled, setIconDisabled] = useState("disabled");
    const [pmsBtnDisabled, setPmsBtnDisabled] = useState("");
    const [disabled, setdisabled] = useState(true);
    const localvideo = React.createRef();
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/meeting/${callinput.current.value}`, {state: {video: localStream.getTracks().find(track => track.kind === 'video').enabled, 
                                    audio: localStream.getTracks().find(track => track.kind === 'audio').enabled, 
                                    callId: callinput.current.value, privilege: "answer"}});
    }
    useEffect(()=>{
        let meetingId = window.location.href.split("/")[4];
        if(meetingId === undefined)
            meetingId = "";
        callinput.current.value = meetingId;
    }, []);
    const webcam = async () => {
        //get permissions for audio and video
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        // replace HTML with video feedback object
        localvideo.current.srcObject = localStream;
        setdisabled(false);
        setIconDisabled("");
        setPmsBtnDisabled("disabled");
    }
    const answermeeting = async () => {
        // get the callID that the invitee shared and access the data
        const callId = callinput.current.value;
        if(callId === ""){
          console.log("WRONG MEETING ID");
          return;
        }
        const callDoc = firestore.collection('calls').doc(callId);
        // get the invitee's sdp
        const callData = (await callDoc.get()).data();
        // set the invitee's sdp as remoteDescription
        if(callData === undefined){
          console.log("WRONG MEETING ID");
          return;
        }
        handleClick();
    }
    const togglemute = () => {
        if(localStream.getTracks().find(track => track.kind === 'audio').enabled){
            localStream.getTracks().find(track => track.kind === 'audio').enabled = false;
            setMicIcon("mute-icon");
        } else {
            localStream.getTracks().find(track => track.kind === 'audio').enabled = true;
            setMicIcon("unmute-icon");
        }
      }
    const togglevideo = () => {
        if(localStream.getTracks().find(track => track.kind === 'video').enabled){
            localStream.getTracks().find(track => track.kind === 'video').enabled = false;
            setCameraIcon("camera-off-icon");
        } else {
            localStream.getTracks().find(track => track.kind === 'video').enabled = true;
            setCameraIcon("camera-on-icon");
        }
    }
    return(
        <div className='videos_display'>
            <h3>Video Preview</h3>
            <div className='video_container'>
                <p className='overlay_text'>Local Stream</p>
                <video ref={localvideo} autoPlay playsInline muted="muted"></video>
            </div>
            <div className='video_button_display'>
                <button className={classnames("btn btn_blue", pmsBtnDisabled)} onClick={webcam}>Video and Audio permissions</button>
                <button className="btn-action" onClick={togglemute} disabled={disabled}>
                    <div className={classnames(micIcon, iconDisabled, "icon")}></div>
                </button>
                <button className="btn-action" onClick={togglevideo} disabled={disabled}>
                    <div className={classnames(cameraIcon, iconDisabled, "icon")}></div>
                </button>
            </div>
            <div className='video_button_display'>
                <input placeholder="Enter meeting ID" ref={callinput} disabled={disabled}/>
                <button className={classnames("btn btn_pink", iconDisabled)} onClick={answermeeting} disabled={disabled}>Join Meeting</button>
            </div>
        </div>
    )
}

export default Join_meeting;