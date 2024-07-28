import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { isEmpty } from 'lodash'
import { BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR } from './htttpStatusCodes';

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(CREATED).send('User registered');
  } catch (error) {
    if (error instanceof Error) {
      res.status(BAD_REQUEST).send(error.message);
    } else {
      res.status(INTERNAL_SERVER_ERROR).send('An unknown error occurred');
    }
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req?.body || {};
  try {
    if(isEmpty(email) || isEmpty(password)){
      throw new Error('Invalid credentials')
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ id: user._id }, 'secret');
    res.json({ token });
  } catch (error) {
    if (error instanceof Error) {
      res.status(BAD_REQUEST).send(error.message);
    } else {
      res.status(INTERNAL_SERVER_ERROR).send('An unknown error occurred');
    }
  }
};
