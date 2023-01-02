import { Console } from 'console';
import express from 'express';
import fs from "fs";
import courseModel from "../models/Course.model.js";

const router = express.Router();

router.get('/watchList', async function (req, res) {
  res.render('vwCourses/watchList');
})

router.get('/myCourses', async function (req, res) {
    res.render('vwCourses/myCourses');
})

router.get('/learningHistory', async function (req, res) {
    res.render('vwCourses/learningHistory');
})

router.get('/watchVideos', async function (req, res) {
    res.render('vwCourses/watchVideos');
})


router.get('/', (req, res) => {
    const Courses = courseModel.Courses();
    const path = "../public/img/courseImg/" + String(Courses.Name) + ".jpg";
    if (fs.existsSync(path)) {
        Courses.Image = String(Course.Name);
        res.render('Course/CourseDetail');
        //
    } else {
        res.render('Course/CourseDetail');
        //
    }
});

router.get('/web', (req, res) => {
    const Courses = courseModel.Courses();
    const path = "../public/img/courseImg/" + String(Courses.Name) + ".jpg";
    if (fs.existsSync(path)) {
        Courses.Image = String(Course.Name);
        res.render('Course/CourseList')
        //
    } else {
        res.render('Course/CourseList');
        //
    }
});

router.get('/mobile', (req, res) => {
    const Courses = courseModel.Courses();
    const path = "../public/img/courseImg/" + String(Courses.Name) + ".jpg";
    if (fs.existsSync(path)) {
        Courses.Image = String(Course.Name);
        res.render('Course/CourseList');    
        //
    } else {
        res.render('Course/CourseList');
        //
    }
});

export default router;