import express, {query, Router} from 'express';
import userService from '../services/user.service.js';
import categoryService from "../services/category.service.js";
import coursesService from "../services/courses.service.js";
import lectureService from "../services/lecture.service.js";
import fs from 'fs';
import multer from "multer";
import sharp from "sharp";
import sectionService from "../services/section.service.js";

const router = express.Router();

router.get('/', async (req, res) => {
    const user = req.session.authUser;
    if (user === undefined) return res.redirect('/');
    else if (user.role !== 1) return res.redirect('/');

  const hotCourses = await coursesService.getInfoHot();
  const mostView = await coursesService.getInfoMostWatch();
  const newest = await coursesService.getInfoNewest();
  const temp = await categoryService.getList();
  const categories = [];

  for (let i = 0; i < 5; i++) {
    categories.push(temp[i]);
  }

  //console.log(list);
  res.render('teacher/home', {
    hotCourses: hotCourses,
    hot_empty: hotCourses === null,

    mostView: mostView,
    mW_empty: mostView === null,

    newest: newest,
    n_empty: newest === null,

    categories: categories,
    ct_empty: categories === null,
    layout: 'teacher.hbs'
  });
});
router.get('/new/course', async (req, res) => {
  const user = req.session.authUser;
  if (user === undefined) return res.redirect('/');
  else if (user.role !== 1) return res.redirect('/');
  const categoryList = await categoryService.getList();
  //const user = await userService.getById('d172436b-5020-4b34-8827-6ebd041d5474');
  res.render('teacher/nCourse', {
    layout: 'teacher.hbs',
    categoryList: categoryList,
    user: user,
  });
});
router.get('/edit/course/', async (req, res) => {
  const user = req.session.authUser;
  if (user === undefined) return res.redirect('/');
  else if (user.role !== 1) return res.redirect('/');

  const courseId = req.query.courseId
  const course = await coursesService.getFullCourse(courseId);
  const instructor = await userService.getById(course.createBy);
  let numLecture = 0;
  if (course.sectionList) {
    for (let i = 0; i < course.sectionList.length; i++) {
      if (course.sectionList[i].listLecture !== null)
        for (let j = 0; j < course.sectionList[i].listLecture.length; j++) {
          numLecture += 1;
        }
    }
  }
  else {
    course.sectionList = [];
  }
  if (course === null) {
    return res.redirect('/');
  }
  course.image = '/'+course.image;
  res.render('teacher/editCourse', {
    course: course,
    instructor: instructor,
    numLecture: numLecture,
    layout: 'teacher.hbs'
  });
});
router.get('/edit/profile/', (req, res)=>{
  const user = req.session.authUser;
  if (user === undefined) return res.redirect('/');
  else if (user.role !== 1) return res.redirect('/');

  res.render('teacher/editAccount',
      {
        layout: 'teacher.hbs'
      }
      );
})
router.get('/course/mycourse', async (req, res) => {
    const user = req.session.authUser;
    if (user === undefined) return res.redirect('/');
    else if (user.role !== 1) return res.redirect('/');

    const teacherID = user.userId;
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

router.post('/new/course', async (req, res)=>{
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/image");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname );
    },
  });
  const upload = multer({ storage: storage });
  upload.array("image", 1)(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
    } else if (err) {
      console.error(err);
    }
    //const user = req.session.authUser;
    const user = await userService.getById('d172436b-5020-4b34-8827-6ebd041d5474');
    const newCourse = await coursesService.insert(req.body.title, req.body.categoryId, '', req.body.b_description, req.body.Description,0,0,0,user.userId);
    res.redirect('/teacher/edit/course?courseId='+newCourse.courseid);
  });
})
router.post('/edit/course/newLecture', async (req, res, next) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/videos");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage: storage });
  upload.single("imageFile")(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
    } else if (err) {
      console.error(err);
    }
    //const user = req.session.authUser;
    const courseId = req.body.courseId;
    const file = req.file;
    const oldPath = file.path.toString();
    const newPath = oldPath.split(req.file.filename)[0] + req.body.courseId + '.mp4';
    let lectureNum = (await lectureService.getAllFullLecture(req.body.sectionId)) || 0;
    fs.rename(oldPath, newPath, function(err) {
      if ( err ) console.log('ERROR: ' + err);
    });
    console.log(req.body.sectionId);
    if (lectureNum !== 0) lectureNum = lectureNum.length;
    const length = (req.file.size/(1248*1000/8))/3600;
    await lectureService.insert(req.body.sectionId, lectureNum + 1, req.body.videoName, req.body.videoDes, newPath, length, req.body.isPreview || false);
    res.redirect('/teacher/edit/course?courseId=' + courseId);
  });
});
router.post('/edit/course/newSection', async (req, res)=>{
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/image");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname );
    },
  });
  const upload = multer({ storage: storage });
  upload.array("image", 1)(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
    } else if (err) {
      console.error(err);
    }
    //const user = req.session.authUser;
    const user = await userService.getById('d172436b-5020-4b34-8827-6ebd041d5474');
    let sectionNum = await sectionService.getAllFullSection(req.body.courseId) || 0;
    if (sectionNum !== 0) sectionNum = sectionNum.length;
    await sectionService.insert(sectionNum+1,req.body.sectionName,req.body.courseId);
    res.redirect('/teacher/edit/course?courseId='+req.body.courseId);
  });
});
router.post('/edit/course/name', async (req, res)=>{
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/image");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname );
    },
  });
  const upload = multer({ storage: storage });
  upload.array("image", 1)(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
    } else if (err) {
      console.error(err);
    }
    if (req.body.courseName <= 7) return;
    const user = req.session.authUser;
    //const user = await userService.getById('d172436b-5020-4b34-8827-6ebd041d5474');
    const course = await coursesService.getFullCourse(req.body.courseId);
    course.title = req.body.courseName;
    await coursesService.update(req.body.courseId, course.title, course.image, course.bDescription, course.description, course.price, course.discount);

    res.redirect('/teacher/edit/course?courseId='+req.body.courseId);
  });
});
router.post('/edit/course/bDescription', async (req, res)=>{
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/image");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname );
    },
  });
  const upload = multer({ storage: storage });
  upload.array("image", 1)(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
    } else if (err) {
      console.error(err);
    }
    if (req.body.courseName <= 7) return;
    //const user = req.session.authUser;
    const user = await userService.getById('d172436b-5020-4b34-8827-6ebd041d5474');
    const course = await coursesService.getFullCourse(req.body.courseId);
    course.bDescription = req.body.bDescription;
    await coursesService.update(req.body.courseId, course.title, course.image, course.bDescription, course.description, course.price, course.discount);

    res.redirect('/teacher/edit/course?courseId='+req.body.courseId);
  });
});
router.post('/edit/course/Description', async (req, res)=>{
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/image");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname );
    },
  });
  const upload = multer({ storage: storage });
  upload.array("image", 1)(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
    } else if (err) {
      console.error(err);
    }
    if (req.body.courseName <= 7) return;
    //const user = req.session.authUser;
    const user = await userService.getById('d172436b-5020-4b34-8827-6ebd041d5474');
    const course = await coursesService.getFullCourse(req.body.courseId);
    course.description = req.body.description;
    await coursesService.update(req.body.courseId, course.title, course.image, course.bDescription, course.description, course.price, course.discount);

    res.redirect('/teacher/edit/course?courseId='+req.body.courseId);
  });
});
router.post('/edit/course/image', async (req, res)=>{
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/img/courses");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage: storage });
  upload.single("image")(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
    } else if (err) {
      console.error(err);
    }
    //const user = req.session.authUser;
    const courseId = req.body.courseId;
    const file = req.file;
    const oldPath = file.path.toString();
    await sharp(file.path).resize(240, 135).toFile('./public/img/courses/' + req.body.courseId +'.jpg', function(err) {
      if (err) {
        console.error('sharp>>>', err)
      }
    });
    const newPath = oldPath.split(req.file.filename)[0] + req.body.courseId + '.jpg';
    const course = await coursesService.getFullCourse(req.body.courseId);
    course.image = newPath.slice(7);
    await coursesService.update(req.body.courseId, course.title, course.image, course.bDescription, course.description, course.price, course.discount);
    res.redirect('/teacher/edit/course?courseId=' + courseId);
  });
});
router.post('/edit/course/prices', async (req, res)=>{
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/image");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname );
    },
  });
  const upload = multer({ storage: storage });
  upload.array("image", 1)(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
    } else if (err) {
      console.error(err);
    }
    if (req.body.courseName <= 7) return;
    //const user = req.session.authUser;
    const user = await userService.getById('d172436b-5020-4b34-8827-6ebd041d5474');
    const course = await coursesService.getFullCourse(req.body.courseId);
    course.price = req.body.price;
    course.discount = req.body.discount;
    await coursesService.update(req.body.courseId, course.title, course.image, course.bDescription, course.description, course.price, course.discount);

    res.redirect('/teacher/edit/course?courseId='+req.body.courseId);
  });
});
export default router;
