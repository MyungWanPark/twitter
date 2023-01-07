import { db } from '../db/database.js';
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
const SELECT_JOIN =
  'SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.url FROM tweets as tw JOIN users as us ON tw.userId=us.id';
const ORDER_BY = 'ORDER BY tw.createdAt DESC';

export async function getAll() {
  return db
    .execute(`${SELECT_JOIN} ${ORDER_BY}`) //
    .then((result) => result[0]);
}

export async function getByUsername(username) {
  return db
    .execute(`${SELECT_JOIN} where username=? ${ORDER_BY}`, [username])
    .then((result) => result[0]);
}

export async function getById(id) {
  return db
    .execute(`${SELECT_JOIN} where tw.id=? ${ORDER_BY}`, [id])
    .then((result) => result[0][0]);
}

export async function create(text, userId) {
  return db
    .execute('INSERT INTO tweets (text, createdAt, userId) VALUES (?,?,?)', [
      text,
      new Date(),
      userId,
    ])
    .then((result) => getById(result[0].insertId));
}

export async function updateById(id, text) {
  return db
    .execute('UPDATE tweets SET text=? WHERE id=?', [text, id])
    .then(() => getById(id));
}

export async function removeById(id) {
  db.execute('DELETE FROM tweets WHERE id=?', [id]);
}
