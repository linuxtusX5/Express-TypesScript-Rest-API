import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import router from './routes';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();


app.use(cors({
    credentials: true,
}))

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

const PORT: number = parseInt(process.env.PORT) || 8080 
const devModeString: string = process.env.MONGO_URI;
server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})

// const MONGO_URL = 'mongodb+srv://salvatus2:SLo1f2wsRLYG2744@cluster0.ayxqwak.mongodb.net/REST_API?retryWrites=true&w=majority'; // DB URI

mongoose.Promise = Promise;
mongoose.connect(devModeString);
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/', router());
