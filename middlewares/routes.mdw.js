import express from 'express';
import accountRoute from '../routes/account.route.js';
import coursesRoute from '../routes/courses.route.js';
import teacherRoutes from '../routes/teachers.route.js';
import coursesService from '../services/courses.service.js';
import categoryService from '../services/category.service.js';
import adminRoute from "../routes/admin.route.js";

export default function (app) {
  app.get('/', async function (req, res) {
    const hotCourses = await coursesService.getInfoHot();
    const mostView = await coursesService.getInfoMostWatch();
    const newest = await coursesService.getInfoNewest();
    const temp = await categoryService.getList();
    const categories = [];
  
    for (let i = 0; i < 5; i++) {
      categories.push(temp[i]);
    }

    //console.log(list);
    res.render('home', {
        hotCourses: hotCourses,
        hot_empty: hotCourses === null,

        mostView: mostView,
        mW_empty: mostView === null,

        newest: newest,
        n_empty: newest === null,

        categories: categories,
        ct_empty: categories === null
    });
  })

  app.use('/account', accountRoute, express.static('public'));
  app.use('/courses', coursesRoute, express.static('public'));
  app.use('/teacher', teacherRoutes, express.static('public'));
  app.use('/admin', adminRoute, express.static('public'));
}
