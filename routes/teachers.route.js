import express, {Router} from 'express';
import fs from 'fs';
import userService from '../services/user.service.js';
import courseModel from '../models/Course.model.js';
import categoryService from "../services/category.service.js";
import coursesService from "../services/courses.service.js";
import sectionService from "../services/section.service.js";
import lectureService from "../services/lecture.service.js";

const router = express.Router();

router.get('/', (req, res) => {
    const Info = userService.getById('d172436b-5020-4b34-8827-6ebd041d5474');
    res.render('teacher/home', {
        layout: 'teacher.hbs'
    });
});
router.get('/new/course', async (req, res) => {
    const categoryList = await categoryService.getList();
    res.render('teacher/newCourse', {
        layout: 'teacher.hbs',
        categoryList: categoryList
    });
});
router.get('/edit/course/', async (req, res) => {
    const courseId = req.query.courseId;
    const course = await coursesService.getFullCourse(courseId);
    const instructor = await userService.getById(course.createBy);
    let numLecture = 0;

    for (let i = 0; i < course.sectionList.length; i++) {
        if (course.sectionList[i].listLecture !== null)
            for (let j = 0; j < course.sectionList[i].listLecture.length; j++) {
                numLecture += 1;
            }
    }
    if (course === null) {
        return res.redirect('/');
    }
    course.image = '/' + course.image;
    res.render('teacher/editCourse', {
        course: course,
        instructor: instructor,
        numLecture: numLecture,
        layout: 'teacher.hbs'
    });
});
router.get('/edit/profile/', (req, res) => {
    res.render('teacher/editAccount',
        {
            layout: 'teacher.hbs'
        });
})
router.get('/course/mycourse', async (req, res) => {
    const teacherID = 'd172436b-5020-4b34-8827-6ebd041d5474';
    const page = Number(req.query.page) || 1;
    const list = await coursesService.getAllCourseTeacher(teacherID, page) || [];
    let maxPage = 1;
    let countList = await coursesService.getAllCourseTeacher(teacherID, maxPage);

    while (countList !== null) {
        countList = await coursesService.getAllCourseTeacher(teacherID, maxPage);
        ;
        maxPage++;
    }
    maxPage--;
    console.log(maxPage);
    let pageList;
    pageList = [];
    if (maxPage === 2) pageList.push({value: page, isActive: true});
    else if (maxPage === 3 && page === 1) pageList.push({value: page, isActive: true}, {value: page + 1});
    else if (maxPage === 3 && page === 2) pageList.push({value: page - 1}, {value: page, isActive: true});
    else if (page === 1) pageList.push({value: page, isActive: true}, {value: page + 1}, {value: page + 2});
    else if (list.length === 0) pageList.push({value: page - 2}, {value: page - 1}, {value: page, isActive: true})
    else pageList.push({value: page - 1}, {value: page, isActive: true}, {value: page + 1});

    list.forEach(member => {
        member.image = '/' + member.image;
    })
    res.render('teacher/showAllCourse', {
        myCourses: list,
        pageList: pageList,
        maxPage: maxPage,
        empty: list === null,
        layout: 'teacher.hbs'
    });
});

router.post('/new/course', async (req, res) => {
    const teacherID = 'd172436b-5020-4b34-8827-6ebd041d5474';
    console.log(req.body);
    if (req.body.categoryId === 'Choose...') return;
    const Course = await coursesService.insert(
        req.body.title,
        req.body.categoryId,
        req.body.image,
        req.body.b_description,
        req.body.description,
        Number(req.body.Price),
        Number(req.body.Discount),
        0,
        teacherID
    );
    let countSection = 0;
    Object.keys(req.body).forEach(key => {
        if (key.includes('SectionName')) countSection = Math.max(countSection, Number(key.split('e')[2]));
    });
    for (let i = 1; i <= countSection; i++) {
        let countVideo = 0;
        const sectionID = await sectionService.insert(i, req.body['SectionName' + i], Course.courseid);
        Object.keys(req.body).forEach(key => {
            if (key.includes('videoName' + i.toString())) {
                console.log(Number(key.split('e')[2]));
                countVideo = Math.max(countVideo, Number(key.split('e')[2]));
            }
        });
        countVideo = Number(countVideo.toString().slice(i.toString().length));
        for (let j = 0; j <= countVideo; j++) {
            let isPreview = false;
            if (req.body['isPreview' + i.toString() + j.toString()] !== undefined) isPreview = true;

            const newLecture = {
                sectionID: sectionID,
                order: j,
                nameVideo: req.body['videoName' + i.toString() + j.toString()],
                desVideo: req.body['videoDes' + i.toString() + j.toString()],
                inputFile: req.body['inputGroupFile' + i.toString() + j.toString()],
                Length: 0,
                isPreview: isPreview
            };
            await lectureService.insert(newLecture.sectionID, newLecture.order, newLecture.nameVideo, newLecture.desVideo, newLecture.inputFile, newLecture.length, newLecture.isPreview);
        }
    }
    res.render('teacher/newCourse', {
        layout: 'teacher.hbs'
    });
})
export default router;
