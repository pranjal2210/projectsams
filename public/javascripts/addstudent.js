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

  var enrollregex = /^[A-Z0-9]*$/;
  var letters = /^[A-Za-z ]*$/;
  var phone = /^[0-9]*$/;

  var senroll = document.forms['studentaddform']["enroll"].value;
  if (senroll.length != 12) {
    seterror("stuenroll", "*ID must be of length 12");
    returnval = false;
  }

  else if (!senroll.match(enrollregex)) {
    seterror("stuenroll", "*ID must contain only capital letters and numbers");
    returnval = false;
  }

  var sname = document.forms['studentaddform']["studentname"].value;
  if (!sname.match(letters)) {
    seterror("stuname", "*Name must contain only letters");
    returnval = false;
  }
  
  var sphone = document.forms['studentaddform']["sphone"].value;
  if (sphone.length != 10) {
    seterror("studentphone", "*Mobile number must be of 10 digits");
    returnval = false;
  }
  
  else if (!sphone.match(phone)) {
    seterror("studentphone", "*Mobile number must contain only digits");
    returnval = false;
  }

  return returnval;
}