// const form = document.querySelector('form');
// const passwordField = document.getElementById('teacherpassword');
// const confirmPasswordField = document.getElementById('teacherconfirmPassword');

// form.addEventListener('submit', function (event) {
//   if (passwordField.value !== confirmPasswordField.value) {
//     event.preventDefault();
//     alert('Passwords do not match!');
//   }
// });


// const nameField = document.getElementById('teachername');
// const idField = document.getElementById('teacherid');

// const nameRegex = /^[A-Za-z.]+$/;

// nameField.addEventListener('input', function (event) {
//   if (!nameRegex.test(nameField.value)) {
//     nameField.setCustomValidity('Please enter a valid name with only letters and periods.');
//   } else {
//     nameField.setCustomValidity('');
//   }
// });

// idField.addEventListener('input', function (event) {
//   const nameRegex = /^[A-Za-z]+$/;
//   const isValid = nameRegex.test(nameField.value);

//   if (!isValid) {
//     idField.setCustomValidity('ID must contain only letters and numbers.');
//   } else {
//     idField.setCustomValidity('');
//   }
// });


function clearerrors() {
  errors = document.getElementsByClassName('formerror');
  for (let item of errors) {
    item.innerHTML = "";
  }
}

function seterror(id, error) {
  element = document.getElementById(id);
  element.getElementsByClassName('formerror')[0].innerHTML = error;
}


function validateForm() {
  var returnval = true;
  clearerrors();

  var idregex = /^[A-Z0-9]*$/;
  var letters = /^[A-Za-z. ]*$/;
  var phone = /^[0-9]*$/;

  var tid = document.forms['teacheraddform']["teacherid"].value;
  if (tid.length != 6) {
    seterror("idofteacher", "*ID must be of length 6");
    returnval = false;
  }

  else if (!tid.match(idregex)) {
    seterror("idofteacher", "*ID must contain only capital letters and numbers");
    returnval = false;
  }

  var tname = document.forms['teacheraddform']["teachername"].value;
  if (!tname.match(letters)) {
    seterror("nameofteacher", "*Name must contain only letters and period(.)");
    returnval = false;
  }
  
  var tphone = document.forms['teacheraddform']["tphone"].value;
  if (tphone.length != 10) {
    seterror("teacherphone", "*Mobile number must be of 10 digits");
    returnval = false;
  }
  
  else if (!tphone.match(phone)) {
    seterror("teacherphone", "*Mobile number must contain only digits");
    returnval = false;
  }

  var thq = document.forms['teacheraddform']["teacherhq"].value;
  if (!thq.match(letters)) {
    seterror("teacherhighqual", "*Must contain only letters");
    returnval = false;
  }

  return returnval;
}