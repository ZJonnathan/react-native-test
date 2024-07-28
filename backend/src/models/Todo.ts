import { Schema, model, Types } from 'mongoose';

interface ITodo {
  text: string;
  userId: Types.ObjectId;
}

const todoSchema = new Schema<ITodo>({
  text: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export default model<ITodo>('Todo', todoSchema);
