import express from 'express';
import userService from "../services/user.service.js";
import coursesService from "../services/courses.service.js";
import categoryService from "../services/category.service.js";

const router = express.Router();

router.get('/', async (req, res) => {
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
        //user: user,
        layout: 'admin.hbs'
    });
});

router.get('/students', async (req, res) => {
    const students = await userService.getListStudent();

    console.log(students[0])

    res.render('admin/showStudent', {
        student: students,
        layout: 'admin.hbs',
    });
})

router.get('/teachers', async (req, res) => {
    const teachers = await userService.getListTeacher();

    res.render('admin/showTeacher', {
        teacher: teachers,
        layout: 'admin.hbs',
    });
})

// router.get('/viewTeacher', async (req, res) => {
//     const {userId} = req.body
//
//     console.log(userId);
//
//     res.render('admin/showTeacher', {
//         layout: 'admin.hbs',
//     });
// })

export default router;