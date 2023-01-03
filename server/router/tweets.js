import express from 'express';
import 'express-async-errors';
import * as tweetController from '../controller/tweet.js';
// GET /tweets
// GET /tweets?username=username
// GET /tweets/:id
// POST /tweets
// PUT /tweets/:id
// DELETE /tweets/:id

const router = express.Router();

router.get('/', tweetController.getTweets);

router.get('/:id', tweetController.getTweetById);

router.post('/', tweetController.createTweet);

router.put('/:id', tweetController.updateTweetById);

router.delete('/:id', tweetController.deleteTweetById);

export default router;
