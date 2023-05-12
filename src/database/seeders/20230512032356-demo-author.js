'use strict';
const moment = require('moment');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Authors',
      [
        {
          name: 'Carloz',
          surname: 'Ruiz Zafon',
          birthdate: '1970-10-05T00:00:00.000Z',
          biography: 'El mejor escritor de la historia de españa',
          photo: 'asdasdasdasdasdasd',
          createdAt: moment().format('YYYY-MM-DD'),
          updatedAt: moment().format('YYYY-MM-DD'),
        },
        {
          name: 'Patrick',
          surname: 'Rotfuss',
          birthdate: '1960-10-05T00:00:00.000Z',
          biography: 'Tiene libros muy buenos :D',
          photo: 'asdasdasdasdasdasd',
          createdAt: moment().format('YYYY-MM-DD'),
          updatedAt: moment().format('YYYY-MM-DD'),
        },
        {
          name: 'Gabriel',
          surname: 'Garcia Marquez',
          birthdate: '1975-05-05T00:00:00.000Z',
          biography: 'Autor colombiano famoso por su genero de fantasia epica',
          photo: 'asdasdasdasdasdasd',
          createdAt: moment().format('YYYY-MM-DD'),
          updatedAt: moment().format('YYYY-MM-DD'),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Authors', null, {});
  },
};
