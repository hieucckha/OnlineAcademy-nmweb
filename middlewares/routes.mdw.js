import express from 'express';
import accountRoute from '../routes/account.route.js';
import coursesRoute from '../routes/courses.route.js';

export default function (app) {
  app.get('/', function (req, res) {
    res.render('home');
  })

  app.use('/account', accountRoute, express.static('public'));
  app.use('/courses', coursesRoute, express.static('public'));
}