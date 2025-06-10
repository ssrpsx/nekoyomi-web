import express from 'express'
import { readdirSync } from 'fs';
import connectDB from './server/Config/connectdb.js'

import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

app.use(morgan('dev'))
app.use(cors())
app.use(bodyParser.json({limit: '10mb' }));

connectDB();

readdirSync('./server/Routes').map(async (r) => {
    const route = await import(`./Routes/${r}`);
    app.use('/api', routeModule.default);
});

app.listen(5000, ()=> console.log("Server is Runing on port 5000"));