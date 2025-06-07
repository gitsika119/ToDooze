function applyTheme() {
  const body = document.body;
  const theme = localStorage.getItem('theme');

  if (theme === 'night') {
    body.classList.add('night');
    body.style.backgroundImage = "url('assets/timern.png')";
  } else {
    body.classList.remove('night');
    body.style.backgroundImage = "url('assets/timerd.png')";
  }

  body.style.backgroundSize = "100% 100%";
  body.style.backgroundRepeat = "no-repeat";
  body.style.backgroundPosition = "center";
  body.style.backgroundAttachment = "fixed";
  body.style.height = "100vh";
  body.style.width = "100vw";
  body.style.overflowY = "auto";
}
document.addEventListener("DOMContentLoaded", () => {
  applyTheme();
});



let timers = {
  work: {
    duration: 25 * 60,
    remaining: 25 * 60,
    interval: null,
    displayId: "work-timer"
  },
  break: {
    duration: 5 * 60,
    remaining: 5 * 60,
    interval: null,
    displayId: "break-timer"
  },
  custom: {
    duration: 0,
    remaining: 0,
    interval: null,
    displayId: "custom-timer"
  }
};

function formatTime(seconds) {
  if (seconds >= 3600) {
    let h = Math.floor(seconds / 3600);
    let m = Math.floor((seconds % 3600) / 60);
    let s = seconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  } else {
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
}

function updateDisplay(name) {
  const timer = timers[name];
  const display = document.getElementById(timer.displayId);
  display.textContent = formatTime(timer.remaining);
}

function startTimer(name) {
  const timer = timers[name];
  if (timer.interval) return; 

  timer.interval = setInterval(() => {
    if (timer.remaining > 0) {
      timer.remaining--;
      updateDisplay(name);
    } else {
      clearInterval(timer.interval);
      timer.interval = null;

      const alarm = document.getElementById("alarm-sound");
      if (alarm) {
        alarm.currentTime = 0; 
        alarm.loop = true;
        alarm.play().catch(e => console.error("Audio playback failed:", e));
      }

      showCustomAlert(`${name.charAt(0).toUpperCase() + name.slice(1)} timer done!`);
    }
  }, 1000);
}


function pauseTimer(name) {
  const timer = timers[name];
  clearInterval(timer.interval);
  timer.interval = null;
}

function resetTimer(name) {
  const timer = timers[name];
  clearInterval(timer.interval);
  timer.interval = null;
  timer.remaining = timer.duration;
  updateDisplay(name);
}

function setCustomTimer() {
  let hr = parseInt(document.getElementById("custom-hours").value) || 0;
  let min = parseInt(document.getElementById("custom-minutes").value) || 0;
  let sec = parseInt(document.getElementById("custom-seconds").value) || 0;

  min = Math.max(0, Math.min(59, min));
  sec = Math.max(0, Math.min(59, sec));

  document.getElementById("custom-minutes").value = min;
  document.getElementById("custom-seconds").value = sec;

  const total = hr * 3600 + min * 60 + sec;

  timers.custom.duration = total;
  timers.custom.remaining = total;
  updateDisplay("custom");
}
function stopAlarm() {
  const alarm = document.getElementById("alarm-sound");
  if (alarm) {
    alarm.pause();
    alarm.currentTime = 0;
  }
}
function showCustomAlert(message) {
  const alertBox = document.getElementById("custom-alert");
  const alertMsg = document.getElementById("alert-message");
  alertMsg.textContent = message;
  alertBox.classList.remove("hidden");
}

function closeCustomAlert() {
  const alertBox = document.getElementById("custom-alert");
  alertBox.classList.add("hidden");
  stopAlarm(); 
}

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