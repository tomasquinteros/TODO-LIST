const inputTask = document.querySelector("input")
const btnADD = document.querySelector(".btnSubmit")
const tasks = document.querySelector(".ul-container");
const empty = document.querySelector("span")
const btnClearAll = document.querySelector(".btnClearAll")
const taskData = [];
const getData = localStorage.getItem("data")
empty.style.color = "red";
if (getData) {
  JSON.parse(getData).forEach(element => {
    createElement(element.task)
    taskData.push(element)
    empty.style.display = "none"
  });
}

btnADD.addEventListener("click", event => {
  event.preventDefault();
  const text = inputTask.value;
  
  if (text.length > 0) {
    createElement(text)
    addNewTask(text)
  }
  empty.style.display = "none"
  inputTask.value = ""
})

function createElement(text) {
  const list = document.createElement("li");
  const parraf = document.createElement("p");
  parraf.classList.add("task-parraf")
  parraf.textContent= text;
  list.appendChild(addCheckCompleted())
  list.appendChild(parraf)
  list.appendChild(addButtonDelete());
  tasks.appendChild(list)
}
function addNewTask (text) {
  taskData.push({task: text})
  localStorage.setItem("data", JSON.stringify(taskData))
}
function addButtonDelete () {
  const btnDel = document.createElement("button")
  btnDel.classList.add = "deleted";
  btnDel.textContent = "X"
  btnDel.addEventListener("click", event => {
    const liQuantities = document.querySelectorAll("li").length;
    const list = event.target.parentElement;
    const p = list.querySelector("p.task-parraf").textContent;
    for (let i=0; i < taskData.length; i++) {
      if (taskData[i].task === p) {
        taskData.splice(i, 1);
      }
    }
    localStorage.setItem("data", JSON.stringify(taskData))
    tasks.removeChild(list);
    if (liQuantities === 0) {
      console.log(liQuantities)
      empty.style.display = "block"
    }
  })
  return btnDel;
}

function addCheckCompleted () {
  const inputCompleted = document.createElement("input")
  inputCompleted.type = "checkbox";
  inputCompleted.addEventListener("click", event => {
    const { checked } = event.currentTarget;
    const list = inputCompleted.parentNode
    const p = document.querySelector("p.task-parraf")
    if (checked) {
      p.style.textDecoration = "line-through";
      list.style.opacity = "0.75"
    } else {
      p.style.textDecoration = "none"
      list.style.opacity = "1"
    }
  })
  return inputCompleted;
}