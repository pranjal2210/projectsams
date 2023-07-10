const studentLoginBtn = document.getElementById('student-login-btn');
const teacherLoginBtn = document.getElementById('teacher-login-btn');
const studentLoginForm = document.getElementById('student-login-form');
const teacherLoginForm = document.getElementById('teacher-login-form');



studentLoginBtn.addEventListener('click', () => {
  teacherLoginBtn.classList.remove('active');
  studentLoginBtn.classList.add('active');
  studentLoginForm.style.display = 'block';
  teacherLoginForm.style.display = 'none';
});

teacherLoginBtn.addEventListener('click', () => {
  teacherLoginBtn.classList.add('active');
  studentLoginBtn.classList.remove('active');
  studentLoginForm.style.display = 'none';
  teacherLoginForm.style.display = 'block';
});

// FAQ
const accordionItem = document.querySelectorAll('.qna-item');

accordionItem.forEach((item) => {
  const accordionHeader = item.querySelector('.qna-header');

  accordionHeader.addEventListener('click', () => {
    const openItem = document.querySelector('.accordion-open');

    toggleItem(item);

    if (openItem && openItem !== item) {
      toggleItem(openItem);
    }
  });
});

const toggleItem = (item) => {
  const accordionContent = item.querySelector('.qna-content');

  if (item.classList.contains('accordion-open')) {
    accordionContent.removeAttribute('style');
    item.classList.remove('accordion-open');
  }
  else {
    accordionContent.style.height = accordionContent.scrollHeight + 'px';
    item.classList.add('accordion-open');
  }
};


function moveCursor() {
  const inputField = document.getElementById('student-email');
  inputField.focus();
}