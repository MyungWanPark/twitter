import * as userRepository from '../data/userRepository.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const jwtSecretKey = '0&7286M7wIZrtfe';
const jwtExpiresInDays = '2d';
const bcryptSaltRounds = 10;

export async function signup(req, res) {
  const { username, password, name, email, url } = req.body;
  const found = await userRepository.findByUsername(username);
  if (found) {
    return res.status(409).json({ message: `${username} already exists` });
  }
  const hashed = await bcrypt.hash(password, bcryptSaltRounds);
  const userId = await userRepository.createUser({
    username,
    password: hashed,
    name,
    email,
    url,
  });
  const token = createJWTToken(userId);
  res.status(201).json({ token, username });
}

export async function login(req, res) {
  const { username, password } = req.body;
  const user = await userRepository.findByUsername(username);
  if (!user) {
    res.status(401).json({ message: 'Invalid user or password' });
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    res.status(401).json({ message: 'invalid user or password' });
  }
  const token = createJWTToken(user.id);
  res.status(200).json({ token, username });
}

function createJWTToken(id) {
  return jwt.sign({ id }, jwtSecretKey, { expiresIn: jwtExpiresInDays });
}
