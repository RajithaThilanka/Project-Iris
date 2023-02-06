const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const aiController = require('../controllers/aiController');
const connectionsRouter = require('./connectionsRouter');
const friendsRouter = require('./friendsRouter');
const dateRouter = require('./dateRouter');
const uploadRouter = require('./uploadRouter');
const reportController = require('../controllers/reportController');
const router = express.Router();

// user routes

router.route('/signup').post(authController.signup);
router.route('/verify/:id/:uniqueString').patch(authController.verify);
router.route('/login').post(authController.login);
router.route('/forgot-password').post(authController.forgotPassword);
router.route('/reset-password/:token').patch(authController.resetPassword);

// Me routes

router
  .route('/me/update-password')
  .patch(authController.protect, authController.updatePassword);

router
  .route('/me/delete')
  .delete(authController.protect, userController.deleteMe);

router
  .route('/me/update')
  .patch(authController.protect, userController.updateMe);
router
  .route('/me/suggestions')
  .get(authController.protect, aiController.generateSuggestions);

router.use('/me/connections', connectionsRouter);
router.use('/me/friends', friendsRouter);
router.use('/me/dates', dateRouter);

router
  .route('/me')
  .get(authController.protect, userController.getMe, userController.getUser);

// admin routes

router
  .route('/verify-account/:id')
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    authController.verifyAccount
  );
router
  .route('/')
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    userController.getUsers
  );

router
  .route('/:id')
  .get(authController.protect, userController.getUser)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    userController.updateUser
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    userController.deleteUser
  );

module.exports = router;
