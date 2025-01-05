const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Task = require('./models/task'); // Import the Task model

const app = express();

// Middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Connect to MongoDB
mongoose
  .connect('mongodb://127.0.0.1:27017/task_manager')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Home Route: View Tasks
app.get('/', async (req, res) => {
  const tasks = await Task.find();
  res.render('index', { tasks });
});

// Add Task Form
app.get('/add-task', (req, res) => {
  res.render('add_task'); 
});

// Handle Task Submission
app.post('/add-task', async (req, res) => {
  const { title } = req.body;
  await Task.create({ title }); 
  res.redirect('/'); 
});


// Delete a Task
app.post('/delete-task/:id', async (req, res) => {
  const { id } = req.params;
  await Task.findByIdAndDelete(id); 
  res.redirect('/'); 
});


// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
