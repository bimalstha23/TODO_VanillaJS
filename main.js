const TODOlist = JSON.parse(window.localStorage.getItem('tasks')) || []; // get task from local storage and if not present then create an empty array

window.addEventListener('load', () => {
  const date = new Date().toLocaleString('en-US', { month: 'short' }); //get current month
  const day = new Date().getDate();
  const date_el = document.querySelector('.today');
  const todaysdate_el = document.createElement('h3');
  todaysdate_el.innerText = `${date} ${day}`;
  date_el.appendChild(todaysdate_el);
  renderTasks();
  const inputField = document.querySelector('#taskInput_field');
  const form = document.querySelector('#taskInput_form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const task = inputField.value;
    if (task === '' || task === null) return; //should not accept empty task
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
})



function renderTasks() {
  const tasks = document.querySelector('.tasks');
  tasks.innerHTML = ''; // clear the list so tasks don't duplicate while re rendering the Task 


  TODOlist.forEach((task) => {
    const task_el = document.createElement('div');
    task_el.classList.add('task');
    tasks.appendChild(task_el);
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;

    //update task status
    checkbox.addEventListener('change', () => { //checkbox change event
      task.done = !task.done; //toggle task status
      window.localStorage.setItem('tasks', JSON.stringify(TODOlist)); //update local storage
      renderTasks();
    })


    const taskbox = document.createElement('div');
    taskbox.classList.add('taskbox');
    const text = document.createElement('input');
    text.type = 'text';
    text.value = task.text;

    if (task.done) {
      text.classList.add('done'); //add done class to text if task is done
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
      text.removeAttribute('readonly'); //remove readonly attribute
      text.focus(); //focus on input field so that user can start typing
      text.addEventListener('blur', () => { //when user clicks outside the input field then update the task
        text.setAttribute('readonly', true);
        if(text.value===''||text.value===null){
          text.value=task.text;
          return;
        }; 
        task.text = text.value;
        window.localStorage.setItem('tasks', JSON.stringify(TODOlist));
        renderTasks();
      })
    })


    //delete task
    deleteButton.addEventListener('click', () => {
      TODOlist.splice(TODOlist.indexOf(task), 1); //remove task from array
      window.localStorage.setItem('tasks', JSON.stringify(TODOlist)); //updates  local storage
      renderTasks(); //re-render tasks
    })
  })
}
