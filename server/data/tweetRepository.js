import * as userRepository from './userRepository.js';

let tweets = [
  {
    id: '1',
    text: 'first text hello!',
    createAt: new Date().toString(),
    userId: '1',
  },
  {
    id: '2',
    text: 'second text world!',
    createAt: new Date().toString(),
    userId: '2',
  },
];

export async function getAll() {
  return Promise.all(
    tweets.map(async (tweet) => {
      const { username, name, url } = await userRepository.findById(
        tweet.userId
      );
      return { ...tweet, username, name, url };
    })
  );
}

export async function getByUsername(username) {
  return getAll().then((tweets) =>
    tweets.filter((tweet) => tweet.username === username)
  );
}

export async function getById(id) {
  const foundTweet = tweets.find((tweet) => tweet.id === id);
  if (!foundTweet) {
    return null;
  }
  const { username, name, url } = await userRepository.findById(
    foundTweet.userId
  );
  return { ...foundTweet, username, name, url };
}

export async function create(text, userId) {
  const tweet = {
    id: Date.now().toString(),
    text,
    createAt: new Date(),
    userId,
  };
  tweets = [tweet, ...tweets];
  return getById(tweet.id);
}

export async function updateById(id, text) {
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    tweet.text = text;
  }
  return getById(tweet.id);
}

export async function removeById(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
}
