'use strict';
// userRoute
const express = require('express');
const multer = require("multer");
const { body } = require('express-validator');
const router = express.Router();
const upload = multer({ dest: './uploads/'});
const {
  user_list_get,
  user_get,
  user_post,
  checkToken,
  user_modify,
} = require('../controllers/userController');

router.get('/token', checkToken);

router.get('/', user_list_get);

router.get('/:id', user_get);

router
.route('/user')
.get(user_list_get)
.post(
    body('firstname').isLength({min: 3}),
    body('email').isEmail(),
    body('password').matches('(?=.*[A-Z]).{8,}'),
    user_post)
.put(user_modify)


module.exports = router;