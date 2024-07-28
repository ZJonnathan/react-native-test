import { Response } from 'express';
import { AuthRequest, MongoError } from '../types/types';
import Todo from '../models/Todo';
import { BAD_REQUEST, CONFLICT, CREATED, INTERNAL_SERVER_ERROR, NOT_FOUND, UNAUTHORIZED, OK } from './htttpStatusCodes';

const isMongoError = (error: Error): error is MongoError => {
  return 'code' in error;
}

export const getTodos = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req?.user?.id;
    if (!userId) {
      return res.status(UNAUTHORIZED).json({ message: 'Unauthorized: User not found in request.' });
    }

    const todos = await Todo.find({ userId });

    if (todos.length === 0) {
      return res.status(NOT_FOUND).json({ message: 'No todos found for this user.' });
    }

    res.status(OK).json(todos);
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'ValidationError') {
        return res.status(BAD_REQUEST).json({ message: 'Bad Request: Invalid data.' });
      }
      return res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
    res.status(INTERNAL_SERVER_ERROR).json({ message: 'An unknown error occurred' });
  }
};

export const addTodo = async (req: AuthRequest, res: Response) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(BAD_REQUEST).json({ message: 'Bad Request: Text is required to add a todo.' });
    }

    const userId = req?.user?.id;
    if (!userId) {
      return res.status(UNAUTHORIZED).json({ message: 'Unauthorized: User not found in request.' });
    }

    const todo = new Todo({ text, userId });
    await todo.save();

    res.status(CREATED).json(todo);
  } catch (error) {
    if (error instanceof Error) {
      if (isMongoError(error) && error.code === 11000) {
        return res.status(CONFLICT).json({ message: 'Conflict: Duplicate todo.' });
      }

      if (error.name === 'ValidationError') {
        return res.status(BAD_REQUEST).json({ message: 'Bad Request: Invalid data.' });
      }

      return res.status(INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
    res.status(INTERNAL_SERVER_ERROR).json({ message: 'An unknown error occurred' });
  }
};
