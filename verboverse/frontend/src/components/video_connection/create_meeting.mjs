import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import classnames from 'classnames';
import firebase from 'firebase/compat/app';
import { sendEmail } from '../../services/sendGridApiService.js';
import { useCookies } from 'react-cookie';
import { signup, login, logout, me } from '../../services/userApiService.js';
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
let localStream;
const emailinput = React.createRef();
const Create_meeting = () =>{
    const [micIcon, setMicIcon] = useState("unmute-icon");
    const [cameraIcon, setCameraIcon] = useState("camera-on-icon");
    const [iconDisabled, setIconDisabled] = useState("disabled");
    const [pmsBtnDisabled, setPmsBtnDisabled] = useState("");
    const [cookies, setCookie] = useCookies(['token']);
    const [disabled, setdisabled] = useState(true);
    const [username, setusername] = useState('Local Stream'); 
    const localvideo = React.createRef();
    const navigate = useNavigate();
    useEffect(()=>{
        const getusername = async()=>{
            const response = await me(cookies.token);
            setusername(response.user.name);
        }
        getusername();
    }, []);
    const handleClick = async () => {
        const regex =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const matched = emailinput.current.value.match(regex);
        if(matched !== null){
            const callId = firestore.collection('calls').doc().id;
            (await firestore.collection('calls').doc(callId).set({created: true}));
            await sendEmail(cookies.token, emailinput.current.value, callId);
            navigate(`/meeting/${callId}`, {state: {video: localStream.getTracks().find(track => track.kind === 'video').enabled, 
                                                audio: localStream.getTracks().find(track => track.kind === 'audio').enabled, 
                                                callId: callId, privilege: "offer"}})
        }
        else
            console.log("NOT AN EMAIL OR NOT REGISTERED");
    }
    
    const webcam = async () => {
        //get permissions for audio and video
        // replace HTML with video feedback object
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localvideo.current.srcObject = localStream;
        setdisabled(false);
        setIconDisabled("");
        setPmsBtnDisabled("disabled");
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
                <p className='overlay_text'>{username}</p>
                <video ref={localvideo} autoPlay playsInline muted="muted"></video>

            </div>
            <div className='video_button_display'>
                <input ref={emailinput} placeholder="Enter the invitee's email to create meeting" />
                <button className={classnames("btn btn_blue", pmsBtnDisabled)} onClick={webcam}>Video and Audio permissions</button>
                <button className="btn-action" onClick={togglemute} disabled={disabled}>
                    <div className={classnames(micIcon, iconDisabled, "icon")}></div>
                </button>
                <button className="btn-action" onClick={togglevideo} disabled={disabled}>
                    <div className={classnames(cameraIcon, iconDisabled, "icon")}></div>
                </button>
            </div>
            <div className='video_button_display'>
                <button className={classnames("btn btn_pink", iconDisabled)} onClick={handleClick} disabled={disabled}>Create Meeting</button>
            </div>
        </div>
    )
}

export default Create_meeting;