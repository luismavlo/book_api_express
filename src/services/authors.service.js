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

  async delete(authorId) {
    //buscar el author que voy a eliminar
    const author = await this.findOne(authorId);

    //actualizar el status del author a eliminar a false
    return await author.update({ status: false });
  }
}

module.exports = AuthorsServices;
