var express = require('express');
var router = express.Router();
var pool = require('./db');


router.get('/home', function(req, res, next) {
  res.render("LandingPage", {message: null, message2: null});
});

router.get('/adminlogin', function(req, res, next) {
  res.render("adminlogin", {message: null});
});

router.post('/adminauth', function (req, res) {
  const adminUsername = req.body.admin_email;
  const adminPassword = req.body.admin_pass;

  pool.query(`SELECT * FROM adminlogin where admin_email='${adminUsername}' and admin_password='${adminPassword}'`, function (error, rows, fields) {
    if (rows.length > 0) {
      res.redirect('/adminpage/dashboard');
    }
    else {
      res.render('adminlogin', {message: "INVALID CREDENTIALS"});
    }
  });
});

// STUDENT REGISTRATION

router.get('/studentregister', (req, res) => {
  res.render('studentregister', { message: null });
});

router.post('/studentreg', function (req, res) {
  pool.query("SELECT * FROM student WHERE semail = ?", [req.body.semail], function (error, result) {
    if (result.length > 0) {
      res.render('landingpage', { message: 'Student already registered', message2: null });
    }

    else {
      pool.query("update student set semail = ?, spass = ? where enroll=? and sdob=?", [req.body.semail, req.body.spass, req.body.enroll, req.body.sdob], function (error, result) {
        if (error) throw error;

        res.render('landingpage', {message2: "Successfully Registered", message: null});
      });
    }
  });
});

// STUDENT LOGIN

router.post('/studentlogin', function (req, res) {
  const stuUsername = req.body.student_email;
  const stuPassword = req.body.student_pass;

  pool.query(`SELECT * FROM student where semail='${stuUsername}' and spass='${stuPassword}'`, function (error, result) {
    if (result.length > 0) {
      // res.render('studentpage', { row: result });
      res.redirect('/student/'+result[0].enroll)
    } 
    else {
      res.render('landingpage', { message: "Invalid Credentials", message2: null });
    }
  });
});

// TEACHER REGISTRATION

router.get('/teacherregister', (req, res) => {
  res.render('teacherregister', { message: null });
});

router.post('/teacherreg', function (req, res) {
  pool.query("SELECT * FROM teacher WHERE temail = ?", [req.body.temail], function (error, result) {
    if (result.length > 0) {
      res.render('landingpage', { message: 'Teacher already registered', message2: null });
    }

    else {
      pool.query("update teacher set temail = ?, tpass = ? where tid=? and tdob = ?", [req.body.temail, req.body.tpass, req.body.teacherid, req.body.tdob], function (error, result) {
        if (error) throw error;

        res.render('landingpage', {message2: "Successfully Registered", message: null});
      });
    }
  });
});

// TEACHER LOGIN

router.post('/teacherlogin', function (req, res) {
  const teaUsername = req.body.teacher_email;
  const teaPassword = req.body.teacher_pass;

  pool.query(`SELECT * FROM teacher natural join course where temail='${teaUsername}' and tpass='${teaPassword}'`, function (error, result) {
    if (result.length > 0) {
      // res.render('teacherpage', { row: result[0] });
      res.redirect('/teacher/'+result[0].tid)
    } 
    else {
      res.render('landingpage', { message: "Invalid Credentials", message2: null });
    }
  });
});





module.exports = router;