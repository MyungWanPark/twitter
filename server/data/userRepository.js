let users = [
  {
    id: '1',
    username: 'beaver',
    password: '$2b$10$wLBMhVSBjxUJrNEZaLCin.zy4SO4D7Jpy/QPwrlz4DlWm9/stJXiS', //1234
    name: 'park-myungwan',
    email: 'beaver@naver.com',
    url: 'https://cdn.expcloud.co/life/uploads/2020/04/27135731/Fee-gentry-hed-shot-1.jpg',
  },
  {
    id: '2',
    username: 'coffee',
    password: '5678',
    name: 'park-Sobae',
    email: 'sister@gmail.com',
    url: 'https://cdn.expcloud.co/life/uploads/2020/04/27135731/Fee-gentry-hed-shot-1.jpg',
  },
];

export async function findByUsername(username) {
  return users.find((user) => user.username === username);
}

export async function findById(id) {
  return users.find((user) => user.id === id);
}

export async function createUser(user) {
  const newUser = { ...user, id: new Date().toString() };
  users.push(newUser);

  return newUser.id;
}
