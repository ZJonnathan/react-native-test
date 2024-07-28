import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import todoRoutes from './routes/todoRoutes';

const app = express();

mongoose.connect('mongodb://localhost:27017/todoapp')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', todoRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
