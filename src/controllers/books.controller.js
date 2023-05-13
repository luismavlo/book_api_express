const db = require('../database/models');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.findAll = catchAsync(async (req, res, next) => {
  const books = await db.Books.findAll({
    where: {
      status: true,
    },
  });

  return res.status(200).json({
    status: 'success',
    results: books.length,
    books,
  });
});

exports.create = catchAsync(async (req, res, next) => {
  const {
    title,
    synopsis,
    number_pages,
    editorial,
    publication_date,
    score,
    author_id,
  } = req.body;

  const book = await db.Books.create({
    title,
    synopsis,
    number_pages,
    editorial,
    publication_date,
    score,
    author_id,
  });

  return res.status(201).json({
    status: 'success',
    message: 'The book has been created! 😎',
    book,
  });
});

exports.findOne = catchAsync(async (req, res, next) => {
  const { book } = req;

  return res.status(200).json({
    status: 'success',
    book,
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const { book } = req.body;
});

exports.delete = catchAsync(async (req, res, next) => {
  const { book } = req;
});
