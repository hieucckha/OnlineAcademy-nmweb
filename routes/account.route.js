import express from 'express';

const router = express.Router();

router.get('/profile', async function (req, res) {
  res.render('vwAccount/profile');
})

export default router;