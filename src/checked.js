export default () => {
  let tasks = JSON.parse(localStorage.getItem('tasksData'));
  if (tasks === null) {
    tasks = [];
  }
  const elems = document.querySelectorAll('.larger');
  tasks.forEach((task, index) => {
    if (task.completed === true) {
      elems[index].setAttribute('checked', 'true');
    }
  });
};
