const API_URL = 'http://localhost:3000/api/todos';

function fetchTodos() {
  fetch(API_URL)
    .then(res => res.json())
    .then(todos => {
      const todoList = document.getElementById('todo-list');
      todoList.innerHTML = '';
      todos.forEach(todo => {
        const li = document.createElement('li');
        li.textContent = todo.text;
        if (todo.completed) li.classList.add('completed');
        todoList.appendChild(li);
      });
    });
}

document.addEventListener('DOMContentLoaded', fetchTodos);
