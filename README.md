# Verboverse

## Project Video URL 
[https://www.youtube.com/channel/UCImeVtxXlfZpA-G_bh6T_Sw
](https://www.youtube.com/watch?v=X8-N_NplpGg&ab_channel=CindyJi)
## Project URL

https://verboverse.vercel.app/
## Project Description

_VerboVerse_ is an interactive web application that allows people from different cultural backgrounds and languages to communicate with each other effortlessly. The app offers users the option to create meetings with video and audio calling option. What makes this app an even more immersive experience for the users is that it serves as the platform for performing real time translation of the different languages so that people can overcome their language barriers. 

## Development

**Task:** Leaving deployment aside, explain how the app is built. Please describe the overall code design and be specific about the programming languages, framework, libraries and third-party api that you have used. \\

The app first uses WebRTC for meeting connection between 2 users. We, then use WebSpeechAPI to convert audio to text. As soon as we get the text, we use the Google Translation API to translate to the remote user's preferred language and send data using WebRTC data channels. The chatbox feature works in the similar way.

Here is the tech stack:

We used ReactJS for our framework as our application consisted of various components and we could leverage the component aspect of the ReactJS to build our application easily.
We use the three layer framework architecture where the frontend communicates with the backend through API service to post and get various data and the backend communicates with the database to fulfil frontend's needs.

- ReactJS for the Frontend (HTML, CSS, Javascript)
- CSS Libraries: Mui, Chatscope
- ExpressJS and NodeJS for Backend
- Firebase for storing information about calls for WebRTC
- MongoDB for Database
- Third Party API: WebSpeech API (Audio-to-Text), Google Translation(For translation), SendGrid(Email Notification)

## Deployment

**Task:** Explain how you have deployed your application. 
- Google cloud for deploying backend
- Versel for deploying the frontend of the application

## Challenges

**Task:** What is the top 3 most challenging things that you have learned/developed for you app? Please restrict your answer to only three items. 

1. It took a really long time for to figure out the authentication of our application. It was my first time using JWT tokens. I was easy to set up in the backend as we were attaching them as a cookie in the response when the user signs in. But it took me a while to figure out to access the token in the frontend, and send them through the middleware service for each endpoint that was accessable in the application. 
2. The working of the webSpeechAPI along with Google Translation was challenging as we had to reset translation at some point for   subtitles to be concise in size.
3. Deployment was very tricky because the endpoints for backend were not accessible. We learned how to debug and reset the configurations for nginx.

## Contributions

Vanshika Virmani: 
- Set up the backend using MongoDb 
- Completed the pages for login and signin 
- Completed user authentication in the backend using JWT tokens
- Set up the memcache in the backend
- Implemented the backend for Sendgrid feature for sending email invites to registered users
- Did a refactoring of frontend code to redesign the UI for landing page and home page
- Integrated user authentication on frontend
- Application deployment using Google Cloud Platform and Vercel
    
 Cindy Ji: 
- WebSpeech API
- Google Translation
- UI for Chat Box
- CSS for the application
- Data State for various functionalities (Audio, Video,  Transcription)
- Language Mapping
- Account Information

 Rubaiz Momin: 
- Meeting Connection
- Google Translation
- Data Channels
- Chat Box Functionality
- Video Preview Meeting
- WebSpeechAPI 
- Security for frontend endpoints
- Backend CORS

# One more thing? 

**Task:** Any additional comment you want to share with the course staff? 
