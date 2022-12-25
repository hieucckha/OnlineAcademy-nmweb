import { Console } from 'console';
import express from 'express';
import fs from "fs";
import accountModel from "../models/Account.model.js";
import courseModel from "../models/Course.model.js";

const router = express.Router();

router.get('/', (req, res) => {
    const Info = accountModel.getInfo();
    const path = "../public/img/avt/" + String(Info.Id);
    let ShortName = false;
    let avtPath = false;
    if (fs.existsSync(path)) {
        avtPath = String(Info.Id);
        res.render('teacher/home',{
            layout: 'teacher.hbs',
            ID: avtPath,
        });
      } else {
        ShortName = Info.FirstName.substring(0, 1) + Info.LastName.substring(0, 1);
        res.render('teacher/home',{
            layout: 'teacher.hbs',
            accountShortName: ShortName,
        });
      }
});

router.get('/edit/profile', (req, res) => {
    const accountInfo = accountModel.getInfo();
    const ShortName = accountInfo.FirstName.substring(0, 1) + accountInfo.LastName.substring(0, 1);
    res.render('teacher/edit',{
        layout: 'teacher.hbs',
        account : accountInfo,
        accountShortName: ShortName,
    });
});

router.get('/edit/avt', (req, res) => {
    const accountInfo = accountModel.getInfo();
    const ShortName = accountInfo.FirstName.substring(0, 1) + accountInfo.LastName.substring(0, 1);
    res.render('teacher/AvtEdit',{
        layout: 'teacher.hbs',
        account : accountInfo,
        accountShortName: ShortName,
    });
});

router.get('/new/course', (req, res) => {
    const accountInfo = accountModel.getInfo();
    const ShortName = accountInfo.FirstName.substring(0, 1) + accountInfo.LastName.substring(0, 1);
    const Course = courseModel.CourseDetail();
    console.log(Course.list);
    res.render('teacher/newCourse',{
        layout: 'teacher.hbs',
        account: accountInfo,
        accountShortName: ShortName,
        Detail: Course,
    });
});

export default router;