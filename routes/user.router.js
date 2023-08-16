const express = require('express');
const router = express.Router();
const userController = require('./../controllers/user.controller');

router
    .route('/random')
    .get(userController.getARandomUser);

router
    .route('/all')
    .get(userController.getAllUser);

module.exports = router;