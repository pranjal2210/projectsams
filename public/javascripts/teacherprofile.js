
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

  var letters = /^[A-Za-z. ]*$/;
  var phone = /^[0-9]*$/;


  var tname = document.forms['teacherprofile']["teachername"].value;
  if (!tname.match(letters)) {
    seterror("nameofteacher", "*Name must contain only letters and period(.)");
    returnval = false;
  }

  var tphone = document.forms['teacherprofile']["tphone"].value;
  if (tphone.length != 10) {
    seterror("teacherphone", "*Mobile number must be of 10 digits");
    returnval = false;
  }

  else if (!tphone.match(phone)) {
    seterror("teacherphone", "*Mobile number must contain only digits");
    returnval = false;
  }

  var teacherPass = document.forms['teacherprofile']["tpass"].value;
  var confirmPass = document.forms['teacherprofile']["cpass"].value;

  if (!teacherPass.match(confirmPass) || !confirmPass.match(teacherPass)) {
    seterror("confirmpass", "*Password does not match");
    returnval = false;
  }

  return returnval;
}