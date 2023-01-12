import express from 'express';
import userService from "../services/user.service.js";
import coursesService from "../services/courses.service.js";
import categoryService from "../services/category.service.js";
import multer from "multer";

const router = express.Router();

router.get('/', async (req, res) => {
    const user = req.session.authUser;
    if (user === undefined) return res.redirect('/');
    else if (user.role !== 0) return res.redirect('/');

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
        user: user,
        layout: 'admin.hbs'
    });
});
router.get('/students', async (req, res) => {
    const user = req.session.authUser;
    if (user === undefined) return res.redirect('/');
    else if (user.role !== 0) return res.redirect('/');

    const students = await userService.getListStudent();
    const mess = req.query.mess || '';
    console.log(students[0])

    res.render('admin/showStudent', {
        student: students,
        layout: 'admin.hbs',
        mess: mess,
    });
})
router.get('/teachers', async (req, res) => {
    const user = req.session.authUser;
    if (user === undefined) return res.redirect('/');
    else if (user.role !== 0) return res.redirect('/');

    const teachers = await userService.getListTeacher();
    const mess = req.query.mess || '';
    res.render('admin/showTeacher', {
        teacher: teachers,
        layout: 'admin.hbs',
        mess: mess,
    });
})
router.get('/courses', async (req, res) => {
    const user = req.session.authUser;
    if (user === undefined) return res.redirect('/');
    else if (user.role !== 0) return res.redirect('/');

    const teacherId = req.query.teacherId || null;
    const categoryId = req.query.categoryId || null;

    const page = Number(req.query.page) || 1;
    let list = [];
    let maxPage = 1;
    if (categoryId !== null) {
        list = await coursesService.getAllCourseCategory(categoryId, page) || [];
        const clist = await coursesService.getAllCourseCategoryWithoutPage(categoryId) || [];
        maxPage = clist.length;
    }
    else if (teacherId != null){
        list = await coursesService.getAllCourseTeacher(teacherId, page) || [];
        const clist = await coursesService.getAllCourseTeacherWithoutPage(teacherId) || [];
        maxPage = clist.length;
    }
    else {
        list = await coursesService.getAllCourses(page) || [];
        let countList = await coursesService.getAllCourses(maxPage);
        while (countList !== null) {
            countList = await coursesService.getAllCourses(maxPage) || null;
            maxPage++;
        }
        maxPage--;
    }

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

    const mess = req.query.mess || '';

    const category = await categoryService.getListCateLevel2();
    const teachers = await userService.getListTeacher();
    for (let i =0;i<list.length;i++){
        const category = await categoryService.get(list[i].categoryId);
        const teacher = await userService.getById(list[i].createBy);
        list[i].categoryId = category.title;
        list[i].createBy = teacher.firstName + ' ' + teacher.lastName;
    }


    res.render('admin/showCourse', {
        myCourses: list,
        pageList: pageList,
        maxPage: maxPage,
        mess: mess,
        teachers: teachers,
        empty: list === null,
        category: category,
        //user: user,
        layout: 'admin.hbs'
    });
})

router.post('/add/teacher', async (req, res)=>{
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
        if(await userService.isEmailExist(req.body.email)) return res.redirect('/admin/teachers?mess='+'Email already Exist');
        if (req.body.password.length <=6)
            return res.redirect('/admin/teachers?mess='+'Password must be greater than 6 characters.');
        if (await userService.createTeacher(req.body.email, req.body.password, req.body.firstName, req.body.lastName)!==null)
            res.redirect('/admin/teachers?mess='+'Create new teacher successfully.');
    });
});
router.post('/add/student', async (req, res)=>{
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
        if(await userService.isEmailExist(req.body.email)) return res.redirect('/admin/studentss?mess='+'Email already Exist');
        if (req.body.password.length <=6)
            return res.redirect('/admin/students?mess='+'Password must be greater than 6 characters.');
        if (await userService.createStudent(req.body.email, req.body.password, req.body.firstName, req.body.lastName)!==null)
            res.redirect('/admin/students?mess='+'Create new student successfully.');
    });
});
router.post('/lock/teacher', async (req, res)=>{
    if (req.body.unlockAccount !== undefined) {
        if (await userService.updateStatus(req.body.userId, 0) !== null)
            res.redirect('/admin/teachers?mess=' + 'Lock teacher successfully.');
    }
    else {
        if (await userService.updateStatus(req.body.userId, 1) !== null)
            res.redirect('/admin/teachers?mess=' + 'Lock teacher successfully.');
    }
})
router.post('/lock/student', async (req, res)=>{
    if (req.body.unlockAccount !== undefined) {
        if (await userService.updateStatus(req.body.userId, 0) !== null)
            res.redirect('/admin/students?mess=' + 'Unlock student successfully.');
    }
    else {
        if (await userService.updateStatus(req.body.userId, 1) !== null)
            res.redirect('/admin/students?mess=' + 'Lock student successfully.');
    }
})
router.post('/filter/course', async (req, res) =>{
    console.log(req.body.category);
    console.log(req.body.teacher);
    if (req.body.teacher !== 'Open this select teacher' && req.body.category !== 'Open this select category') {
        return res.redirect('/admin/courses?mess=' + 'Can\'t find with two filter. Please choose only one.');
    }
    else if (req.body.teacher === 'Open this select teacher'){
            return res.redirect('/admin/courses?categoryId=' + req.body.category);
        }
        else return res.redirect('/admin/courses?teacherId=' + req.body.teacher);
})
export default router;