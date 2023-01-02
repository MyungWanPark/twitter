import express from 'express';
import 'express-async-errors';

let tweets = [
  {
    id: '1',
    text: 'first text hello!',
    createAt: Date.now().toString(),
    name: 'park-myungwan',
    username: 'beaver',
    url: 'https://cdn.expcloud.co/life/uploads/2020/04/27135731/Fee-gentry-hed-shot-1.jpg',
  },
  {
    id: '2',
    text: 'second text world!',
    createAt: Date.now().toString(),
    name: 'park-Sobae',
    username: 'sister',
    url: 'https://cdn.expcloud.co/life/uploads/2020/04/27135731/Fee-gentry-hed-shot-1.jpg',
  },
];
// GET /tweets
// GET /tweets?username=username
// GET /tweets/:id
// POST /tweets
// PUT /tweets/:id
// DELETE /tweets/:id

const router = express.Router();

router.get('/', (req, res, next) => {
  const username = req.query.username;
  const data = username
    ? tweets.find((tweet) => tweet.username === username)
    : tweets;
  res.status(200).json(data);
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `tweet(${id}) not found!` });
  }
});

router.post('/', (req, res, next) => {
  const { text, name, username, url } = req.body;
  const tweet = {
    id: Date.now().toString(),
    text,
    name,
    username,
    url,
  };
  tweets = [tweet, ...tweets];
  res.status(201).json(tweet);
});

router.put('/:id', (req, res, next) => {
  const id = req.params.id;
  const { text } = req.body;

  let tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    tweet.text = text;
  } else {
    res.status(404).json({ message: `tweet(${id}) not found!` });
  }
  res.status(200).json(tweet);
});

router.delete('/:id', (req, res, next) => {
  const id = req.params.id;
  tweets = tweets.filter((tweet) => tweet.id !== id);
  res.sendStatus(204);
});
export default router;
