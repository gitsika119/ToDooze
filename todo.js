function applyTheme() {
  const body = document.body;
  const theme = localStorage.getItem('theme');

  if (theme === 'night') {
    body.classList.add('night');
    body.style.backgroundImage = "url('assets/todon.png')";
  } else {
    body.classList.remove('night');
    body.style.backgroundImage = "url('assets/todod.png')";
  }

  body.style.backgroundSize = "100% 100%";
  body.style.backgroundRepeat = "no-repeat";
  body.style.backgroundPosition = "center";
  body.style.backgroundAttachment = "fixed";
  body.style.height = "100vh";
  body.style.width = "100vw";
  body.style.overflow = "hidden";
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(addTaskToDOM);
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#todo-list li").forEach(li => {
    tasks.push({
      text: li.querySelector(".task-text").textContent,
      starred: li.classList.contains("starred")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTaskToDOM(taskObj) {
  const list = document.getElementById("todo-list");

  const li = document.createElement("li");
  if (taskObj.starred) li.classList.add("starred");

  const textSpan = document.createElement("span");
  textSpan.className = "task-text";
  textSpan.textContent = taskObj.text;

  const starBtn = document.createElement("button");
  starBtn.innerHTML = "⭐";
  starBtn.title = "Star/Unstar";
  starBtn.onclick = () => {
    li.classList.toggle("starred");
    saveTasks();
  };

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.onclick = () => {
    const newText = prompt("Edit your task:", textSpan.textContent);
    if (newText !== null) {
      textSpan.textContent = newText.trim();
      saveTasks();
    }
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => {
    li.remove();
    saveTasks();
  };

  const btnGroup = document.createElement("div");
  btnGroup.className = "btn-group";
  btnGroup.append(starBtn, editBtn, deleteBtn);

  li.append(textSpan, btnGroup);
  list.appendChild(li);
}

window.onload = () => {
  applyTheme();
  loadTasks();

  const homeBtn = document.getElementById('home');
  const timerBtn = document.getElementById('timer');
  const addBtn = document.getElementById('add-task');
  const input = document.getElementById('todo-input');

  homeBtn.onclick = () => window.location.href = 'index.html';
  timerBtn.onclick = () => window.location.href = 'timer.html';

  addBtn.onclick = () => {
    const task = input.value.trim();
    if (task) {
      addTaskToDOM({ text: task, starred: false });
      saveTasks();
      input.value = '';
    }
  };
};
