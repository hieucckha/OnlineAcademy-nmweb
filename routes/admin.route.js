import express from 'express';
import userService from "../services/user.service.js";

const router = express.Router();

router.get('/', async (req, res) => {
    // const Info = userService.getById('d172436b-5020-4b34-8827-6ebd041d5474');
    res.render('teacher/home', {
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