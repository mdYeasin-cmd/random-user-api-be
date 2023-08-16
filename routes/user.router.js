const express = require('express');
const router = express.Router();
const userController = require('./../controllers/user.controller');
const saveRouteValidator = require('../middleware/saveRouteValidator');

router
    .route('/random')
    .get(userController.getARandomUser);

router
    .route('/all')
    .get(userController.getAllUser);

router
    .route('/save')
    .post(saveRouteValidator, userController.saveANewUser);

router
    .route('/update')
    .patch();

module.exports = router;