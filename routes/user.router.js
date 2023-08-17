const express = require('express');
const router = express.Router();
const userController = require('./../controllers/user.controller');
const saveRouteValidator = require('../middleware/saveRouteValidator');
const userIdValidator = require('../middleware/userIdValidator');

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
    .patch(userIdValidator, userController.updateAUser);

router
    .route('/bulk-update')
    .patch(userController.updateMultipleUser);


router
    .route('/delete')
    .delete(userIdValidator, userController.deleteAUser);

module.exports = router;