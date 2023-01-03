import * as tweetRespository from '../data/tweetRepository.js';

export async function getTweets(req, res) {
  const username = req.query.username;
  const data = await (username
    ? tweetRespository.getByUsername(username)
    : tweetRespository.getAll());
  res.status(200).json(data);
}

export async function getTweetById(req, res) {
  const id = req.params.id;
  const tweet = await tweetRespository.getById(id);

  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `tweet(${id}) not found!` });
  }
}

export async function createTweet(req, res) {
  const { text, name, username, url } = req.body;
  const tweet = await tweetRespository.create(text, name, username, url);
  res.status(201).json(tweet);
}

export async function updateTweetById(req, res) {
  const id = req.params.id;
  const { text } = req.body;

  let tweet = await tweetRespository.updateById(id, text);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `tweet(${id}) not found!` });
  }
}

export async function deleteTweetById(req, res) {
  const id = req.params.id;
  await tweetRespository.removeById(id);
  res.sendStatus(204);
}
