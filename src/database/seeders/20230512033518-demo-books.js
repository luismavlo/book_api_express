'use strict';
const moment = require('moment');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Books',
      [
        {
          title: 'libro 3',
          synopsis: 'Libro que trata de escritores malditos',
          number_pages: 630,
          editorial: 'planeta',
          publication_date: '2011-02-02',
          score: 5,
          author_id: 1,
          createdAt: moment().format('YYYY-MM-DD'),
          updatedAt: moment().format('YYYY-MM-DD'),
        },
        {
          title: 'libro 2',
          synopsis: 'Libro de fantasia epica de una persona que narra su vida',
          number_pages: 850,
          editorial: 'planeta',
          publication_date: '2011-02-02',
          score: 5,
          author_id: 2,
          createdAt: moment().format('YYYY-MM-DD'),
          updatedAt: moment().format('YYYY-MM-DD'),
        },
        {
          title: 'libro 1',
          synopsis: 'Libro de un coronel que no tenian quien le escribiese',
          number_pages: 300,
          editorial: 'planeta',
          publication_date: '2011-02-02',
          score: 5,
          author_id: 3,
          createdAt: moment().format('YYYY-MM-DD'),
          updatedAt: moment().format('YYYY-MM-DD'),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Books', null, {});
  },
};
