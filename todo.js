function applyTheme() {
  const body = document.body;
  const theme = localStorage.getItem('theme');

  if (theme === 'night') {
    body.classList.add('night');
    body.style.backgroundImage = "url('assets/todon.png')";
    body.style.backgroundSize = "100% 100%"; // lock to viewport size
    body.style.backgroundRepeat = "no-repeat";
    body.style.backgroundPosition = "center";
    body.style.backgroundAttachment = "fixed"; // important for fixed background
    body.style.height = "100vh"; // lock to viewport height
    body.style.width = "100vw"; // lock to viewport width
    body.style.overflow = "hidden"; // prevent scrolling
  } else {
    body.classList.remove('night');
    body.style.backgroundImage = "url('assets/todod.png')";
    body.style.backgroundSize = "100% 100%"; // lock to viewport size
    body.style.backgroundRepeat = "no-repeat";
    body.style.backgroundPosition = "center";
    body.style.backgroundAttachment = "fixed"; // important for fixed background
    body.style.height = "100vh"; // lock to viewport height
    body.style.width = "100vw"; // lock to viewport width
    body.style.overflow = "hidden"; // prevent scrolling
  }
}

window.onload = () => {
  applyTheme();

  const homeBtn = document.getElementById('home-btn');
  const timerBtn = document.getElementById('timer-btn');
  const addBtn = document.getElementById('add-task');
  const input = document.getElementById('todo-input');
  const list = document.getElementById('todo-list');

  homeBtn.onclick = () => window.location.href = 'index.html';
  timerBtn.onclick = () => window.location.href = 'timer.html';

  addBtn.onclick = () => {
    const task = input.value.trim();
    if (task) {
      const li = document.createElement('li');
      li.textContent = task;
      list.appendChild(li);
      input.value = '';
    }
  };
};
