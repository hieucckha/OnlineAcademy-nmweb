import accountRoute from '../routes/account.route.js';
import coursesRoute from '../routes/courses.route.js';

export default function (app) {
  app.get('/', function (req, res) {
    res.render('vwCourses/watchVideo');
  })

  app.use('/account', accountRoute);
  app.use('/courses', coursesRoute);
}