const form = document.querySelector(".searchBox");
const input = document.getElementById("todoInput");
const todoContainer = document.querySelector(".todoItems");

//Adding Todos:
const addTodo = form.addEventListener('submit', (e) => {
    e.preventDefault();
    const todoText = input.value.trim();
    if (todoText != "") {
        createTodoItem(todoText);
        input.value = "";
    }
});

// Creating a todo Item:
function createTodoItem(text) {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('todo-check');

    const todoText = document.createElement('span');
    todoText.textContent = text;
    todoText.classList.add('todo-text');

    const editBtn = document.createElement('button');
    editBtn.textContent = '✏️';
    editBtn.classList.add('edit-btn');

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "❌";
    deleteBtn.classList.add('delete-btn');

    todoDiv.append(checkbox, todoText, editBtn, deleteBtn);
    todoContainer.appendChild(todoDiv);

    addTodoListeners(todoDiv);
}

function addTodoListeners(todoDiv) {
    const checkbox = todoDiv.querySelector('.todo-check');
    const todoText = todoDiv.querySelector('.todo-text');
    const editBtn = todoDiv.querySelector('.edit-btn');
    const deleteBtn = todoDiv.querySelector('.delete-btn');

    checkbox.addEventListener('change', () => {
        todoText.classList.toggle('completed', checkbox.checked);
    });

    editBtn.addEventListener('click', () => {

        if (editBtn.textContent == '✏️') {
            const input = document.createElement('input');
            input.type = 'text';
            input.value = todoText.textContent;
            input.classList.add('edit-input');
            todoDiv.replaceChild(input, todoText);
            input.focus();
            input.select();
            editBtn.textContent = '📝';
        } else {
            const input = todoDiv.querySelector('.edit-input');
            const newText = input.value.trim();

            if (newText !== '') {
                todoText.textContent = newText;
            }

            todoDiv.replaceChild(todoText, input);
            editBtn.textContent = '✏️';
        }
    });

    deleteBtn.addEventListener('click', () => {
        todoDiv.remove();
    });
}