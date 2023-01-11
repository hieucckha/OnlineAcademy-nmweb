import express from 'express';
import userService from '../services/user.service.js';

const router = express.Router();

router.get('/profile', async function (req, res) {
  res.render('vwAccount/profile');
})

router.get('/login', async function (req, res) {
  res.render('vwAccount/login', {
    layout: false
  });
});

router.post('/login', async function (req, res) {
  const user = await userService.isAuth(req.body.email, req.body.pass);

  if (user === null) {
    return res.render('vwAccount/login', {
      layout: false,
      err_message: 'Invalid email or password'
    });
  }
  req.session.auth = true;
  req.session.authUser = user;

  if (user.role === 0) {
    res.render('home', {
      layout: 'admin.hbs'
    });
  } else if (user.role === 1) {
    return res.redirect('/teacher');
  } else {
    const url = req.session.retUrl || '/';
    delete req.session.retUrl;
    res.redirect(url);
  }
});

router.get('/signup', async function (req, res) {
  res.render('vwAccount/login', {
    layout: false
  });
});

router.post('/signup', async function (req, res) {
  
  if (req.body.role === '2') {

    await userService.createStudent(
      req.body.email, 
      req.body.pass, 
      req.body.firstname, 
      req.body.lastname
    )
  } else {
    await userService.createTeacher(
      req.body.email, 
      req.body.pass, 
      req.body.firstname, 
      req.body.lastname
    )
  }

  res.render('vwAccount/login', {
    layout: false
  });
});

router.get('/is-available', async function (req, res) {
  const email = req.query.email;
  const exist = await userService.isEmailExist(email);

  if(!exist) {
    return res.json(true);
  }

  res.json(false);
});

router.post('/logout', function (req, res) {
  req.session.auth = false;
  req.session.authUser = null;

  const url = req.headers.referer || '/';
  res.redirect(url);
});

router.post('/editProfile', async function (req, res) {
  const user = await userService.isAuth(req.session.authUser.email, req.body.pass);

  if (user === null) {
    return res.render('vwAccount/profile', {
      err_message: 'Invalid password'
    });
  }

  userService.updateEmail(user.userId, req.body.email);
  userService.updateName(user.userId, req.body.firstname, req.body.lastname);

  const url = req.session.retUrl || '/';
  delete req.session.retUrl;
  res.redirect(url);

});

export default router;