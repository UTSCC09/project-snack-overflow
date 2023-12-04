import firebase from 'firebase/compat/app';
import React, { useState } from 'react';
import classnames from 'classnames';
import { signup, login, logout, me } from '../../services/userApiService.js';
import 'firebase/compat/firestore';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import {translate} from '../../services/translateApiService.js';
import Chat from '../chat/chat.mjs';import { useNavigate } from 'react-router-dom';
import './meeting.css';
import { useCookies } from "react-cookie";

const firebaseConfig = {
  apiKey: "AIzaSyDeiAhAi21ev36X-B0z9_sN4YexK7o1VY4",
  authDomain: "project-snack-overflow.firebaseapp.com",
  databaseURL: "https://project-snack-overflow-default-rtdb.firebaseio.com/",
  projectId: "project-snack-overflow",
  storageBucket: "project-snack-overflow.appspot.com",
  messagingSenderId: "689507442231",
  appId: "1:689507442231:web:01a87229e518f779f5e9b2",
  measurementId: "G-MVSPE072K6",
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

const pc = new RTCPeerConnection(servers);
const channel = pc.createDataChannel("chat", { negotiated: true, id: 0 });
const hangupchannel = pc.createDataChannel("chat", { negotiated: true, id: 1 });
const chatchannel = pc.createDataChannel("chat", { negotiated: true, id: 2 });
const sendusernamechannel = pc.createDataChannel("chat", { negotiated: true, id: 3 });
const localvideo = React.createRef();
const remotevideo = React.createRef();
let localStream;
let remoteStream;
function Video_connection({transcription_text, recognition}) {
  const [micIcon, setMicIcon] = useState("unmute-icon");
  const [cameraIcon, setCameraIcon] = useState("camera-on-icon");
  const [transcriptIcon, setTranscriptIcon] = useState("transcript-on-icon");
  const [iconDisabled, setIconDisabled] = useState("disabled");
  const [disabled, setdisabled] = useState(true);
  const [text, settext] = useState('');
  const [target, settarget] = useState('en-CA');
  const [cookies, setCookie] = useCookies(['token']);
  const [localusername, setlocalusername] = useState('Local Stream');
  const [remoteusername, setremoteusername] = useState('Remote Stream');
  
  let error = '';
  const meetingId = window.location.href.split("/")[4];
  const data = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const webcam_on = async () => {
      localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      localStream.getTracks().find(track => track.kind === 'audio').enabled = data.state.audio;
      localStream.getTracks().find(track => track.kind === 'video').enabled = data.state.video;
      if(data.state.audio === true) {
        setMicIcon("unmute-icon");
      }
      else{
        setMicIcon("mute-icon");
      }
      if(data.state.video === true) {
        setCameraIcon("camera-on-icon");
      }
      else{
        setCameraIcon("camera-off-icon");
      }
      remoteStream = new MediaStream();
      // Push tracks from local stream to peer connection
      localStream.getTracks().forEach((track) => {
          pc.addTrack(track, localStream);
      });
    
      // Pull tracks from remote stream, add to video stream
      pc.ontrack = event => {
          event.streams[0].getTracks().forEach(track => {
              remoteStream.addTrack(track);
          });
      };
      localvideo.current.srcObject = localStream;
      remotevideo.current.srcObject = remoteStream;
      setdisabled(false);
      setIconDisabled("");
    }

    const connectmeeting = async () => {
      // Create a New ID for a call
      if(data.state.privilege !== "offer")
        return;
      const callDoc = firestore.collection('calls').doc(meetingId);
      // Create new collection
      const offerCandidates = callDoc.collection('offerCandidates');
      const answerCandidates = callDoc.collection('answerCandidates');
  
      // get ICE candidates for the invitee and save it to firestore database under offerCandidates collection
      pc.onicecandidate = event => {
        event.candidate && offerCandidates.add(event.candidate.toJSON());
      };
      // Creates SDP offer to start connection with remote users
      const offerDescription = await pc.createOffer();
      await pc.setLocalDescription(offerDescription);
    
      const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
      };
  
      //add the SDP and the type of connection to the callID
      await callDoc.set({ offer });
    
      // listener for new candidatess added by remote user
      callDoc.onSnapshot((snapshot) => {
        const data = snapshot.data();
        // check remote connection and if data was received
        if (!pc.currentRemoteDescription && data?.answer) {
          // set the answer SDP
          const answerDescription = new RTCSessionDescription(data.answer);
          pc.setRemoteDescription(answerDescription);
        }
      });  
      // Listen for remote ICE candidates
      answerCandidates.onSnapshot(snapshot => {
        snapshot.docChanges().forEach((change) => {
          // check if new candidate was added and not modified.
          if (change.type === 'added') {
            const candidate = new RTCIceCandidate(change.doc.data());
            // add the new remote candidate to remote description
            pc.addIceCandidate(candidate);
          }
        });
      });
    }
    const answermeeting = async () => {
      // get the callID that the invitee shared and access the data
      if(data.state.privilege !== "answer")
        return;
      const callDoc = firestore.collection('calls').doc(meetingId);
      const offerCandidates = callDoc.collection('offerCandidates');
      const answerCandidates = callDoc.collection('answerCandidates');
    
      // get ICE candidates for the invitee and save it to firestore database under answerCandidates collection
      pc.onicecandidate = event => {
        event.candidate && answerCandidates.add(event.candidate.toJSON());
      };
    
      // get the invitee's sdp
      const callData = (await callDoc.get()).data();
      // set the invitee's sdp as remoteDescription
      if(callData === undefined){
        return;
      }
      const offerDescription = callData.offer;
      await pc.setRemoteDescription(new RTCSessionDescription(offerDescription));
    
      //create sdp for answerer and store in its localDescription
      const answerDescription = await pc.createAnswer();
      await pc.setLocalDescription(answerDescription);
    
      // store the sdp under callID's answer field
      const answer = {
        type: answerDescription.type,
        sdp: answerDescription.sdp,
      };
    
      await callDoc.update({ answer });
    
      // Listen to offer candidates for changes in ICEcandidates
      offerCandidates.onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            let data = change.doc.data();
            pc.addIceCandidate(new RTCIceCandidate(data));
          }
        });
      });
    }
    const checksecurity = async () =>{
      if(!((await firestore.collection('calls').doc(meetingId).get()).exists)){
        error = "The meeting does not exist.";
        throw new Error();
      }
      if(((await firestore.collection('calls').doc(meetingId).get()).data().answer) !== undefined){
        error = "You cannot join the meeting again. Please do not refresh the ongoing meeting."
        throw new Error();
      }
    }
    const fetchUser = async () => {
      try {
          const response = await me(cookies.token);
          if (response.success) {
            setlocalusername(response.user.name);
            recognition.lang = 'fr-FR';
            settarget('fr-FR');
          }
          else{
            navigate('/');
            throw Error("Not signed in");
          }
      } catch (error) {
          throw Error('Error fetching user:', error);
      }
    };
    fetchUser().then(()=>{
      checksecurity().catch((e)=>{
        navigate('/error', {state: {errormessage:error}});
        return;
      });
      webcam_on().then(()=>{
        connectmeeting().then(() => {
          answermeeting();
        })
      });
    }).catch((e)=>{
        navigate('/');
        return;
      })
  }, []); // Empty dependency array means this effect will run only once, on component mount
  const togglemute = async () => {
    if(localStream.getTracks().find(track => track.kind === 'audio').enabled){
      localStream.getTracks().find(track => track.kind === 'audio').enabled = false;
      setMicIcon("mute-icon");
    } else {
      localStream.getTracks().find(track => track.kind === 'audio').enabled = true;
      setMicIcon("unmute-icon");
    }
  }
  const togglevideo = async () => {
    if(localStream.getTracks().find(track => track.kind === 'video').enabled){
      localStream.getTracks().find(track => track.kind === 'video').enabled = false;
      setCameraIcon("camera-off-icon");
    } else {
      localStream.getTracks().find(track => track.kind === 'video').enabled = true;
      setCameraIcon("camera-on-icon");
    }
  }
  const toggleTranscript = async (event) => {
    if(transcriptIcon === "transcript-on-icon") {
      setTranscriptIcon("transcript-off-icon");
    }
    else {
      setTranscriptIcon("transcript-on-icon");
    }
  }
  const hangup = async () =>{
    if(hangupchannel.readyState === 'open'){
      hangupchannel.send(data.state.privilege);
    }
    recognition.stop();
    channel.close();
    hangupchannel.close();
    chatchannel.close();
    pc.close();
    localStream.getTracks().forEach(function(track) {
      track.stop();
    });
    remoteStream.getTracks().forEach(function(track) {
      track.stop();
    });
    localvideo.current.srcObject = null;
    remotevideo.current.srcObject = null;
    navigate(`/meetingend/${data.state.callId}`, {state: {privilege: "You"}})
  }

  useEffect(()=>{
    if(channel.readyState === 'open'){
      if(micIcon === "unmute-icon") // audio is on
        channel.send(transcription_text);
    }
  }, [transcription_text]);
  useEffect(()=>{
    if(sendusernamechannel.readyState === 'open'){
      sendusernamechannel.send(localusername);
    }
  }, [sendusernamechannel.readyState])
  sendusernamechannel.onmessage = (event) =>{
    setremoteusername(event.data);
  }
  hangupchannel.onmessage = (event) => {
    pc.close();
    localStream.getTracks()
    localStream.getTracks().forEach(function(track) {
      track.stop();
    });
    remoteStream.getTracks().forEach(function(track) {
      track.stop();
    });
    localvideo.current.srcObject = null;
    remotevideo.current.srcObject = null;
    let deleter;
    if(event.data === "offer")
      deleter = "The Host";
    else
      deleter = "The Answerer"
    navigate(`/meetingend/${data.state.callId}`, {state: {privilege: deleter}})
  }

  useEffect(()=>{
    if(transcription_text === '')
      return;
    console.log(transcription_text);
    if(channel.readyState === 'open'){
      if(micIcon === "unmute-icon") // audio is on
        channel.send(transcription_text);
    }
  }, [transcription_text]);

  channel.onmessage = async (event) => {
    if(transcriptIcon === "transcript-on-icon"){
      let incomingtext = await translate(cookies.token, event.data, target);
      settext(incomingtext.translation);
    }
  };
  return(
    <div className='videos_display'>
      <h3>Meeting</h3>
      <p>Meeting ID: {meetingId}</p>
      <div className='videos_align_top'>
        <div className='video_container'>
          <video className='remote_video' ref={remotevideo} autoPlay playsInline></video>
          <p className='overlay_text'>{remoteusername}</p>
          <p className='subtitle'>{text}</p>
        </div>
        <div>
          <div className='video_container'>
            <video className='local_video' ref={localvideo} autoPlay playsInline muted="muted"></video>
            <p className='overlay_text'>{localusername}</p>
          </div>
          <Chat channel={chatchannel} targetlanguage={target}/>
        </div>
      </div>
      <div className='video_button_display'>
        <button className="btn-action" onClick={togglemute} disabled={disabled}>
          <div className={classnames(micIcon, iconDisabled, "icon")}></div>
        </button>
        <button className="btn-action" onClick={togglevideo} disabled={disabled}>
          <div className={classnames(cameraIcon, iconDisabled, "icon")}></div>
        </button>
        <button className="btn-action" onClick={toggleTranscript} disabled={disabled}>
          <div className={classnames(transcriptIcon, iconDisabled, "icon")}></div>
        </button>
        <button className="btn-action">
          <div className="hangup-icon icon" onClick={hangup} disabled={disabled}></div>
        </button>
      </div>
    </div>
  );
}
export default Video_connection;


  // Store, Fireship, director. WebRTC in 100 Seconds // Build a Video Chat App from Scratch. YouTube, 15 Mar. 2021, https://youtu.be/WmR9IMUD_CY?si=z1dGNkAm6VpOEPtd. Accessed 12 Nov. 2023. 
