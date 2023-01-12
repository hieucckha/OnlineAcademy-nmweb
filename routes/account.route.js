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
    return res.redirect('/admin');
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

router.post('/logout', async function (req, res) {
  req.session.auth = false;
  req.session.authUser = null;

  res.redirect('/');
});

router.post('/editProfile', async function (req, res) {
  if (typeof(req.session.authUser) === 'undefined') {
    return res.render('vwAccount/profile', {
      err_message: 'Invalid password'
    });
  } else {
    const user = await userService.isAuth(req.session.authUser.email, req.body.pass);

    if (user === null) {
      return res.render('vwAccount/profile', {
        err_message: 'Invalid password'
      });
    }

    userService.updateEmail(user.userId, req.body.email);
    userService.updateName(user.userId, req.body.firstName, req.body.lastName);


    req.session.authUser = await userService.getById(user.userId);

    const url = req.session.retUrl || '/';
    delete req.session.retUrl;
    res.redirect(url);
  }
});

router.post('/changePass', async function (req, res) {
  console.log(req.body);

  if (typeof(req.session.authUser) === 'undefined') {
    return res.render('vwAccount/profile');
  } else {

    const user = await userService.isAuth(req.session.authUser.email, req.body.pass);

    if (user === null) {
      return res.render('vwAccount/profile');
    }

    userService.updatePassword(user.userId, req.body.pass, req.body.newPass);

    req.session.auth = false;
    req.session.authUser = null;

    delete req.session.retUrl;
    res.redirect('/');
  }
});


export default router;