const { shell } = require('electron');
const path = require('path');
const fs = require('fs');

// Button navigation
document.getElementById('startTimer').addEventListener('click', () => {
  window.location.href = 'timer.html';
});

document.getElementById('viewTodo').addEventListener('click', () => {
  window.location.href = 'todo.html';
});

// Day/Night toggle
const toggle = document.getElementById('themeToggle');
const modeLabel = document.getElementById('modeLabel');

toggle.addEventListener('change', () => {
  document.body.classList.toggle('night');
  modeLabel.textContent = toggle.checked ? 'Night Mode' : 'Day Mode';
});
