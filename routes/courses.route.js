import express from 'express';
import coursesService from '../services/courses.service.js';
import lectureService from '../services/lecture.service.js';
import sectionService from '../services/section.service.js';
import userService from '../services/user.service.js'

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

export default router;