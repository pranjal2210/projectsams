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


function validateRegForm() {
  var returnval = true;
  clearerrors();

  var enrollregex = /^[A-Z0-9]*$/;
  // var letters = /^[A-Za-z ]*$/;
  // var phone = /^[0-9]*$/;

  var senroll = document.forms['studentregform']["enroll"].value;
  if (senroll.length != 12) {
    seterror("stuenroll", "*ID must be of length 12");
    returnval = false;
  }

  else if (!senroll.match(enrollregex)) {
    seterror("stuenroll", "*ID must contain only capital letters and numbers");
    returnval = false;
  }

  var studentPass = document.forms['studentregform']["spass"].value;
  var confirmPass = document.forms['studentregform']["cpass"].value;
  if (!studentPass.match(confirmPass) || !confirmPass.match(studentPass)) {
    seterror("confirmpass", "*Password does not match");
    returnval = false;
  }

  return returnval;
}