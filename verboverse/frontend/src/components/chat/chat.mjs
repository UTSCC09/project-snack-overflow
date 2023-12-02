import React, { useEffect, useState, forwardRef } from "react";
import {translate} from '../../services/translateApiService.js';
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
    ChatContainer,
    MessageList,
    Message,
    MessageInput,
  } from "@chatscope/chat-ui-kit-react";
import './chat.css';
const Chat = ({channel, targetlanguage}) =>{
    const [messageinput, setMessageInput] = useState('');
    const [disabled, setdisabled] = useState(true);
    const [messages, setMessages] = useState([]);
    const chatchannel = channel;
    chatchannel.onopen = () => {
        setdisabled(false);
    }
    const sendmessage = () => {
        if(messageinput === '')
            return;
        if(chatchannel.readyState === 'open'){
            chatchannel.send(messageinput);
            const newMessage = {
                message: messageinput,
                direction: "outgoing",
            }
            setMessages(prevMessages => [...prevMessages, newMessage]);
            setMessageInput("");
        }
    }
    chatchannel.onmessage = (event) =>{
        translate(event.data, targetlanguage).then((translatedmessage)=>{
            const newMessage = {
                message: translatedmessage.translation,
                direction: "incoming",
            }
            setMessages(prevMessages => [...prevMessages, newMessage]);
        })
    }
    return(
        <div>
            <ChatContainer className="chat-container">
                <MessageList>
                    {messages.map((message, index) => (
                        <Message key={index} model={message} />
                    ))}
                </MessageList>
                <MessageInput placeholder="Type message here" attachButton={false} onChange={(text) => setMessageInput(text)} onSend={sendmessage} disabled={disabled} />
            </ChatContainer>
        </div>
    )
}
export default Chat;
