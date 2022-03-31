/**
 * @jest-environment jsdom
 */
import TaskList from './task.js';

document.body.innerHTML = `<section class="d-flex cols todo-list">
      <header class="header d-flex s-between">
          <h2>Today's To Do </h2>
          <span class="material-icons" id="delete-all">autorenew</span>
      </header>
      <form action="#" class="d-flex s-between" id="add-task">
          <input type="text" name="activity" placeholder="Add your List">
          <button type="submit">
              <span class="material-icons">keyboard_return</span>
          </button>
      </form>
      <ul id="list-items">

      </ul>
      <div class="d-flex clear-completed">
        Clear All Completed
      </div>
    </section>`;

describe('add and remove', () => {
  // test for add task method
  window.localStorage = Storage.prototype;
  test('Add task', () => {
    const todoList = new TaskList();
    todoList.addTask('Test');
    expect(todoList.list).toHaveLength(1);
    // local storage test
    const storage = JSON.parse(localStorage.getItem('todo-list'));
    expect(storage).not.toBe(null);
    expect(localStorage).toHaveLength(1);
  });

  test('remove', () => {
    // test for remove task
    const removeTask = new TaskList();
    removeTask.refresh();
    removeTask.addTask('test');
    removeTask.addTask('test');
    removeTask.addTask('test');
    removeTask.deleteTask(1);
    expect(removeTask.list).toHaveLength(2);
  });
});
