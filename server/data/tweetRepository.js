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

export function getByUsername(username) {
  return tweets.find((tweet) => tweet.username === username);
}

export function getAll() {
  return tweets;
}

export function getById(id) {
  return tweets.find((tweet) => tweet.id === id);
}

export function create(text, name, username, url) {
  const tweet = {
    id: Date.now().toString(),
    text,
    name,
    createAt: new Date(),
    username,
    url,
  };
  tweets = [tweet, ...tweets];
  return tweet;
}

export function updateById(id, text) {
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    tweet.text = text;
  }
  return tweet;
}

export function removeById(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
}
