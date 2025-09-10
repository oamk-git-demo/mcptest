const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const TODOS_FILE = path.join(__dirname, 'todos.json');

app.use(express.json());

app.get('/api/todos', (req, res) => {
  fs.readFile(TODOS_FILE, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to read todos.' });
    res.json(JSON.parse(data));
  });
});

app.get('/', (req, res) => {
  res.send('Hello from Express server!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
