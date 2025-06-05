function applyTheme() {
  const body = document.body;
  const theme = localStorage.getItem('theme');
  if (theme === 'night') {
    body.classList.add('night');
    body.style.backgroundImage = "url('assets/timern.png')";
    body.style.backgroundSize = "100% 100%"; // lock to viewport size
    body.style.backgroundRepeat = "no-repeat";
    body.style.backgroundPosition = "center";
    body.style.backgroundAttachment = "fixed"; // important for fixed background
    body.style.height = "100vh"; // lock to viewport height
    body.style.width = "100vw"; // lock to viewport width
    body.style.overflow = "hidden"; // prevent scrolling
  } else {
    body.classList.remove('night');
    body.style.backgroundImage = "url('assets/timerd.png')";
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
  const todoBtn = document.getElementById('todo-btn');

  homeBtn.onclick = () => window.location.href = 'index.html';
  todoBtn.onclick = () => window.location.href = 'todo.html';
};
