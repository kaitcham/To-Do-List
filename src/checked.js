let tasks = JSON.parse(localStorage.getItem('tasksData'));
if (tasks === null) {
  tasks = [];
}

export default () => {
  const elems = document.querySelectorAll('.larger');
  tasks.forEach((task, index) => {
    if (task.completed === true) {
      elems[index].setAttribute('checked', 'true');
    }
  });
};