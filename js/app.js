const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const addButton = document.getElementById("add-button");
const editButton = document.getElementById("edit-button");
const tbody = document.querySelector("tbody");
const deleteButton = document.getElementById("delete-button");
const alertEle = document.getElementById("alert");
const filterButtons = document.querySelectorAll(".filter-button");

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
    showAlert("Please enter a value", "error");
  } else {
    todos.push(todo);
    saveToLocalStorage();
    displayTodos();
    showAlert("Note added successfully", "success");
    taskInput.value = "";
    dateInput.value = "";
    console.log(todos);
  }
};

const saveToLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const generateID = () => {
  return Math.trunc(Math.random() * Math.random() * Math.pow(10, 15));
};

const showAlert = (message, type) => {
  alertEle.innerHTML = "";
  const alert = document.createElement("p");
  alert.innerText = message;
  alert.classList.add("alert");
  alert.classList.add(`alert-${type}`);
  alertEle.append(alert);
  setTimeout(() => {
    alert.style.display = "none";
  }, 1500);
};

const displayTodos = (data) => {
  const dataTodos = data || todos;
  tbody.innerHTML = "";
  if (!dataTodos.length) {
    tbody.innerHTML =
      "<tr><td class='empty' colspan='4' >❌ no todo found ❌</td></tr>";
    return;
  }

  dataTodos.forEach((todo) => {
    tbody.innerHTML += `
        <tr>
        <td>${todo.task}</td>
        <td>${todo.date || "No Date"}</td>
        <td>${todo.completed ? "Completed" : "Pending"}</td>
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

const deleteAllHandler = (event) => {
  event.preventDefault();
  if (todos.length) {
    todos = [];
    localStorage.removeItem("todos");
    saveToLocalStorage();
    displayTodos();
    showAlert("All notes have been successfully deleted", "success");
  } else {
    showAlert("No note found", "error");
  }
};

const deleteHandler = (id) => {
  const result = todos.filter((todo) => todo.id !== id);
  todos = result;
  saveToLocalStorage();
  displayTodos();
  showAlert("Note deleted successfully", "success");
};

const toggleHandler = (id) => {
  const result = todos.find((todo) => todo.id === id);
  result.completed = !result.completed;
  saveToLocalStorage;
  displayTodos();
  showAlert("Note to change status successfully", "success");
};

const editHandler = (id) => {
  const result = todos.find((todo) => todo.id === id);
  taskInput.value = result.task;
  dateInput.value = result.date;
  addButton.style.display = "none";
  editButton.style.display = "inline";
  editButton.dataset.id = id;
};

const applyEditHandler = (event) => {
  event.preventDefault();
  const id = +event.target.dataset.id;
  const result = todos.find((todo) => todo.id === id);
  result.task = taskInput.value;
  result.date = dateInput.value;
  saveToLocalStorage();
  displayTodos();
  showAlert("Note changed successfully", "success");
};

const filterHandler = (event) => {
  event.preventDefault();
  const filter = event.target.dataset.filter;
  let filteredTodos = [];

  switch (filter) {
    case "pending":
      filteredTodos = todos.filter((todo) => todo.completed === false);
      break;

    case "completed":
      filteredTodos = todos.filter((todo) => todo.completed === true);
      break;

    default:
      filteredTodos = todos;
      break;
  }
  displayTodos(filteredTodos);
};

window.addEventListener("load", displayTodos());
addButton.addEventListener("click", addHandler);
deleteButton.addEventListener("click", deleteAllHandler);
editButton.addEventListener("click", applyEditHandler);
filterButtons.forEach((buttons) => {
  buttons.addEventListener("click", filterHandler);
});
