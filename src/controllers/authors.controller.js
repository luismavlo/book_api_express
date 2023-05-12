const catchAsync = require('./../utils/catchAsync');
const AuthorsServices = require('./../services/authors.service');

const authorsServices = new AuthorsServices();

exports.findAll = catchAsync(async (req, res, next) => {
  const authors = await authorsServices.findAll();

  return res.status(200).json({
    status: 'success',
    results: authors.length,
    authors,
  });
});

exports.create = catchAsync(async (req, res, next) => {
  const { name, surname, birthdate, biography, photo } = req.body;

  const author = await authorsServices.create({
    name,
    surname,
    birthdate,
    biography,
    photo,
  });

  return res.status(201).json({
    status: 'success',
    message: 'The author has been created 👌',
    author,
  });
});

exports.findOne = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const author = await authorsServices.findOne(id);

  return res.status(200).json({
    status: 'success',
    author,
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, surname, birthdate, biography } = req.body;

  const author = await authorsServices.findOne(id);

  const authorUpdated = await authorsServices.update(author, {
    name,
    surname,
    birthdate,
    biography,
  });

  return res.status(200).json({
    status: 'success',
    message: 'The author has been updated! 👌',
    authorUpdated,
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const authorDelted = await authorsServices.delete(id);

  return res.status(200).json({
    status: 'success',
    message: 'The author has been deleted! 👌',
    authorDelted,
  });
});
