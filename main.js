
const TODOlist = [
  {
    id: 1,
    text: "Learn JS",
    done: true,
    createdAt: new Date().getTime
  },
  {
    id: 2,
    text: "Learn React",
    done: false,
    createdAt: new Date().getTime
  },
  {
    id: 3,
    text: "Learn Redux",
    done: false,
    createdAt: new Date().getTime
  },
  {
    id: 4,
    text: "Learn Node",
    done: false,
    createdAt: new Date().getTime
  },
]

const tasks = window.localStorage.getItem('tasks') || [];
window.addEventListener('load', () => {
  const inputField = document.querySelector('#taskInput_field');
  console.log(inputField);
  const form = document.querySelector('#taskInput_form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const task = inputField.value;
    const newTask = {
      id: Date.now(),
      text: task,
      done: false,
      createdAt: new Date().getTime()
    }
    TODOlist.push(newTask);
    console.log(TODOlist);
    inputField.value = '';
  })
})




