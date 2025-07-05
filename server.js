import express from 'express'
import { readdirSync } from 'fs';
import connectDB from './server/Config/connectdb.js'
import auth from './server/Routes/auth.js'
import view from './server/Routes/manga.js'

import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';

import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json({limit: '10mb' }));

connectDB();
app.use('/api', auth)
app.use('/anime', view)

app.listen(5000, '0.0.0.0', () => {
  console.log("✅ Server is Running on port 5000 (accessible from LAN)");
});