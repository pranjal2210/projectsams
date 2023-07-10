var express = require('express');
var router = express.Router();
var pool = require('./db');

router.get('/:enroll', (req, res) => {
  pool.query('SELECT * FROM student natural join course where enroll=?', [req.params.enroll], (error, results1) => {
    if (error) throw error;

    const courID = results1[0].cid;

    pool.query(`SELECT * FROM attendance natural join course natural join subject natural join teacher where cid=? and status='active'`, [courID], (error, results3) => {
      if (error) throw error;

      pool.query(`SELECT n.*, t.tname FROM notice n LEFT JOIN adminlogin a ON n.issuerID = a.admin_id LEFT JOIN teacher t ON n.issuerID = t.tid where t.cid=? or forwhom="All" ORDER BY n.noticeID DESC`, [courID], (error, results4) => {
        if (error) throw error;
        pool.query(`SELECT * from teacher natural join course natural join subject where cid=?`, [courID], (error, results5) => {
          if (error) throw error;

          res.render('studentpage', { rows: results1, enroll: req.params.enroll, attData: results3, message: null, message2: null, noticeDetails: results4, teacherDetails: results5 });
        });
      });
    });
  });
});


// STUDENT PROFILE

router.post('/studentprofile', (req, res) => {
  pool.query('select * from student where enroll=?', [req.body.enrollOfStudent], (error, results2) => {

    res.render('studentprofile', { students: results2, message: null, message2: null });
  });
});


// UPDATE STUDENT PROFILE

router.post('/updatestudentprofile', function (req, res) {
  pool.query('select * from student where enroll=?', [req.body.enrollauth], (error, results2) => {
    if (req.body.spass == req.body.spassauth) {
      pool.query("update student set sname = ?, gender = ?, sdob = ?, sphone = ?, semail = ? where semail = ? and spass = ?", [req.body.studentname, req.body.studentgender, req.body.sdob, req.body.sphone, req.body.semail, req.body.semailauth, req.body.spass], function (error, result) {
        if (error) throw error;

        pool.query('select * from student where enroll=?', [req.body.enrollauth], (error, results2) => {
          res.render('studentprofile', { students: results2, message: null, message2: 'Saved Successfully' });
        });
      });
    }
    else {
      pool.query('select * from student where enroll=?', [req.body.enrollauth], (error, results2) => {
        res.render('studentprofile', { students: results2, message: 'Password Incorrect', message2: null });
      });
    }
  });
});

// MARKING Attendance

router.post('/markattendance', (req, res) => {
  pool.query(`SELECT * FROM attendance natural join course natural join subject natural join teacher where att_id=? and status='active'`, [req.body.idOfAtten], (error, results2) => {
    if (error) throw error;

    pool.query(`SELECT * FROM att_data where att_id=? and enroll=?`, [req.body.idOfAtten, req.body.idOfStu], (error, results3) => {
      if (error) throw error;

      res.render('markattendance', { toDisable: results3, idid: results3[0].enroll, mark: results2, message: null, message2: null });

    });
  });
});


router.post('/marked', (req, res) => {
  pool.query(`update att_data set present=? where att_id=? and enroll=?`, [req.body.presentstatus, req.body.idOfAtten, req.body.idOfStudent], (error, results1) => {
    if (error) throw error;

    pool.query(`SELECT * FROM attendance natural join course natural join subject natural join teacher where att_id=? and status='active'`, [req.body.idOfAtten], (error, results2) => {
      if (error) throw error;

      pool.query(`SELECT * FROM att_data where att_id=? and enroll=?`, [req.body.idOfAtten, req.body.idOfStudent], (error, results3) => {
        if (error) throw error;

        res.render('markattendance', { toDisable: results3, idid: results3[0].enroll, mark: results2, message: null, message2: null });
      });
    });
  });
});


module.exports = router;