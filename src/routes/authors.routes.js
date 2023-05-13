const express = require('express');

const authorController = require('../controllers/authors.controller');
const validationsMiddleware = require('./../middlewares/validations.middleware');

const router = express.Router();

router
  .route('/')
  .get(authorController.findAll)
  .post(
    validationsMiddleware.createAuthorsValidations,
    authorController.create
  );

router
  .route('/:id')
  .get(authorController.findOne)
  .patch(authorController.update)
  .delete(authorController.delete);

module.exports = router;
