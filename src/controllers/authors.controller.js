const catchAsync = require('./../utils/catchAsync');
const AuthorsServices = require('./../services/authors.service');

const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');

//utils
const { storage } = require('./../utils/firebase');

const authorsServices = new AuthorsServices();

exports.findAll = catchAsync(async (req, res, next) => {
  const authors = await authorsServices.findAll();

  const authorsPromises = authors.map(async (author) => {
    const imgRef = ref(storage, author.photo);
    const url = await getDownloadURL(imgRef);

    author.photo = url;
    return author;
  });

  const authorsResolved = await Promise.all(authorsPromises);

  return res.status(200).json({
    status: 'success',
    results: authors.length,
    authors: authorsResolved,
  });
});

exports.create = catchAsync(async (req, res, next) => {
  const { name, surname, birthdate, biography } = req.body;

  const imgRef = ref(storage, `authors/${Date.now()}-${req.file.originalname}`);
  const imgUploaded = await uploadBytes(imgRef, req.file.buffer);

  const author = await authorsServices.create({
    name,
    surname,
    birthdate,
    biography,
    photo: imgUploaded.metadata.fullPath,
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

  const imgRef = ref(storage, author.photo);
  const url = await getDownloadURL(imgRef);

  author.photo = url;

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
