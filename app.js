// DOM element
const todoForm = document.querySelector("#form");
const todoList = document.querySelector(".todos");
const mainInput = document.querySelector(".text");
const btnWrite = document.querySelector(".btn-write");
const waitingTask = document.querySelector(".wait");
const complecatedTask = document.querySelector(".finish");
const totalTask = document.querySelector(".total");

//  code
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

if (localStorage.getItem("tasks")) {
  tasks.map((task) => {
    createTask(task);
  });
}

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = mainInput.value;

  if (inputValue == "") {
    return;
  }
  const task = {
    id: new Date().getTime(),
    name: inputValue,
    isComplecated: false,
  };
  localStorage.setItem("tasks", JSON.stringify(tasks));
  createTask(task);

  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  todoForm.reset();
  mainInput.focus();
});

// todoList.parentClass
todoList.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-btn") || e.target.parentElement.classList.contains("remove-btn")) {
    const taskId = e.target.closest("li").id;
    removeTask(taskId);
  }
});

todoList.addEventListener("input", (e) => {
  const taskId = e.target.closest("li").id;
  updateTask(taskId, e.target);
});

function createTask(task) {
  const taskEl = document.createElement("li");
  taskEl.setAttribute("id", task.id);
  if (task.isComplecated) {
    taskEl.classList.add("complete");
  }
  const taskElMarkup = `<div>
              <input type="checkbox" name="" id="${task.id}" ${task.isComplecated ? "checked" : ""}/>
               <span  ${!task.isComplecated ? "contenteditable" : ""}>${task.name}</span>
               </div>
            <button class="remove-btn" ${task.name}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0.335683 0.335683C0.441822 0.229276 0.56791 0.144854 0.706726 0.0872515C0.845542 0.0296493 0.994358 0 1.14465 0C1.29494 0 1.44376 0.0296493 1.58257 0.0872515C1.72139 0.144854 1.84748 0.229276 1.95362 0.335683L8.0003 6.38465L14.047 0.335683C14.1532 0.229448 14.2793 0.145178 14.4181 0.0876841C14.5569 0.0301901 14.7057 0.000598232 14.8559 0.000598232C15.0062 0.000598232 15.155 0.0301901 15.2938 0.0876841C15.4326 0.145178 15.5587 0.229448 15.6649 0.335683C15.7712 0.441918 15.8554 0.568038 15.9129 0.70684C15.9704 0.845643 16 0.994411 16 1.14465C16 1.29489 15.9704 1.44366 15.9129 1.58246C15.8554 1.72126 15.7712 1.84738 15.6649 1.95362L9.61595 8.0003L15.6649 14.047C15.7712 14.1532 15.8554 14.2793 15.9129 14.4181C15.9704 14.5569 16 14.7057 16 14.8559C16 15.0062 15.9704 15.155 15.9129 15.2938C15.8554 15.4326 15.7712 15.5587 15.6649 15.6649C15.5587 15.7712 15.4326 15.8554 15.2938 15.9129C15.155 15.9704 15.0062 16 14.8559 16C14.7057 16 14.5569 15.9704 14.4181 15.9129C14.2793 15.8554 14.1532 15.7712 14.047 15.6649L8.0003 9.61595L1.95362 15.6649C1.84738 15.7712 1.72126 15.8554 1.58246 15.9129C1.44366 15.9704 1.29489 16 1.14465 16C0.994411 16 0.845643 15.9704 0.70684 15.9129C0.568038 15.8554 0.441918 15.7712 0.335683 15.6649C0.229448 15.5587 0.145178 15.4326 0.0876841 15.2938C0.0301901 15.155 0.000598232 15.0062 0.000598232 14.8559C0.000598232 14.7057 0.0301901 14.5569 0.0876841 14.4181C0.145178 14.2793 0.229448 14.1532 0.335683 14.047L6.38465 8.0003L0.335683 1.95362C0.229276 1.84748 0.144854 1.72139 0.0872515 1.58257C0.0296493 1.44376 0 1.29494 0 1.14465C0 0.994358 0.0296493 0.845542 0.0872515 0.706726C0.144854 0.56791 0.229276 0.441822 0.335683 0.335683Z"
                  fill="#E8ECD7"
                />
              </svg>
            </button>`;

  taskEl.innerHTML = taskElMarkup;

  todoList.appendChild(taskEl);
  countTask();
}

function countTask() {
  const complitedTaskArray = tasks.filter((task) => {
    task.isComplecated === true;
  });

  totalTask.textContent = tasks.length;
  complecatedTask.textContent = complitedTaskArray.length;
  waitingTask.textContent = tasks.length - complitedTaskArray.length;
}

function removeTask(taskId) {
  tasks = tasks.filter((task) => task.id !== parseInt(taskId));

  localStorage.setItem("tasks", JSON.stringify(tasks));
  document.getElementById(taskId).remove();
  countTask();
}

function updateTask(taskId, el) {
  const task = tasks.find((task) => task.id == parseInt(taskId));

  if (el.hasAttribute("contenteditable")) {
    task.name = el.name;
  } else {
    const span = el.nextElementSibling;
    const parent = el.closest("li");

    task.isComplecated = !task.isComplecated;
    if (task.isComplecated) {
      span.removeAttribute("contenteditable");
      parent.classList.add("complete");
    } else {
      parent.classList.remove("complete");
      span.setAttribute("contenteditable", "true");
    }
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
  countTask();
}
