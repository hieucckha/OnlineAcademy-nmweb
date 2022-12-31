import express from 'express';

const router = express.Router();

router.get('/watchList', async function (req, res) {
  res.render('vwCourses/watchList');
})

router.get('/myCourses', async function (req, res) {
    res.render('vwCourses/myCourses');
})

router.get('/learningHistory', async function (req, res) {
    res.render('vwCourses/learningHistory');
})

router.get('/watchVideos', async function (req, res) {
    res.render('vwCourses/watchVideos');
})

export default router;