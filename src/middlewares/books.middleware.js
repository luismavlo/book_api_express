const db = require('../database/models');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.existBook = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const book = await db.Books.findOne({
    where: {
      status: true,
      id,
    },
  });

  if (!book)
    return next(new AppError(`The book with id: ${id} not found`, 404));

  req.book = book;
  next();
});
