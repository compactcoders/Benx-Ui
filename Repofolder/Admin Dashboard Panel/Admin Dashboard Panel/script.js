const body = document.querySelector("body"),
    modeToggle = body.querySelector(".mode-toggle");
sidebar = body.querySelector("nav");
sidebarToggle = body.querySelector(".sidebar-toggle");

let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark") {
    body.classList.toggle("dark");
}

let getStatus = localStorage.getItem("status");
if (getStatus && getStatus === "close") {
    sidebar.classList.toggle("close");
}

modeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");
    if (body.classList.contains("dark")) {
        localStorage.setItem("mode", "dark");
    } else {
        localStorage.setItem("mode", "light");
    }
});

sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    if (sidebar.classList.contains("close")) {
        localStorage.setItem("status", "close");
    } else {
        localStorage.setItem("status", "open");
    }
})

document.addEventListener('DOMContentLoaded', function() {
    const viewPasswordBtn = document.querySelector('.view-password-btn');
    const passwordText = document.querySelector('.password-text');

    viewPasswordBtn.addEventListener('click', function() {
        if (passwordText.type === 'password') {
            passwordText.type = 'text';
        } else {
            passwordText.type = 'password';
        }
    });
});

function togglePasswordVisibility() {
    var passwordInput = document.querySelector('.password-input');
    passwordInput.type = (passwordInput.type === 'password') ? 'text' : 'password';
  }

  function updateButtonNames() {
    var viewButton = document.querySelector('.view-button');
    var changeButton = document.querySelector('.change-button');
    if (window.innerWidth < 768) { // Adjust the width breakpoint as needed
      viewButton.innerText = 'View';
      changeButton.innerText = 'Change';
    } else {
      viewButton.innerText = 'View Password';
      changeButton.innerText = 'Change Password';
    }
  }

  // Call the function on page load and resize
  window.onload = updateButtonNames;
  window.onresize = updateButtonNames;