const form = document.querySelector(".searchBox");
const input = document.getElementById("todoInput");
const todoContainer = document.querySelector(".todoItems");

// Load todos on page load
window.addEventListener("DOMContentLoaded", loadTodos);

// Add new todo
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoText = input.value.trim();
  if (todoText !== "") {
    const id = Date.now().toString();
    createTodoItem(todoText, id, false);
    saveTodos();
    input.value = "";
  }
});

// Create a todo item
function createTodoItem(text, id, completed) {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  todoDiv.dataset.id = id;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("todo-check");
  checkbox.checked = completed;

  const todoText = document.createElement("span");
  todoText.textContent = text;
  todoText.classList.add("todo-text");
  if (completed) todoText.classList.add("completed");

  const editBtn = document.createElement("button");
  editBtn.textContent = "✏️";
  editBtn.classList.add("edit-btn");

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.classList.add("delete-btn");

  todoDiv.append(checkbox, todoText, editBtn, deleteBtn);
  todoContainer.appendChild(todoDiv);

  addTodoListeners(todoDiv);
}

// Add listeners to a todo item
function addTodoListeners(todoDiv) {
  const checkbox = todoDiv.querySelector(".todo-check");
  const todoText = todoDiv.querySelector(".todo-text");
  const editBtn = todoDiv.querySelector(".edit-btn");
  const deleteBtn = todoDiv.querySelector(".delete-btn");

  checkbox.addEventListener("change", () => {
    todoText.classList.toggle("completed", checkbox.checked);
    saveTodos();
  });

  editBtn.addEventListener("click", () => {
    if (editBtn.textContent === "✏️") {
      const input = document.createElement("input");
      input.type = "text";
      input.value = todoText.textContent;
      input.classList.add("edit-input");
      todoDiv.replaceChild(input, todoText);
      input.focus();
      input.select();
      editBtn.textContent = "📝";
    } else {
      const input = todoDiv.querySelector(".edit-input");
      const newText = input.value.trim();
      if (newText !== "") {
        todoText.textContent = newText;
      }
      todoDiv.replaceChild(todoText, input);
      editBtn.textContent = "✏️";
      saveTodos();
    }
  });

  deleteBtn.addEventListener("click", () => {
    todoDiv.remove();
    saveTodos();
  });
}

// Save all todos to localStorage
function saveTodos() {
  const todos = [];
  document.querySelectorAll(".todo").forEach((todoDiv) => {
    const id = todoDiv.dataset.id;
    const text = todoDiv.querySelector(".todo-text").textContent;
    const completed = todoDiv.querySelector(".todo-check").checked;
    todos.push({ id, text, completed });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Load todos from localStorage
function loadTodos() {
  const saved = JSON.parse(localStorage.getItem("todos")) || [];
  saved.forEach(({ id, text, completed }) => {
    createTodoItem(text, id, completed);
  });
}