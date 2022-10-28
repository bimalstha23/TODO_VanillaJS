

const TODOlist = JSON.parse(window.localStorage.getItem('tasks')) || [];

window.addEventListener('load', () => {
  renderTasks();
  const inputField = document.querySelector('#taskInput_field');
  const form = document.querySelector('#taskInput_form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const task = inputField.value;
    if (task === '' || task === null) return;

    const newTask = {
      id: Date.now(),
      text: task,
      done: false,
      createdAt: new Date().getTime()
    }
    TODOlist.push(newTask);
    window.localStorage.setItem('tasks', JSON.stringify(TODOlist));
    inputField.value = '';
  })


  renderTasks();
})

function renderTasks() {
  const tasks = document.querySelector('.tasks');
  tasks.innerHTML = '';


  TODOlist.forEach((task) => {
    const task_el = document.createElement('div');
    task_el.classList.add('task');
    tasks.appendChild(task_el);
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;

    //update task status
    checkbox.addEventListener('change', () => {
      task.done = !task.done;
      window.localStorage.setItem('tasks', JSON.stringify(TODOlist));
      renderTasks();
    })


    const taskbox = document.createElement('div');
    taskbox.classList.add('taskbox');
    const text = document.createElement('input');
    text.type = 'text';
    text.value = task.text;
    if (task.done) {
      text.classList.add('done');
    }
    text.setAttribute('readonly', true);
    const actions = document.createElement('div');
    actions.classList.add('actions');

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete');
    const deleteIcon = document.createElement('span');
    deleteIcon.classList.add('icon-bin');
    deleteButton.appendChild(deleteIcon);

    const edit = document.createElement('button');
    edit.classList.add('edit');
    const editicon = document.createElement('span');
    editicon.classList.add('icon-pencil');
    edit.appendChild(editicon);
    task_el.append(checkbox, taskbox);
    taskbox.append(text, actions);
    actions.append(edit, deleteButton);

    //update task text
    edit.addEventListener('click', () => {
      text.removeAttribute('readonly');
      text.focus();
      text.addEventListener('blur', () => {
        text.setAttribute('readonly', true);
        task.text = text.value;
        window.localStorage.setItem('tasks', JSON.stringify(TODOlist));
        renderTasks();
      })
    })

    //delete task
    deleteButton.addEventListener('click', () => {
      TODOlist.splice(TODOlist.indexOf(task), 1);
      window.localStorage.setItem('tasks', JSON.stringify(TODOlist));
      renderTasks();
    })
  })
}
