import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import tweetsRouter from './router/tweets.js';
import authRouter from './router/auth.js';

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));

app.use('/tweets', tweetsRouter);
app.use('/auth', authRouter);
app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  res.sendStatus(500);
});

app.listen(8080);
