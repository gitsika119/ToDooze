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
  body.style.overflowY = "auto";
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
  starred: li.classList.contains("starred"),
  done: li.classList.contains("done")
    });
});
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTaskToDOM(taskObj) {
  const list = document.getElementById("todo-list");
  const li = document.createElement("li");
    const textSpan = document.createElement("span");
  textSpan.className = "task-text";
  textSpan.textContent = taskObj.text;
  li.style.backgroundColor = "rgba(255, 255, 255, 1)";
  const starBtn = document.createElement("button");
  starBtn.style.backgroundImage = "url('assets/star1.png')";
  starBtn.style.backgroundSize = "cover";
  starBtn.style.width = "20px";
  starBtn.style.height = "20px";
  starBtn.style.border = "none";
  starBtn.textContent = ""; // Make sure no text
  starBtn.title = "Star/Unstar";
  starBtn.onclick = () => {
  li.classList.toggle("starred");
  const starred = li.classList.contains("starred");
  starBtn.style.backgroundImage = starred 
    ? "url('assets/star1.png')" 
    : "url('assets/star2.png')";
  saveTasks();
  const sound = document.getElementById("click-sound");
  sound.currentTime = 0; 
  sound.play();
};


const doneBtn = document.createElement("button");
doneBtn.title = "Mark as Done";
doneBtn.style.backgroundImage = "url('assets/check.png')";
doneBtn.style.backgroundSize = "cover";
doneBtn.style.width = "20px";
doneBtn.style.height = "20px";
doneBtn.style.border = "none";
doneBtn.textContent = ""; // Make sure no text
doneBtn.onclick = () => {
  li.classList.toggle("done");
  const done = li.classList.contains("done");
  doneBtn.style.backgroundImage = done 
    ? "url('assets/check.png')" 
    : "url('assets/check1.png')";
  saveTasks();
  const sound = document.getElementById("click-sound");
  sound.currentTime = 0;
  sound.play();
};
if (taskObj.starred) {
  li.classList.add("starred");
  starBtn.style.backgroundImage = "url('assets/star1.png')";
} else {
  starBtn.style.backgroundImage = "url('assets/star2.png')";
}
  if (taskObj.done) {
  li.classList.add("done");
  doneBtn.style.backgroundImage = "url('assets/check.png')";
} else {
  doneBtn.style.backgroundImage = "url('assets/check1.png')";
}
  const editBtn = document.createElement("button");
editBtn.title = "Edit";
editBtn.style.backgroundImage = "url('assets/edit.png')";
editBtn.style.backgroundSize = "cover";
editBtn.style.width = "20px";
editBtn.style.height = "20px";
editBtn.style.border = "none";
editBtn.textContent = ""; // Make sure no text
editBtn.onclick = () => {
  editBtn.style.backgroundImage = "url('assets/edit.png')";
  sound = document.getElementById("click-sound");
  sound.currentTime = 0;
  sound.play();
  const input = document.createElement("input");
  input.type = "text";
  input.value = textSpan.textContent;
  input.className = "edit-input";
  input.style.fontSize = "16px";
  input.style.flex = "1";
  textSpan.replaceWith(input);
  input.focus();

  // Save on blur or Enter key
  const saveEdit = () => {
    editBtn.style.backgroundImage = "url('assets/edit1.png')";
    const newText = input.value.trim();
    if (newText !== "") {
      textSpan.textContent = newText;
    }
    input.replaceWith(textSpan);
    saveTasks();
  };

  input.addEventListener("blur", saveEdit);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      saveEdit();
    }
  });
};

const deleteBtn = document.createElement("button");
deleteBtn.title = "Delete";
deleteBtn.style.backgroundImage = "url('assets/trash.png')";
deleteBtn.style.backgroundSize = "cover";
deleteBtn.style.width = "20px";
deleteBtn.style.height = "20px";
deleteBtn.style.border = "none";
deleteBtn.textContent = ""; 
deleteBtn.onclick = () => {
  li.remove();
  saveTasks();
  sound = document.getElementById("click-sound");
  sound.currentTime = 0;
  sound.play();
};
deleteBtn.addEventListener("mouseover", () => {
  deleteBtn.style.backgroundImage = "url('assets/trash1.png')";
});
deleteBtn.addEventListener("mouseout", () => {
  deleteBtn.style.backgroundImage = "url('assets/trash.png')";
});

  const btnGroup = document.createElement("div");
  btnGroup.className = "btn-group";
  btnGroup.append(starBtn, doneBtn, editBtn, deleteBtn);

  li.append(textSpan, btnGroup);
  list.appendChild(li);
}

document.addEventListener("DOMContentLoaded", () => {
  applyTheme();
  loadTasks();

  const homeBtn = document.getElementById('home');
  const timerBtn = document.getElementById('timer');
  const addBtn = document.getElementById('add-task');
  const input = document.getElementById('todo-input');

  if (addBtn) {
    addBtn.onclick = () => {
      const task = input.value.trim();
      sound = document.getElementById("click-sound");
      sound.currentTime = 0;
      sound.play();
      if (task) {
        addTaskToDOM({ text: task, starred: false });
        saveTasks();
        input.value = '';
      }
    };
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const clickSound = document.getElementById("click-sound");

  // Play click sound for all buttons with sound="click"
  document.querySelectorAll('[sound="click"]').forEach(button => {
    button.addEventListener("click", () => {
      if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play().catch(err => {
          console.warn("Click sound failed:", err);
        });
      }
    });
  });
});

function playClickSound(destination) {
      const audio = document.getElementById('click-sound');
      audio.currentTime = 0; // Restart sound if it's already playing
      audio.play();
      setTimeout(() => {
        location.href = destination;
      }, 100); // Slight delay so click sound plays before redirect
    }