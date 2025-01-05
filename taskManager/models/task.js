const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Task title
});

module.exports = mongoose.model('Task', taskSchema);
