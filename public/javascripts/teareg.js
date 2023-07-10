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

  var tid = document.forms['teacherregform']["teacherid"].value;
  if (tid.length != 6) {
    seterror("idofteacher", "*ID must be of length 6");
    returnval = false;
  }

  else if (!tid.match(idregex)) {
    seterror("idofteacher", "*ID must contain only capital letters and numbers");
    returnval = false;
  }

  var teacherPass = document.forms['teacherregform']["tpass"].value;
  var confirmPass = document.forms['teacherregform']["cpass"].value;
  if (!teacherPass.match(confirmPass) || !confirmPass.match(teacherPass)) {
    seterror("confirmpass", "*Password does not match");
    returnval = false;
  }

  return returnval;
}