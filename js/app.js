const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const addButton = document.getElementById("add-button");
const editButton = document.getElementById("edit-button");
const tbody = document.querySelector("tbody");
const deleteButton = document.getElementById("delete-button");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

const addHandler = (event) => {
  event.preventDefault();
  const task = taskInput.value;
  const date = dateInput.value;
  const todo = {
    id: generateID(),
    task,
    date,
    completed: false,
  };

  if (!task) {
    alert("Enter any Sentence");
  } else {
    todos.push(todo);
    saveHandler();
    displayTodos();
    taskInput.value = "";
    dateInput.value = "";
    console.log(todos);
  }
};

const saveHandler = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const generateID = () => {
  return Math.trunc(Math.random() * Math.random() * Math.pow(10, 15));
};

const displayTodos = () => {
  tbody.innerHTML = "";
  if (!todos.length) {
    tbody.innerHTML =
      "<tr><td class='empty' colspan='4' >❌ no todo found ❌</td></tr>";
    return;
  }

  todos.forEach((todo) => {
    tbody.innerHTML += `
        <tr>
        <td>${todo.task}</td>
        <td>${todo.date || "No Date"}</td>
        <td>${todo.completed === todo.completed ? "Pending" : "Completed"}</td>
        <td>
            <button onclick='editHandler(${todo.id})'>Edit</button>
            <button onclick='toggleHandler(${todo.id})'>
                ${todo.completed ? "Undo" : "Do"}
            </button>
            <button onclick='deleteHandler(${todo.id})'>Delete</button>
        </td>
        </tr>`;
  });
};

const deleteAllHandler = () => {
  todos = [];
  localStorage.removeItem("todos");
  saveHandler();
  displayTodos();
};

const deleteHandler = (id) => {
  const result = todos.filter((todo) => todo.id !== id);
  todos = result;
  saveHandler();
  displayTodos();
};

const toggleHandler = (id) => {
  const result = todos.find((todo) => todo.id === id);
  result.completed = !result.completed;
  saveHandler();
  displayTodos();
};

const editHandler = (id) => {
  const result = todos.find((todo) => todo.id === id);
  taskInput.value = result.task;
  dateInput.value = result.date;
  addButton.style.display = "none";
  editButton.style.display = "inline";
  editButton.dataset.id = id;
};

window.addEventListener("load", displayTodos());
addButton.addEventListener("click", addHandler);
deleteButton.addEventListener("click", deleteAllHandler);
