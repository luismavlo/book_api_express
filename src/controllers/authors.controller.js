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

exports.create = catchAsync(async (req, res, next) => {});
exports.findOne = catchAsync(async (req, res, next) => {});
exports.update = catchAsync(async (req, res, next) => {});
exports.delete = catchAsync(async (req, res, next) => {});
