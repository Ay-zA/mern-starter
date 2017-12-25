import mongoose, { Schema } from 'mongoose';
import TaskClass from './task.class';

const TaskSchema = new Schema(
  {
    title: { type: String, index: true },
    steps: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
  },
  { timestamps: true }
);
TaskSchema.loadClass(TaskClass);

const Task = mongoose.models.Task || mongoose.model('Task', TaskSchema);
export default Task;
