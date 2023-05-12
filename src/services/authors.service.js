const AppError = require('../utils/appError');
const db = require('./../database/models/index');

class AuthorsServices {
  async findAll() {
    const authors = await db.Author.findAll({
      where: {
        status: true,
      },
    });

    return authors;
  }

  async create(authorData) {
    return await db.Author.create(authorData);
  }

  async findOne(authorId) {
    const author = await db.Author.findOne({
      where: {
        id: authorId,
        status: true,
      },
    });

    if (!author) throw new AppError(`User with id: ${authorId} not found`, 404);

    return author;
  }

  async update(author, authorData) {
    return await author.update(authorData);
  }
}

module.exports = AuthorsServices;
