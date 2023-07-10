var express = require('express');
var router = express.Router();
var pool = require('./db');


router.get('/:tid', (req, res) => {
  pool.query('SELECT * FROM teacher natural join course natural join subject where tid=?', [req.params.tid], (error, results1) => {
    if (error) throw error;
    pool.query('select * from attendance natural join course natural join subject where tid=? ORDER BY att_id DESC', [req.params.tid], (error, results2) => {
      if (error) throw error;

      res.render('teacherpage', { rows: results1[0], attData: results2, message: null, message2: null });
    });
  });
});

// TEACHER PROFILE

router.post('/teacherprofile', (req, res) => {
  pool.query('select * from teacher where tid=?', [req.body.idOfTeacher], (error, results2) => {
    res.render('teacherprofile', { teachers: results2, message: null, message2: null });
  });
});

// UPDATE TEACHER PROFILE

router.post('/updateteacherprofile', function (req, res) {
  pool.query('select * from teacher where tid=?', [req.body.tidauth], (error, results2) => {
    if (req.body.tpass == req.body.tpassauth) {
      pool.query("update teacher set tname = ?, gender = ?, tdob = ?, tphone = ?, temail = ? where temail = ? and tpass = ?", [req.body.teachername, req.body.teachergender, req.body.tdob, req.body.tphone, req.body.temail, req.body.temailauth, req.body.tpass], function (error, result) {
        if (error) throw error;

        pool.query('select * from teacher where tid=?', [req.body.tidauth], (error, results2) => {
          res.render('teacherprofile', { teachers: results2, message: null, message2: 'Saved Successfully' });
        });
      });
    }
    else {
      pool.query('select * from teacher where tid=?', [req.body.tidauth], (error, results2) => {
        res.render('teacherprofile', { teachers: results2, message: 'Password Incorrect', message2: null });
      });
    }
  });
});


// to start attendance

router.post('/addattendance', function (req, res) {
  pool.query(`select * from attendance where att_date=? and status=? and tid=? ORDER BY att_id DESC`, [req.body.att_date, req.body.attStatus, req.body.teacherID], function (error, result) {

    if (result.length > 0) {
      pool.query(`select * from teacher natural join course natural join subject where tid=?`, [req.body.teacherID], function (error, results) {
        if (error) throw error;

        pool.query('select * from attendance where tid=? ORDER BY att_id DESC', [req.body.teacherID], (error, results2) => {
          if (error) throw error;

          // console.log(results2);
          res.render('teacherpage', { rows: results[0], attData: results2, message: "Attendance has already started", message2: null });
        });
      });
    }

    else {
      pool.query(`insert into attendance (cid, sub_id, tid, att_date, status) values (?,?,?,?,?)`, [req.body.courseID, req.body.subID, req.body.teacherID, req.body.att_date, req.body.attStatus], function (error, result) {
        if (error) throw error;

        pool.query(`select * from teacher natural join course natural join subject where tid=?`, [req.body.teacherID], function (error, results) {
          if (error) throw error;

          pool.query(`select * from attendance where cid=? and sub_id=? and att_date=? and status='active'`, [req.body.courseID, req.body.subID, req.body.att_date], function (error, result7) {
            if (error) throw error;

            pool.query(`select * from student where cid=?`, [req.body.courseID], function (error, result8) {
              if (error) throw error;

              // console.log(result8);

              result8.forEach((student) => {
                pool.query(`insert into att_data (att_id, enroll) values (?,?)`, [result7[0].att_id, student.enroll], function (error, result8) {
                  if (error) throw error;
                });
              });

              pool.query('select * from attendance where tid=? ORDER BY att_id DESC', [req.body.teacherID], (error, results2) => {
                res.render('teacherpage', { rows: results[0], attData: results2, message: null, message2: "Attendance started" });
              });
            });
          });
        });
      });
    }
  });
});

// to stop attendance

router.post('/stopattendance', (req, res) => {
  const attendaceID = req.body.updateBtn;
  const idTeacher = req.body.teachID0;

  pool.query(`update attendance set status='inactive' where att_id=?`, [attendaceID], (error, result) => {
    if (error) throw error;

    pool.query(`select * from att_data where att_id=?`, [attendaceID], (error, result3) => {
      if (error) throw error;

      result3.forEach((record) => {
        if (record.present === null) {
          pool.query('UPDATE att_data SET present = "Absent" where att_id=? and present is null', [attendaceID], (err) => {
            if (err) throw err;
          });
        }
      });

      pool.query(`select * from teacher natural join course natural join subject where tid=?`, [idTeacher], function (error, results) {
        if (error) throw error;

        pool.query('select * from attendance where tid=? ORDER BY att_id DESC', [idTeacher], (error, results2) => {

          res.render('teacherpage', { rows: results[0], attData: results2, message: null, message2: "Attendance stopped" });
        });
      });
    });
  });
});


// To see student details

router.post('/studentdetails', (req, res) => {
  pool.query('SELECT * from teacher where tid=?', [req.body.idOfTeacher], (error, results1) => {
    if (error) throw error;

    pool.query('SELECT * from student natural join course where cid=?', [results1[0].cid], (error, results2) => {

      // console.log(results2);
      res.render('studentdetails', { idid: req.body.idOfTeacher, stuData: results2, message: null, message2: null });
    });
  });
});

// To issuenotice

router.post('/issuenotice', (req, res) => {
  pool.query('SELECT * FROM notice where issuerID=? ORDER BY noticeID DESC', [req.body.idOfTeacher], (error, results2) => {
    if (error) throw error;

    res.render('teachernotice', { idid: req.body.idOfTeacher, noticeData: results2, message2: null });
  });
});

// To add issuenotice

router.post('/addteachernotice', (req, res) => {
  pool.query('insert into notice (notice, noticedate, issuerID, forwhom) values (?,?,?,?)', [req.body.noticetext, req.body.noticeDate, req.body.teacherID, req.body.forWhom], (error, results1) => {
    if (error) throw error;

    pool.query('select * from notice where issuerID=? ORDER BY noticeID DESC', [req.body.teacherID], (error, results2) => {
      if (error) throw error;

      res.render('teachernotice', { idid: req.body.teacherID, noticeData: results2, message2: "Notice Issued" });
    });
  });
});

// To delete issuenotice

router.post('/deleteteachernotice', (req, res) => {
  pool.query('delete from notice where noticeID=?', [req.body.noticeID], (error, results1) => {
    if (error) throw error;
    pool.query('SELECT * FROM notice where issuerID=? ORDER BY noticeID DESC', [req.body.teachID], (error, results2) => {
      if (error) throw error;

      res.render('teachernotice', { idid: req.body.teachID, noticeData: results2, message2: "Notice Deleted" });
    });
  });
});


// TO SEE ADMIN NOTICES

router.post('/adminnotices', (req, res) => {
  pool.query('SELECT * from teacher where tid=?', [req.body.idOfTeacher], (error, results1) => {
    if (error) throw error;

    pool.query('SELECT * from notice where forwhom="Teachers" OR forwhom="All" ORDER BY noticeID DESC', (error, results2) => {

      res.render('adminnotice', { idid: req.body.idOfTeacher, noticeDetails: results2, message: null, message2: null });
    });
  });
});

// Attendance Report

router.get('/attreport/:attID', (req, res) => {
  const attID = req.params.attID;

  pool.query('SELECT * from attendance natural join att_data natural join student natural join subject where att_id=?', [attID], (error, results1) => {
    if (error) throw error;

    pool.query('SELECT * from student natural join att_data where att_id=? ORDER BY enroll', [attID], (error, results2) => {
      if (error) throw error;

      pool.query('SELECT COUNT(*) as count from att_data where att_id=? and present="Present";', [attID], (error, results3) => {
        if (error) throw error;

        pool.query('SELECT COUNT(*) as count from att_data where att_id=? and present="Absent";', [attID], (error, results4) => {
          if (error) throw error;

          res.render('AttendanceReport', { att: results1, completeStudent: results2, message: null, message2: null, presentCount: results3, absentCount: results4 });
        });
      });
    });
  });
});


router.post('/attreport/changestatus', (req, res) => {
  const presentStatus = req.body.pStatus;
  console.log(presentStatus);

  if (presentStatus === "Present") {
    pool.query('update att_data set present="Absent" where att_id=? and enroll=?', [req.body.idAtten, req.body.idStu], (error, results1) => {
      if (error) throw error;

      res.redirect('/teacher/attreport/' + req.body.idAtten);
    });
  }

  else if (presentStatus === "Absent") {
    pool.query('update att_data set present="Present" where att_id=? and enroll=?', [req.body.idAtten, req.body.idStu], (error, results1) => {
      if (error) throw error;

      res.redirect('/teacher/attreport/' + req.body.idAtten);
    });
  }
});

// Attendance Report Date wise

router.post('/attendancedatewise', (req, res) => {
  const fromDate = req.body.fromDate;
  const toDate = req.body.toDate;

  pool.query('SELECT * FROM teacher natural join course natural join subject where tid=?', [req.body.teacherUID], (error, result1) => {
    if (error) throw error;

    pool.query('SELECT * FROM attendance natural join att_data natural join subject natural join student WHERE att_date BETWEEN ? AND ? AND tid=?', [fromDate, toDate, req.body.teacherUID], (error, result2) => {
      if (error) throw error;

      pool.query('SELECT COUNT(*) as count FROM attendance natural join att_data natural join subject natural join student WHERE att_date BETWEEN ? AND ? AND tid=? and present="Present"', [fromDate, toDate, req.body.teacherUID], (error, result3) => {
        if (error) throw error;

        res.render('AttendanceDetails', { teacher: result1, DATA: result2, fromDate, toDate, presentCount: result3 });
      });
    });
  });
});



module.exports = router;