import express from 'express';
import accountRoute from '../routes/account.route.js';
import coursesRoute from '../routes/courses.route.js';
import teacherRoutes from '../routes/teachers.route.js';
import coursesService from '../services/courses.service.js';

export default function (app) {
  app.get('/', async function (req, res) {
    const list = await coursesService.getInfoHot('1ed4ef15-1512-48d6-be79-3793867fcea4');
    //console.log(list);
    res.render('home', {
        myCourses: list,
        empty: list === null
    });
  })

  app.use('/account', accountRoute, express.static('public'));
  app.use('/courses', coursesRoute, express.static('public'));
  app.use('/teacher', teacherRoutes, express.static('public'));
}
