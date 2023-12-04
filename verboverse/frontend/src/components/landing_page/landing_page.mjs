import React, { useEffect } from 'react'
import Card from '../card/card.mjs'
import './landing_page.css'
import logo from './media/logo.png'
import Typewriter from "typewriter-effect";
import { useNavigate } from "react-router-dom";
import { me, logout } from "../../services/userApiService.js";
import AccountProfile from "../account_profile/account_profile.mjs";
import { useCookies } from "react-cookie";

export default function LandingPage({ signedIn }) {
    const [cookies, setCookie] = useCookies(['token']);
    const navigate = useNavigate();
    useEffect(()=>{
        const fetchUser = async () => {
            try {
                const response = await me(cookies.token);
                if (response.success)
                    navigate('/home')
            } catch (error) {
                throw Error('Error fetching user:', error);
            }
        };
        fetchUser();
    },[]);
    const handleSignout = async () => {
        const response = await logout(cookies.token);
        if (response.success) {
            navigate("/");
        }
    }


    if (!signedIn) {
        return (
            <div className='page'>
                <div className='top'>
                    <div className='left'>
                        <img className='logo' src={logo} />
                        <Typewriter
                            className='typewriter'
                            options={{
                                strings: ['Real-time transcription service for your meetings.', 'Seamless communication across language barriers.',
                                    'Experience instant translation during your video calls.',
                                    'Break down language barriers with our live translation feature.'],
                                autoStart: true,
                                loop: true,
                            }}
                        />
                    </div>
                    <div className='right'>
                        <img className='bg' src='https://www.artificialintelligence-news.com/wp-content/uploads/sites/9/2018/03/microsoft-chinese-english-ai-translate.jpg' />
                        <div className='button-container'>
                            <button className='btn' onClick={() => navigate("/signin")}>Login</button>
                            <button className='btn' onClick={() => navigate("/signup")}>Signup</button>
                        </div>
                    </div>
                </div>
                {/* <div className='bottom'>
                    <div className='cards'>
                        <Card img='https://www.artificialintelligence-news.com/wp-content/uploads/sites/9/2018/03/microsoft-chinese-english-ai-translate.jpg' title='Real-time transcription' desc='Verboverse transcribes your meetings in real-time, so you can focus on the conversation.' />
                        <Card img='https://www.artificialintelligence-news.com/wp-content/uploads/sites/9/2018/03/microsoft-chinese-english-ai-translate.jpg' title='Real-time transcription' desc='Verboverse transcribes your meetings in real-time, so you can focus on the conversation.' />
                        <Card img='https://www.artificialintelligence-news.com/wp-content/uploads/sites/9/2018/03/microsoft-chinese-english-ai-translate.jpg' title='Real-time transcription' desc='Verboverse transcribes your meetings in real-time, so you can focus on the conversation.' />
                    </div>
                </div> */}
            </div>
        )
    }
    else {
        return (
            <div>
            <div className='navbar'>
                <AccountProfile />
                <button className='logout-btn' onClick={handleSignout}>Logout</button>
            </div>
            <div className='page'>
                <div className='top'>
                    <div className='left'>
                        <img className='logo' src={logo} />
                        <Typewriter
                            className='typewriter'
                            options={{
                                strings: ['Real-time transcription service for your meetings.', 'Seamless communication across language barriers.',
                                    'Experience instant translation during your video calls.',
                                    'Break down language barriers with our live translation feature.'],
                                autoStart: true,
                                loop: true,
                            }}
                        />
                    </div>
                    <div className='right'>
                        <img className='bg' src='https://www.artificialintelligence-news.com/wp-content/uploads/sites/9/2018/03/microsoft-chinese-english-ai-translate.jpg' />
                        <div className='button-container'>
                            <button className='btn' onClick={() => navigate("/create")}>Create Meeting</button>
                            <button className='btn' onClick={() => navigate("/join")}>Join Meeting</button>
                        </div>
                    </div>
                </div>
                {/* <div className='bottom'>
                    <div className='cards'>
                        <Card img='https://www.artificialintelligence-news.com/wp-content/uploads/sites/9/2018/03/microsoft-chinese-english-ai-translate.jpg' title='Real-time transcription' desc='Verboverse transcribes your meetings in real-time, so you can focus on the conversation.' />
                        <Card img='https://www.artificialintelligence-news.com/wp-content/uploads/sites/9/2018/03/microsoft-chinese-english-ai-translate.jpg' title='Real-time transcription' desc='Verboverse transcribes your meetings in real-time, so you can focus on the conversation.' />
                        <Card img='https://www.artificialintelligence-news.com/wp-content/uploads/sites/9/2018/03/microsoft-chinese-english-ai-translate.jpg' title='Real-time transcription' desc='Verboverse transcribes your meetings in real-time, so you can focus on the conversation.' />
                    </div>
                </div> */}
            </div>
            </div>
        )
    }

}
