import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser';
// require('dotenv').config();
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
const app = express();

import {errorHandler} from './middleware/error.mjs';

// import routes
import {authRoutes} from './routes/authRoutes.mjs';
import { sendgridRoutes } from './routes/sendgridRoutes.mjs';
import {memcacheRoutes} from './routes/memcacheRoutes.mjs';
import {translateRoutes} from './routes/translateRoutes.mjs';

// enable cors
app.use(cors());

// DATABASE CONNECTION
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(() => console.log('DB Connected'))
.catch(err => console.log('DB Connection Error: ', err));

// MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// ROUTES MIDDLEWARE
app.use('/api', authRoutes);
app.use('/api', sendgridRoutes);
app.use('/api/memcache', memcacheRoutes);
app.use('/api/translate', translateRoutes);

// ERROR HANDLER
app.use(errorHandler);

//PORT
const port = process.env.PORT|| 9000;

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

