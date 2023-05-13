const express = require('express');

//controllers
const booksController = require('../controllers/books.controller');

//middlewares
const booksMiddleware = require('./../middlewares/books.middleware');

const router = express.Router();

router.route('/').get(booksController.findAll).post(booksController.create);

router
  .use('/:id', booksMiddleware.existBook)
  .route('/:id')
  .get(booksController.findOne)
  .patch(booksController.update)
  .delete(booksController.delete);

module.exports = router;
