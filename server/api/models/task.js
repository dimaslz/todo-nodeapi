var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
    name: {type: String, required: true},
    description: {type: String},
    status: {type: String, default: 'todo'},
    date: { type: Date, default: Date.now }
});

var Task = mongoose.model('tasks', TaskSchema);

module.exports = Task;