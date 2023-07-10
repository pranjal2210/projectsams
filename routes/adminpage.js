var express = require('express');
var router = express.Router();
var pool = require('./db');

// SHOWING TEACHER & STUDENT COUNT

router.get('/dashboard', (req, res) => {
  pool.query('SELECT COUNT(*) as count from teacher', (error, results7) => {
    if (error) throw error;
    pool.query('SELECT COUNT(*) as count from student', (error, results8) => {
      if (error) throw error;

      data7 = results7[0].count;
      data8 = results8[0].count;
      res.render('adminpage', { data7: data7, data8: data8 });
    });
  });
});

// SHOWING TEACHER LIST

router.get('/teachers', (req, res) => {
  pool.query('SELECT * FROM teacher natural join course natural join subject', (error, results) => {
    if (error) throw error;
    dataTeacher = results;
    res.render('manageteachers', { teacherData: dataTeacher });
  });
});

// ADDING TEACHER

router.get('/addteacher', (req, res) => {
  res.render('addteacher', { message: null });
});

router.post('/teacherinsert', function (req, res) {
  pool.query("select * from teacher where tid=?", [req.body.teacherid], function (error, result) {
    if (result.length > 0) {
      res.render('addteacher', { message: "Teacher ID is in use" });
    }
    else {
      if (error) throw error;
      pool.query("insert into teacher (tid, tname, gender, tdob, cid, sub_id, designation, highqual, tphone) values (?,?,?,?,?,?,?,?,?)", [req.body.teacherid, req.body.teachername, req.body.teachergender, req.body.tdob, req.body.teacherdept, req.body.subject, req.body.teacherdesg, req.body.teacherhq, req.body.tphone], function (error, result) {
        if (error) throw error;
        res.redirect('/adminpage/teachers');
      });
    }
  });
});

// UPDATING TEACHER

router.get('/updateteacher/:id', (req, res) => {
  pool.query('SELECT * FROM teacher where tid=?', [req.params.id], (error, results) => {
    if (error) throw error;

    res.render('updateteacher', { teachers: results });
  });
});

router.post('/updateteacher/:id', function (req, res) {
  pool.query("update teacher set tname = ?, gender = ?, tdob = ?, cid = ?, sub_id=?, designation = ?, highqual = ?, tphone = ? where tid = ?", [req.body.teachername, req.body.teachergender, req.body.tdob, req.body.teacherdept, req.body.subject, req.body.teacherdesg, req.body.teacherhq, req.body.tphone, req.params.id], function (error, result) {
    if (error) throw error;

    res.redirect('/adminpage/teachers');
  });
});

// DELETING TEACHER

router.get('/deleteteacher/:id', (req, res) => {
  pool.query('delete from teacher where tid=?', [req.params.id], (error, results2) => {
    if (error) throw error;
    pool.query('SELECT * FROM teacher', (error, results) => {
      if (error) throw error;

      dataTeacher = results[0];
      res.redirect('/adminpage/teachers');
    });
  });
});

// SHOWING STUDENT LIST

router.get('/students', (req, res) => {
  pool.query('SELECT * FROM student natural join course', (error, results) => {
    if (error) throw error;
    dataStudent = results;
    res.render('managestudents', { studentData: dataStudent });
  });
});

// ADDING STUDENT

router.get('/addstudent', (req, res) => {
  res.render('addstudent', { message: null });
});

router.post('/studentinsert', function (req, res) {

  pool.query("select * from student where enroll=?", [req.body.enroll], function (error, result) {
    if (result.length > 0) {
      res.render('addstudent', { message: "Enrollment already alloted" });
    }

    else {
      pool.query("insert into student (enroll, sname, gender, cid, sdob, sphone) values (?,?,?,?,?,?)", [req.body.enroll, req.body.studentname, req.body.studentgender, req.body.studentcourse, req.body.sdob, req.body.sphone], function (error, result) {
        if (error) throw error;
        res.redirect('/adminpage/students');
      });
    }
  });
});

// UPDATING STUDENT

router.get('/updatestudent/:enroll', (req, res) => {
  pool.query('SELECT * FROM student natural join course where enroll=?', [req.params.enroll], (error, results) => {
    if (error) throw error;

    res.render('updatestudent', { students: results });
  });
});


router.post('/updatestudent/:enroll', function (req, res) {
  pool.query("update student set sname = ?, gender = ?, cid = ?, sdob = ?, sphone = ? where enroll = ?", [req.body.studentname, req.body.studentgender, req.body.studentcourse, req.body.sdob, req.body.sphone, req.params.enroll], function (error, result) {
    if (error) throw error;

    res.redirect('/adminpage/students');
  });
});

// DELETING STUDENT

router.get('/deletestudent/:enroll', (req, res) => {
  pool.query('delete from student where enroll=?', [req.params.enroll], (error, results2) => {
    if (error) throw error;
    pool.query('SELECT * FROM student', (error, results) => {
      if (error) throw error;

      dataTeacher = results[0];
      res.redirect('/adminpage/students');
    });
  });
});

// NOTICE

router.get('/issuenotice', (req, res) => {
  pool.query('select * from adminlogin', (error, results1) => {
    if (error) throw error;

    pool.query('SELECT * FROM notice where issuerID=? ORDER BY noticeID DESC', [results1[0].admin_id], (error, results2) => {
      if (error) throw error;

      res.render('noticepage', { noticeData: results2 });
    });
  });
});

// ADD NOTICE

router.post('/toallnotice', (req, res) => {
  pool.query('select * from adminlogin', (error, results1) => {
    if (error) throw error;

    pool.query('insert into notice (notice, issuerID, noticedate, forwhom) values (?,?,?,?)', [req.body.noticetext, results1[0].admin_id, req.body.noticeDate, req.body.forWhom], (error, results2) => {
      if (error) throw error;

      res.redirect('/adminpage/issuenotice');
    });
  });
});

router.post('/toteachernotice', (req, res) => {
  pool.query('select * from adminlogin', (error, results1) => {
    if (error) throw error;

    pool.query('insert into notice (notice, issuerID, noticedate, forwhom) values (?,?,?,?)', [req.body.noticetext, results1[0].admin_id, req.body.noticeDate, req.body.forWhom], (error, results2) => {
      if (error) throw error;

      res.redirect('/adminpage/issuenotice');
    });
  });
});

router.post('/tostudentnotice', (req, res) => {
  pool.query('select * from adminlogin', (error, results1) => {
    if (error) throw error;

    pool.query('insert into notice (notice, issuerID, noticedate, forwhom) values (?,?,?,?)', [req.body.noticetext, results1[0].admin_id, req.body.noticeDate, req.body.forWhom], (error, results2) => {
      if (error) throw error;

      res.redirect('/adminpage/issuenotice');
    });
  });
});

router.get('/deletenotice/:noticeID', (req, res) => {
  pool.query('delete from notice where noticeID=?', [req.params.noticeID], (error, results2) => {
    if (error) throw error;
    res.redirect('/adminpage/issuenotice');
  });
});


// ATTENDANCE DETAILS

router.get('/attendanceinfo', (req, res) => {
  pool.query('select * from teacher', (error, results1) => {
    if (error) throw error;

    res.render('attendanceinfo', { teacher: results1, attData: 1, presentCount: false });
  });
});

router.post('/infoattendance', (req, res) => {
  pool.query('select * from teacher', (error, results1) => {
    if (error) throw error;

    pool.query('select * from att_data natural join attendance natural join teacher natural join course natural join subject where tid=? and att_date between ? and ?', [req.body.teacherID, req.body.fromDate, req.body.toDate], (error, results2) => {
      if (error) throw error;

      pool.query('SELECT COUNT(*) as count from att_data natural join attendance natural join teacher natural join course natural join subject where tid=? and att_date between ? and ? and present="Present"', [req.body.teacherID, req.body.fromDate, req.body.toDate], (error, result3) => {
        if (error) throw error;

        res.render('attendanceinfo', { teacher: results1, attData: results2, fromDate: req.body.fromDate, toDate: req.body.toDate, presentCount: result3 });
      });
    });
  });
});



module.exports = router;