// import 'Style/Style.css';

// const TODOlist = []


const TODOlist =JSON.parse(window.localStorage.getItem('tasks')) || [];


window.addEventListener('load', () => {
  const inputField = document.querySelector('#taskInput_field');
  console.log(inputField);
  const form = document.querySelector('#taskInput_form');


  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const task = inputField.value;
    if(task==='' || task===null) return;
    
    const newTask = {
      id: Date.now(),
      text: task,
      done: false,
      createdAt: new Date().getTime()
    }
    TODOlist.push(newTask);
    window.localStorage.setItem('tasks', JSON.stringify(TODOlist));
    inputField.value = '';
    renderTasks();
  })


  renderTasks();
})

function renderTasks() {
  const tasks = document.querySelector('.tasks');
  tasks.innerHTML='';


  TODOlist.forEach((task) => {
    const task_el = document.createElement('div');
    task_el.classList.add('task');
    tasks.appendChild(task_el);
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;
    const taskbox = document.createElement('div');
    taskbox.classList.add('taskbox');
    const text = document.createElement('input');
    text.type = 'text';
    text.value = task.text;
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
    task_el.append(checkbox,taskbox);
    taskbox.append(text,actions);
    actions.append(edit, deleteButton);
  })
}
