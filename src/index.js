import './style.css';
import TaskList from './task.js';

const tasks = new TaskList();

document.querySelector('#add-task').addEventListener('submit', (e) => {
  e.preventDefault();
  const activity = e.target.elements.activity.value;
  tasks.addTask(activity);
  e.target.reset();
});

document.querySelector('#delete-all').addEventListener('click', () => {
  tasks.refresh();
});

document.querySelector('.clear-completed').addEventListener('click', () => {
  tasks.clearCompleted();
});
