  const toggleBtn = document.getElementById('theme-toggle');
  const toggleIcon = document.getElementById('toggle-icon');
  const body = document.body;

  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('night');
    if (body.classList.contains('night')) {
      body.style.backgroundImage = "url('assets/homen.png')";
      toggleIcon.src = "assets/nightswitch.png"; // moon icon
    } else {
      body.style.backgroundImage = "url('assets/homed.png')";
      toggleIcon.src = "assets/dayswitch.png"; // sun icon
    }
  });
