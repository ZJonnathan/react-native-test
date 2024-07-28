import express from 'express';
import { getTodos, addTodo } from '../controllers/todoController';
import auth from '../middleware/auth';

const router = express.Router();

router.get('/todos', auth, getTodos);
router.post('/todos', auth, addTodo);

export default router;
