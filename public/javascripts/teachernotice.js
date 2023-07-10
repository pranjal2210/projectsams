
function teacherNoticeTextCount() {
  const textarea = document.getElementById('teacherNoticeText');
  const characterCount = document.getElementById('TextCount');

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
  const dateInput = document.getElementById('teacherNoticeDate');
  const today = new Date().toISOString().split('T')[0]; // Get the current date in ISO format

  dateInput.value = today; // Set the input value to the current date
});