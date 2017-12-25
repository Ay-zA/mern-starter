import mongoose, { Schema } from 'mongoose';
import ProjectClass from './project.class';

const ProjectSchema = new Schema(
  {
    title: { type: String, index: true },
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
  },
  { timestamps: true }
);

ProjectSchema.loadClass(ProjectClass);

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
export default Project;
