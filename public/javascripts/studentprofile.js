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


function validateProfile() {
  var returnval = true;
  clearerrors();

  var letters = /^[A-Za-z ]*$/;
  var phone = /^[0-9]*$/;

  var sname = document.forms['studentprofile']["studentname"].value;
  if (!sname.match(letters)) {
    seterror("nameofstudent", "*Name must contain only letters");
    returnval = false;
  }
  
  var sphone = document.forms['studentprofile']["sphone"].value;
  if (sphone.length != 10) {
    seterror("studentphone", "*Mobile number must be of 10 digits");
    returnval = false;
  }
  
  else if (!sphone.match(phone)) {
    seterror("studentphone", "*Mobile number must contain only digits");
    returnval = false;
  }

  var studentPass = document.forms['studentprofile']["spass"].value;
  var confirmPass = document.forms['studentprofile']["cpass"].value;
  if (!studentPass.match(confirmPass) || !confirmPass.match(studentPass)) {
    seterror("confirmpass", "*Password does not match");
    returnval = false;
  }

  return returnval;
}