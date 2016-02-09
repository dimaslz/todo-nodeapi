import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String},
    status: {type: String, default: 'todo'},
    date: { type: Date, default: Date.now }
});

var Task = mongoose.model('tasks', TaskSchema);

export default Task;