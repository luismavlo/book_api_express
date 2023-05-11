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
}

module.exports = AuthorsServices;
