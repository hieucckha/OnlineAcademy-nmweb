import express from 'express';
import coursesService from '../services/courses.service.js';
import userService from '../services/user.service.js';
import enrollmentsService from '../services/enrollments.service.js';
import watchListService from '../services/watch_list.service.js'

const router = express.Router();

router.get('/watchList', async function (req, res) {
    if (typeof(req.session.authUser) === 'undefined') {
        const list = await coursesService.getWatchList('');
        //console.log(list);
        res.render('vwCourses/watchList', {
            myCourses: list,
            empty: list === null
        });
    } else {
        const list = await coursesService.getWatchList(req.session.authUser.userId);
        //console.log(list);
        res.render('vwCourses/watchList', {
            myCourses: list,
            empty: list === null
        });
    }
})

router.get('/myCourses', async function (req, res) {
    //console.log(req.session.authUser);
    if (typeof(req.session.authUser) === 'undefined') {
        const list = await coursesService.getEnrollList('');
        //console.log(list);
        res.render('vwCourses/myCourses', {
            myCourses: list,
            empty: list === null
        });
    } else {
        const list = await coursesService.getEnrollList(req.session.authUser.userId);
        //console.log(list);
        res.render('vwCourses/myCourses', {
            myCourses: list,
            empty: list === null
        });
    }
    
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

    if (course === null) {
        return res.redirect('/');
    }

    const instructor = await userService.getById(course.createBy);
    let numLecture = 0;

    for (let i = 0; i < course.sectionList.length; i++) {
        if(course.sectionList[i].listLecture !== null)
            for (let j = 0; j < course.sectionList[i].listLecture.length; j++) {
                numLecture += 1;
            }
    }

    res.render('vwCourses/courseDetails', {
        course: course,
        instructor: instructor,
        numLecture: numLecture
    });
})

router.get('/category', async function (req, res) {
    const category_id = req.query.category_id || '';
    const page = Number(req.query.page) || 1;
    const courses = await coursesService.getInfoByCategory(category_id, page) || [];

    console.log(courses);

    let maxPage = 1;
    let countList = await coursesService.getInfoByCategory(category_id, maxPage);

    while (countList !== null){
        countList = await coursesService.getInfoByCategory(category_id, maxPage);;
        maxPage++;
    }
    maxPage--;
    console.log(maxPage);
    let pageList;
    pageList = [];
    if (maxPage === 2) pageList.push({value: page, isActive: true});
    else if (maxPage === 3 && page === 1) pageList.push({value: page, isActive: true},{value: page+1});
    else if (maxPage === 3 && page === 2) pageList.push({value: page -1},{value: page, isActive: true});
    else if (page === 1) pageList.push({value: page, isActive: true},{value: page+1},{value: page+2});
    else if (courses.length === 0) pageList.push({value: page-2},{value: page-1},{value: page, isActive: true})
    else pageList.push({value: page-1},{value: page, isActive: true},{value: page+1});


    res.render('vwCourses/categoryView', {
        courses: courses,
        pageList: pageList,
        maxPage: maxPage,
        empty: courses === null
    });
})

router.post('/enrollCourse', async function (req, res) {
    const courseId = req.body.courseId || '';
    if (typeof(req.session.authUser) !== 'undefined') {
        const userId = req.session.authUser.userId;

        const isExist = await coursesService.checkEnrolledCourse(userId, courseId);

        if (isExist) {
            const url = req.headers.referer || '/';
            res.redirect(url);
        } else {
            enrollmentsService.insert(userId, courseId);
            const url = req.headers.referer || '/';
            res.redirect(url);
        }   
    } else {
        res.redirect('/');
    }
});

router.post('/AddToWatchList', async function (req, res) {
    const courseId = req.body.courseId || '';
    if (typeof(req.session.authUser) !== 'undefined') {
        const userId = req.session.authUser.userId;

        const isExist = await coursesService.checkExistsWatchList(userId, courseId);

        if (isExist) {
            const url = req.headers.referer || '/';
            res.redirect(url);
        } else {
            watchListService.insert(userId, courseId);
            const url = req.headers.referer || '/';
            res.redirect(url);
        }   
    } else {
        res.redirect('/');
    }
});

router.post('/watchList/delete', async function (req, res) {
    const courseId = req.body.courseId || '';
    if (typeof(req.session.authUser) !== 'undefined') {
        const userId = req.session.authUser.userId;

        const isExist = await coursesService.checkExistsWatchList(userId, courseId);

        if (isExist) {
            watchListService.delete(userId, courseId);
            const url = req.headers.referer || '/';
            res.redirect(url);
        } else {
            const url = req.headers.referer || '/';
            res.redirect(url);
        }   
    } else {
        res.redirect('/');
    }
});

export default router;