const allNoticeBtn = document.getElementById('all-notice-btn');
const studentNoticeBtn = document.getElementById('student-notice-btn');
const teacherNoticeBtn = document.getElementById('teacher-notice-btn');
const allNoticeForm = document.getElementById('all-notice-form');
const studentNoticeForm = document.getElementById('student-notice-form');
const teacherNoticeForm = document.getElementById('teacher-notice-form');

allNoticeBtn.addEventListener('click', () => {
  studentNoticeBtn.classList.remove('active');
  teacherNoticeBtn.classList.remove('active');
  allNoticeBtn.classList.add('active');
  allNoticeForm.style.display = 'block';
  teacherNoticeForm.style.display = 'none';
  studentNoticeForm.style.display = 'none';
});

teacherNoticeBtn.addEventListener('click', () => {
  studentNoticeBtn.classList.remove('active');
  teacherNoticeBtn.classList.add('active');
  allNoticeBtn.classList.remove('active');
  allNoticeForm.style.display = 'none';
  teacherNoticeForm.style.display = 'block';
  studentNoticeForm.style.display = 'none';
});

studentNoticeBtn.addEventListener('click', () => {
  studentNoticeBtn.classList.add('active');
  teacherNoticeBtn.classList.remove('active');
  allNoticeBtn.classList.remove('active');
  allNoticeForm.style.display = 'none';
  teacherNoticeForm.style.display = 'none';
  studentNoticeForm.style.display = 'block';
});

function allTextCount() {
  const textarea = document.getElementById('allText');
  const characterCount = document.getElementById('allTextCount');

  const currentLength = textarea.value.length;
  const maxLength = parseInt(textarea.getAttribute('maxlength'));

  characterCount.textContent = currentLength;

  if (currentLength >= maxLength) {
    textarea.value = textarea.value.substring(0, maxLength);
    characterCount.style.color = 'red';
  }
  else if (currentLength >= maxLength / 1.25) {
    textarea.value = textarea.value.substring(0, maxLength);
    characterCount.style.color = 'orange';
  } else {
    characterCount.style.color = 'black';
  }
}

function teacherTextCount() {
  const textarea = document.getElementById('teacherText');
  const characterCount = document.getElementById('teacherTextCount');

  const currentLength = textarea.value.length;
  const maxLength = parseInt(textarea.getAttribute('maxlength'));

  characterCount.textContent = currentLength;

  if (currentLength >= maxLength) {
    textarea.value = textarea.value.substring(0, maxLength);
    characterCount.style.color = 'red';
  }
  else if (currentLength >= maxLength / 1.25) {
    textarea.value = textarea.value.substring(0, maxLength);
    characterCount.style.color = 'orange';
  } else {
    characterCount.style.color = 'black';
  }
}

function studentTextCount() {
  const textarea = document.getElementById('studentText');
  const characterCount = document.getElementById('studentTextCount');

  const currentLength = textarea.value.length;
  const maxLength = parseInt(textarea.getAttribute('maxlength'));

  characterCount.textContent = currentLength;

  if (currentLength >= maxLength) {
    textarea.value = textarea.value.substring(0, maxLength);
    characterCount.style.color = 'red';
  }
  else if (currentLength >= maxLength / 1.25) {
    textarea.value = textarea.value.substring(0, maxLength);
    characterCount.style.color = 'orange';
  } else {
    characterCount.style.color = 'black';
  }
}


document.addEventListener('DOMContentLoaded', function () {
  const dateInput = document.getElementById('allDate');
  const today = new Date().toISOString().split('T')[0]; // Get the current date in ISO format

  dateInput.value = today; // Set the input value to the current date
});

document.addEventListener('DOMContentLoaded', function () {
  const dateInput = document.getElementById('teacherDate');
  const today = new Date().toISOString().split('T')[0]; // Get the current date in ISO format

  dateInput.value = today; // Set the input value to the current date
});

document.addEventListener('DOMContentLoaded', function () {
  const dateInput = document.getElementById('studentDate');
  const today = new Date().toISOString().split('T')[0]; // Get the current date in ISO format

  dateInput.value = today; // Set the input value to the current date
});