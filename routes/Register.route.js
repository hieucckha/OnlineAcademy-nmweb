import { Console } from 'console';
import express from 'express';
import fs from "fs";
import courseModel from "../models/Course.model.js";

const router = express.Router();

router.get('/', (req, res) => {
    const Courses = courseModel.Courses();
    const path = "../public/img/courseImg/" + String(Courses.Name) + ".jpg";
    if (fs.existsSync(path)) {
        Courses.Image = String(Course.Name);
        res.render('Account/RegisterPage');
    } else {
        res.render('Account/RegisterPage');
    }
});


export default router;