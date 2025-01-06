import { Router, Request, Response } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  // If the user exists and the password is correct, return a JWT token
  // Destructure username and pass from the request body
  const { username, password } = req.body;

  // Find user in database if exists; if not, return 401 message
  const user = await User.findOne({
    where: { username },
  });
  if (!user) {
    return res.status(401).json({ message: `Wrong username and/or password. Please login or sign up.`});
  }

  // Use bcrypt to encrypt password, then compare w/ stored password in db
  const passwordIsValid = await bcrypt.compare(password, user.password);

  // If pass is invalid, return failed auth message
  if (!passwordIsValid) {
    return res.status(401).json({ message: `Wrong username and/or password. Please login or sign up.`});
  }

  // get secret key from .env
  const secretKey = process.env.JWT_SECRET_KEY || '';
  
  // If user is authenticated, generate JWT 
  const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
  return res.json({ token })
};

const router = Router();

// POST /login - Login a user
router.post('/login', login);

export default router;
