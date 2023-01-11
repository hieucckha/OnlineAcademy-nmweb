import express from 'express';
import coursesService from '../services/courses.service.js';
import userService from '../services/user.service.js';
import fs from "fs";
import courseModel from "../models/Course.model.js";

const router = express.Router();

router.get('/watchList', async function (req, res) {
    const list = await coursesService.getWatchList('1ed4ef15-1512-48d6-be79-3793867fcea4');
    //console.log(list);
    res.render('vwCourses/watchList', {
        myCourses: list,
        empty: list === null
    });
})

router.get('/myCourses', async function (req, res) {
    const list = await coursesService.getEnrollList('1ed4ef15-1512-48d6-be79-3793867fcea4');
    //console.log(list);
    res.render('vwCourses/myCourses', {
        myCourses: list,
        empty: list === null
    });
})

router.get('/learningHistory', async function (req, res) {
    res.render('vwCourses/learningHistory');
})

router.get('/watchVideos', async function (req, res) {
    res.render('vwCourses/watchVideos');
})

router.get('/courseDetails', async function (req, res) {
    const courseId = req.query.courseId || '';
    const course = await coursesService.getFullCourse(courseId);
    const instructor = await userService.getById(course.createBy);
    let numLecture = 0;

    for (let i = 0; i < course.sectionList.length; i++) {
        if(course.sectionList[i].listLecture !== null)
            for (let j = 0; j < course.sectionList[i].listLecture.length; j++) {
                numLecture += 1;
            }
    }

    console.log(numLecture);

    console.log(course);
    if (course === null) {
        return res.redirect('/');
    }
    res.render('vwCourses/courseDetails', {
        course: course,
        instructor: instructor,
        numLecture: numLecture
    });
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