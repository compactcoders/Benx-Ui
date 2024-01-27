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


let tabs = document.querySelectorAll(".tabs h3");
let tabContents = document.querySelectorAll(".tab-content div");

// Add 'active' class to the first tab and its content
tabs[0].classList.add("active");
tabContents[0].classList.add("active");

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    tabContents.forEach((content) => {
      content.classList.remove("active");
    });
    tabs.forEach((tab) => {
      tab.classList.remove("active");
    });
    tabContents[index].classList.add("active");
    tabs[index].classList.add("active");
  });
});

//selecting all required elements
const dropArea = document.querySelector(".drag-area"),
dragText = dropArea.querySelector("header"),
button = dropArea.querySelector("button"),
input = dropArea.querySelector("input");
let file; //this is a global variable and we'll use it inside multiple functions

button.onclick = ()=>{
  input.click(); //if user click on the button then the input also clicked
}

input.addEventListener("change", function(){
  //getting user select file and [0] this means if user select multiple files then we'll select only the first one
  file = this.files[0];
  dropArea.classList.add("active");
  showFile(); //calling function
});


//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event)=>{
  event.preventDefault(); //preventing from default behaviour
  dropArea.classList.add("active");
  dragText.textContent = "Release to Upload File";
});

//If user leave dragged File from DropArea
dropArea.addEventListener("dragleave", ()=>{
  dropArea.classList.remove("active");
  dragText.textContent = "Drag & Drop to Upload File";
});

//If user drop File on DropArea
dropArea.addEventListener("drop", (event) => {
  event.preventDefault(); //preventing from default behaviour
  // getting user select file and [0] this means if user select multiple files then we'll select only the first one
  const droppedFile = event.dataTransfer.files[0];
  handleFile(droppedFile); // call the handleFile function with the dropped file
});



function browseFile() {
  document.getElementById('fileInput').click();
}

function handleFile() {
  const fileInput = document.getElementById('fileInput');
  const file = fileInput.files[0];

  if (file) {
      // Check if the file is a CSV file
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
          // You can perform additional checks or processing if needed
          // For now, let's assume you want to upload the file to the server
          uploadFile(file);
      } else {
          alert('Please upload a valid CSV file.');
      }
  }
}

function uploadFile(file) {
  const formData = new FormData();
  formData.append('csvFile', file);

  // Make an AJAX request to your server-side script (upload.php in this case)
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'upload.php', true);

  xhr.onload = function () {
      if (xhr.status === 200) {
          // File uploaded successfully
          console.log('File uploaded:', file.name);
      } else {
          // Handle the error
          console.error('Error uploading file:', xhr.statusText);
      }
  };

  // Send the formData to the server
  xhr.send(formData);
}

