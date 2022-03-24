import "./style.css";

const input = document.querySelector(".form-input input");
const checkbox = document.querySelector(".form-checkbox");

let tasks = JSON.parse(localStorage.getItem("tasksData"));
if (tasks === null) {
  tasks = [];
} else {
  tasks;
}

window.addEventListener("DOMContentLoaded", () => {
  displayTasks();
});

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
  localStorage.setItem("tasksData", JSON.stringify(tasks));
};

input.addEventListener("keydown", (event) => {
  if (event.keyCode === 13 && input.value !== "") {
    event.preventDefault();
    let task = {
      taskIndex: tasks.length,
      description: input.value,
      completed: "false",
    };
    tasks.push(task);
    displayTasks();
    input.value = "";
  }
});

checkbox.addEventListener("keypress", (event) => {
  if (event.target.classList.contains("edit")) {
    let edit = event.target.id;
    if (event.keyCode === 13 && event.target.textContent !== "") {
      tasks[edit].description = event.target.textContent;
      displayTasks();
    }
  }
});

window.removeList = (taskIndex) => {
  tasks.splice(taskIndex, 1);
  for (let task of tasks) {
    if (task.taskIndex > taskIndex) {
      task.taskIndex -= 1;
    }
  }
  displayTasks();
};

checkbox.addEventListener("click", (event) => {
  if (event.target.classList.contains("larger")) {
    let checked = event.target.id;
    if (event.target.classList.toggle("checked")) {
      tasks[checked].completed = "true";
    } else {
      tasks[checked].completed = "false";
    }
  }
});

window.clearAll = () => {
  tasks = tasks.filter((task) => task.completed !== "true");
  tasks.forEach((task, index) => {
    task.taskIndex = index;
  });
  displayTasks();
};