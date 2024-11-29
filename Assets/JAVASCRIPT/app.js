// Task Class
class Task {
    constructor(title, description, deadline, priority) {
        this.title = title;
        this.description = description;
        this.deadline = deadline;
        this.priority = priority;
    }
}

// UI Class
class UI {
    static displayTasks() {
        const tasks = UI.getTasks();
        tasks.forEach(task => UI.addTaskToList(task));
    }

    static addTaskToList(task) {
        const list = document.querySelector('#task-list');
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${task.title}</td>
            <td>${task.description}</td>
            <td>${task.deadline}</td>
            <td>${task.priority}</td>
            <td>
                <button class="edit">Edit</button>
                <button class="delete">Cancel</button>
            </td>
        `;

        list.appendChild(row);
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#description').value = '';
        document.querySelector('#deadline').value = '';
        document.querySelector('#priority').value = '';
    }

    static deleteTask(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static editTask(el) {
        if (el.classList.contains('edit')) {
            const row = el.parentElement.parentElement;
            document.querySelector('#title').value = row.children[0].textContent;
            document.querySelector('#description').value = row.children[1].textContent;
            document.querySelector('#deadline').value = row.children[2].textContent;
            document.querySelector('#priority').value = row.children[3].textContent;

            row.remove();
        }
    }

    static getTasks() {
        return JSON.parse(localStorage.getItem('tasks')) || [];
    }

    static setTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

// Events
document.addEventListener('DOMContentLoaded', UI.displayTasks);

// Add Task
document.querySelector('#task-form').addEventListener('submit', e => {
    e.preventDefault();

    const title = document.querySelector('#title').value;
    const description = document.querySelector('#description').value;
    const deadline = document.querySelector('#deadline').value;
    const priority = document.querySelector('#priority').value;

    const task = new Task(title, description, deadline, priority);

    UI.addTaskToList(task);

    const tasks = UI.getTasks();
    tasks.push(task);
    UI.setTasks(tasks);

    UI.clearFields();
});

// Delete Task
document.querySelector('#task-list').addEventListener('click', e => {
    UI.deleteTask(e.target);

    const tasks = UI.getTasks();
    const newTasks = tasks.filter(
        task =>
            task.title !== e.target.parentElement.parentElement.children[0].textContent
    );
    UI.setTasks(newTasks);
});

// Edit Task
document.querySelector('#task-list').addEventListener('click', e => {
    UI.editTask(e.target);
});

// Search Tasks
document.querySelector('#search-bar').addEventListener('input', e => {
    const query = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#task-list tr');

    rows.forEach(row => {
        const title = row.children[0].textContent.toLowerCase();
        const description = row.children[1].textContent.toLowerCase();
        const deadline = row.children[2].textContent.toLowerCase();

        if (title.includes(query) || description.includes(query) || deadline.includes(query)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
});

// Filter by Priority
document.querySelector('#filter-btn').addEventListener('click', () => {
    const priority = prompt('Enter priority to filter (low, medium, high):').toLowerCase();
    const rows = document.querySelectorAll('#task-list tr');

    rows.forEach(row => {
        const rowPriority = row.children[3].textContent.toLowerCase();
        row.style.display = rowPriority === priority ? '' : 'none';
    });
});



// Toggle visibility of login and signup forms
document.getElementById("show-signup").addEventListener("click", function () {
    document.getElementById("login-form").classList.remove("active");
    document.getElementById("signup-form").classList.add("active");
});

document.getElementById("show-login").addEventListener("click", function () {
    document.getElementById("signup-form").classList.remove("active");
    document.getElementById("login-form").classList.add("active");
});






// Toggle Password Visibility
function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    if (field.type === 'password') {
        field.type = 'text';
    } else {
        field.type = 'password';
    }
}


