// home.js
const toggleBtn = document.getElementById('theme-toggle');
const toggleIcon = document.getElementById('toggle-icon');
const body = document.body;

// Function to apply theme from storage
function applyTheme() {
  const theme = localStorage.getItem('theme');
  if (theme === 'night') {
    body.classList.add('night');
    body.style.backgroundImage = "url('assets/homen.png')";
    toggleIcon.src = "assets/nightswitch.png";
  } else {
    body.classList.remove('night');
    body.style.backgroundImage = "url('assets/homed.png')";
    toggleIcon.src = "assets/dayswitch.png";
  }
}

applyTheme(); // Apply on page load

// On toggle button click
toggleBtn.addEventListener('click', () => {
  const nightMode = body.classList.toggle('night');
  if (nightMode) {
    body.style.backgroundImage = "url('assets/homen.png')";
    toggleIcon.src = "assets/nightswitch.png";
    localStorage.setItem('theme', 'night');
  } else {
    body.style.backgroundImage = "url('assets/homed.png')";
    toggleIcon.src = "assets/dayswitch.png";
    localStorage.setItem('theme', 'day');
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const clickSound = document.getElementById("click-sound");
  document.querySelectorAll('[sound="click"]').forEach(button => {
    button.addEventListener("click", () => {
      playClickSound();
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