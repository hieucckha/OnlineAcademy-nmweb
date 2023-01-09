import { Console } from 'console';
import express, { Router } from 'express';
import fs from 'fs';
import accountModel from '../models/user.model.js';
import courseModel from '../models/Course.model.js';

const router = express.Router();

router.get('/', (req, res) => {
  const Info = accountModel.getInfo();
  const path = '../public/img/avt/' + String(Info.Id);
  let ShortName = false;
  let avtPath = false;
  if (fs.existsSync(path)) {
    avtPath = String(Info.Id);
    res.render('teacher/home', {
      ID: avtPath,
    });
  } else {
    ShortName = Info.FirstName.substring(0, 1) + Info.LastName.substring(0, 1);
    res.render('teacher/home', {
      accountShortName: ShortName,
    });
  }
});

router.get('/edit', (req, res) => {
  const accountInfo = accountModel.getInfo();
  const ShortName =
    accountInfo.FirstName.substring(0, 1) +
    accountInfo.LastName.substring(0, 1);
  res.render('teacher/edit', {
    layout: 'main.hbs',
    account: accountInfo,
    accountShortName: ShortName,
  });
});

router.get('/edit/avt', (req, res) => {
  const accountInfo = accountModel.getInfo();
  const ShortName =
    accountInfo.FirstName.substring(0, 1) +
    accountInfo.LastName.substring(0, 1);
  res.render('teacher/AvtEdit', {
    account: accountInfo,
    accountShortName: ShortName,
  });
});

router.get('/new/course', (req, res) => {
  const accountInfo = accountModel.getInfo();
  const ShortName =
    accountInfo.FirstName.substring(0, 1) +
    accountInfo.LastName.substring(0, 1);
  const Course = courseModel.CourseDetail();
  console.log(Course.sectionList);
  res.render('teacher/newCourse', {
    account: accountInfo,
    accountShortName: ShortName,
    Detail: Course,
  });
});
router.get('/edit/course', (req, res) => {
  const CourseList = courseModel.getAllCourses();
  console.log(CourseList);
  res.render('teacher/showAllCourse', {
    courseList: CourseList,
  });
});
router.get('/edit/course/:id', (req, res) => {
  const Course = courseModel.CourseDetail();
  console.log(Course);
  res.render('teacher/editCourse', {
    course: Course,
  });
});
export default router;
