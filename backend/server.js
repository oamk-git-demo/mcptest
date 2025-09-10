const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

// Read todos from file
const readTodos = () => {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'todos.json'), 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Write todos to file
const writeTodos = (todos) => {
  fs.writeFileSync(path.join(__dirname, 'todos.json'), JSON.stringify(todos, null, 2));
};

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.get('/api/todos', (req, res) => {
  const todos = readTodos();
  res.json(todos);
});

app.post('/api/todos', (req, res) => {
  const { text } = req.body;
  if (!text || text.trim() === '') {
    return res.status(400).json({ error: 'Todo text is required' });
  }
  
  const todos = readTodos();
  const newTodo = {
    id: Date.now(),
    text: text.trim(),
    completed: false,
    createdAt: new Date().toISOString()
  };
  
  todos.push(newTodo);
  writeTodos(todos);
  res.status(201).json(newTodo);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
