const db = require('../database/models');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');

//utils
const { storage } = require('./../utils/firebase');

exports.findAll = catchAsync(async (req, res, next) => {
  const books = await db.Books.findAll({
    where: {
      status: true,
    },
    include: [
      {
        model: db.ImgsBooks,
      },
    ],
  });

  //recorri los libros encontrados
  const booksPromises = books.map(async (book) => {
    //cada libro tiene una propiedad que es un arreglo donde almacena las imagenes
    //tengo que recorrerla
    const booksImgsPromises = book.ImgsBooks.map(async (bookImg) => {
      const imgRef = ref(storage, bookImg.imgs_books_url);
      const url = await getDownloadURL(imgRef);

      bookImg.imgs_books_url = url;
      return bookImg;
    });
    //ahora tengo que resolver las promesas del map, con el objetivo
    //de reasignar su valor
    const booksImgsResolved = await Promise.all(booksImgsPromises);

    book.ImgsBooks = booksImgsResolved;

    return book;
  });

  const booksResolved = await Promise.all(booksPromises);

  return res.status(200).json({
    status: 'success',
    results: books.length,
    books: booksResolved,
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

  const booksImgsPromises = req.files.map(async (file) => {
    const imgRef = ref(storage, `books/${Date.now()}-${file.originalname}`);
    const imgUploaded = await uploadBytes(imgRef, file.buffer);

    return await db.ImgsBooks.create({
      imgs_books_url: imgUploaded.metadata.fullPath,
      book_id: book.id,
    });
  });

  await Promise.all(booksImgsPromises);

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
  const { book } = req;
  const { editorial, score } = req.body;

  await book.update({ editorial, score });

  return res.status(200).json({
    status: 'success',
    message: 'The book has been updated! 😎 ',
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  const { book } = req;

  await book.update({ status: false });

  return res.status(200).json({
    status: 'success',
    message: 'The book has been deleted! 😎 ',
  });
});
