import express from 'express';
import coursesService from '../services/courses.service.js';

const router = express.Router();

router.get('/watchList', async function (req, res) {
    const list = await coursesService.getWatchList('33bb527d-3b96-4a4c-a8e8-09ea9edb0c54');
    //console.log(list);
    res.render('vwCourses/watchList', {
        myCourses: list,
        empty: list === null
    });
})

router.get('/myCourses', async function (req, res) {
    const list = await coursesService.getEnrollList('33bb527d-3b96-4a4c-a8e8-09ea9edb0c54');
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
    const course = await coursesService.getCourseById(courseId);
    //console.log(course);
    if (course === null) {
        return res.redirect('/');
    }
    res.render('vwCourses/courseDetails', {
        course: course,
    });
})

export default router;