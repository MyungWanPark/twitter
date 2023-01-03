import * as tweetRespository from '../data/tweetRepository.js';

export function getTweets(req, res, next) {
  const username = req.query.username;
  const data = username
    ? tweetRespository.getByUsername()
    : tweetRespository.getAll();
  res.status(200).json(data);
}

export function getTweetById(req, res, next) {
  const id = req.params.id;
  const tweet = tweetRespository.getById(id);

  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `tweet(${id}) not found!` });
  }
}

export function createTweet(req, res, next) {
  const { text, name, username, url } = req.body;
  const tweet = tweetRespository.create();
  res.status(201).json(tweet);
}

export function updateTweetById(req, res, next) {
  const id = req.params.id;
  const { text } = req.body;

  let tweet = tweetRespository.updateById(id, text);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `tweet(${id}) not found!` });
  }
}

export function deleteTweetById(req, res, next) {
  const id = req.params.id;
  tweetRespository.removeById(id);
  res.sendStatus(204);
}
