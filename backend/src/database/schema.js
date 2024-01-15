import mongoose from "mongoose";
const {Schema, model} = mongoose;

const taskSchema = new Schema({
    taskName: { required: true, type: String },
    taskDescription: { required: true, type: String },
    priority: { type: String, enum: ['HIGH', 'MEDIUM', 'LOW'] },
    isTaskStarted: { required: true, type: Boolean },
    isTaskCompleted: { required: true, type: Boolean },
    dateOfStart: { required: true, type: String},
},
{
    timestamps: true,
});

export const Task =  model('Task', taskSchema);
