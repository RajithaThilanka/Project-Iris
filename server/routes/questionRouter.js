const express = require('express');
const authController = require('../controllers/authController');
const questionController = require('../controllers/questionController');

const router = express.Router();

router
  .route('/:id')
  .get(questionController.getQuestion)
  .patch(authController.adminProtect, questionController.updateQuestion)
  .delete(authController.adminProtect, questionController.deleteQuestion);
router
  .route('/')
  .get(questionController.getAllQuestions)
  .post(authController.adminProtect, questionController.addQuestion);

module.exports = router;
