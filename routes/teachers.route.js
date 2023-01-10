import express, { Router } from 'express';
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
router.get('/edit/course', (req, res) => {
  res.render('teacher/showAllCourse', {
    courseList: CourseList,
    layout: 'teacher.hbs'
  });
});
router.get('/edit/course/:id', (req, res) => {
  const Course = courseModel.CourseDetail();
  console.log(Course);
  res.render('teacher/editCourse', {
    course: Course,
    layout: 'teacher.hbs'
  });
});
router.get('/edit/profile/', (req, res)=>{
  res.render('teacher/editAccount',
      {
        layout: 'teacher.hbs'
      }
      );
})


router.post('/new/course', async (req, res)=>{
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
  Object.keys(req.body).forEach(key=>{
    if (key.includes('SectionName')) countSection = Math.max(countSection,Number(key.split('e')[2]));
  });
  for(let i=1;i<=countSection;i++) {
    let countVideo = 0;
    const sectionID = await sectionService.insert(i,req.body['SectionName'+i],Course.courseid);
    Object.keys(req.body).forEach(key=>{
      if (key.includes('videoName'+i.toString())) {
        console.log(Number(key.split('e')[2]));
        countVideo = Math.max(countVideo,Number(key.split('e')[2]));
      }
    });
    countVideo = Number(countVideo.toString().slice(i.toString().length));
    for (let j=0;j<=countVideo;j++) {
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
      await lectureService.insert(newLecture.sectionID, newLecture.order, newLecture.nameVideo, newLecture.desVideo,newLecture.inputFile,newLecture.length,newLecture.isPreview);
    }
  }
  res.render('teacher/newCourse',{
    layout: 'teacher.hbs'
  });
})
export default router;
