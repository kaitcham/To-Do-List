import checkedOnLoad from "./checked.js";

const input = document.querySelector(".form-input input");
const checkbox = document.querySelector(".form-checkbox");

let tasks = JSON.parse(localStorage.getItem("tasksData"));
if (tasks === null) {
  tasks = [];
}

const displayTasks = () => {
  let taskCode = "";
  tasks.forEach((task) => {
    const { taskIndex, description } = task;
    taskCode += `
        <li class="checkbox">
            <input type="checkbox" id="${taskIndex}" class="larger">
            <p class="edit" id="${taskIndex}" contenteditable>${description}</p>
            <i class="fa-solid fa-trash" onclick='removeList("${taskIndex}")'></i>
        </li>
        <hr>
        `;
  });
  checkbox.innerHTML = taskCode;
  checkedOnLoad();
  localStorage.setItem("tasksData", JSON.stringify(tasks));
};

input.addEventListener("keypress", (event) => {
  if (event.keyCode === 13 && input.value !== "") {
    event.preventDefault();
    const task = {
      taskIndex: tasks.length + 1,
      description: input.value,
      completed: false,
    };
    tasks.push(task);
    displayTasks();
    input.value = "";
  }
});

checkbox.addEventListener("keypress", (event) => {
  if (event.target.classList.contains("edit")) {
    const edit = event.target.id - 1;
    if (event.keyCode === 13 && event.target.textContent !== "") {
      tasks[edit].description = event.target.textContent;
      displayTasks();
    }
  }
});

window.removeList = (taskIndex) => {
  tasks.splice(taskIndex - 1, 1);
  tasks.forEach((task, index) => {
    task.taskIndex = index + 1;
  });
  localStorage.setItem("tasksData", JSON.stringify(tasks));
  displayTasks();
};

checkbox.addEventListener("click", (event) => {
  if (event.target.classList.contains("larger")) {
    const checked = event.target.id - 1;
    if (event.target.getAttribute("checked") === null) {
      event.target.setAttribute("checked", "true");
      tasks[checked].completed = true;
      localStorage.setItem("tasksData", JSON.stringify(tasks));
    } else {
      event.target.removeAttribute("checked");
      tasks[checked].completed = false;
      localStorage.setItem("tasksData", JSON.stringify(tasks));
    }
  }
});

window.clearAll = () => {
  tasks = tasks.filter((task) => task.completed !== true);
  tasks.forEach((task, index) => {
    task.taskIndex = index + 1;
  });
  displayTasks();
  localStorage.setItem("tasksData", JSON.stringify(tasks));
};

window.addEventListener("DOMContentLoaded", () => {
  displayTasks();
});
