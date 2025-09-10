document.addEventListener('DOMContentLoaded', function() {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const addBtn = document.getElementById('add-btn');
    const todoList = document.getElementById('todo-list');
    const messageDiv = document.getElementById('message');

    // Load todos when page loads
    loadTodos();

    // Handle form submission
    todoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        addTodo();
    });

    // Add todo function
    async function addTodo() {
        const text = todoInput.value.trim();
        
        if (!text) {
            showMessage('Please enter a todo item', 'error');
            return;
        }

        // Disable button while adding
        addBtn.disabled = true;
        addBtn.textContent = 'Adding...';

        try {
            const response = await fetch('/api/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: text })
            });

            if (response.ok) {
                const newTodo = await response.json();
                todoInput.value = '';
                showMessage('Todo added successfully!', 'success');
                loadTodos(); // Reload the list
            } else {
                const error = await response.json();
                showMessage(error.error || 'Failed to add todo', 'error');
            }
        } catch (error) {
            console.error('Error adding todo:', error);
            showMessage('Failed to add todo. Please try again.', 'error');
        } finally {
            // Re-enable button
            addBtn.disabled = false;
            addBtn.textContent = 'Add Todo';
        }
    }

    // Load todos from backend
    async function loadTodos() {
        try {
            const response = await fetch('/api/todos');
            const todos = await response.json();
            renderTodos(todos);
        } catch (error) {
            console.error('Error loading todos:', error);
            showMessage('Failed to load todos', 'error');
        }
    }

    // Render todos in the DOM
    function renderTodos(todos) {
        todoList.innerHTML = '';
        
        if (todos.length === 0) {
            todoList.innerHTML = '<div class="empty-state">No todos yet. Add one above!</div>';
            return;
        }

        todos.forEach(todo => {
            const todoItem = document.createElement('div');
            todoItem.className = 'todo-item';
            todoItem.innerHTML = `
                <div class="todo-text">${escapeHtml(todo.text)}</div>
                <div class="todo-date">Added: ${formatDate(todo.createdAt)}</div>
            `;
            todoList.appendChild(todoItem);
        });
    }

    // Show message to user
    function showMessage(text, type) {
        messageDiv.textContent = text;
        messageDiv.className = `message ${type}`;
        messageDiv.style.display = 'block';
        
        // Hide message after 3 seconds
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 3000);
    }

    // Escape HTML to prevent XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Format date for display
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }
});