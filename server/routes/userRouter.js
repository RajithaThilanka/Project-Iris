const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const aiController = require('../controllers/aiController');
const answerController = require('../controllers/answerController');
const connectionsRouter = require('./connectionsRouter');
const friendsRouter = require('./friendsRouter');
const dateRouter = require('./dateRouter');
const router = express.Router();

// user routes

router.route('/signup/account-info').post(authController.signupAccountInfo);
router.route('/signup/user-info').post(authController.signupUserInfo);
router.route('/signup/profile-view').post(authController.signupProfileView);
router.route('/signup/lookingfor-info').post(authController.setupLookingFor);
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
  .get(
    authController.protect,
    authController.checkManualVerification,
    aiController.generateUserSuggestions
  );
router
  .route('/me/suggestions/ai')
  .get(
    authController.protect,
    authController.checkManualVerification,
    aiController.generateSuggestions
  );

router
  .route('/me/manual-verify')
  .post(authController.protect, authController.requestManualVerify);
router.use('/me/connections', connectionsRouter);
router.use('/me/friends', friendsRouter);
router.use('/me/dates', dateRouter);
router
  .route('/me/submit-answer/:id')
  .patch(authController.protect, answerController.addAnswer);
router
  .route('/me/answers')
  .get(authController.protect, answerController.getAnswers);
router
  .route('/me')
  .get(authController.protect, userController.getMe, userController.getUser);

// admin routes

router.route('/admin/login').post(authController.adminLogin);
router
  .route('/verify-requests')
  .get(authController.adminProtect, authController.getAllVerificationRequests);
router
  .route('/verify-account/:id')
  .patch(authController.adminProtect, authController.verifyAccount);

router.route('/').get(authController.protect, userController.getUsers);
router
  .route('/con')
  .get(authController.protect, userController.fetchConnections);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(authController.adminProtect, userController.updateUser)
  .delete(authController.adminProtect, userController.deleteUser);

module.exports = router;
