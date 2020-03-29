"use strict";
const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [];
    let count = 50;

    while (count--) {
      data.push({
        userId: faker.random.number({ min: 1, max: 30, precision: 1 }),
        adId: faker.random.number({ min: 1, max: 30, precision: 1 }),
        rating: faker.random.number({ min: 1, max: 5, precision: 1 }),
        message: faker.lorem.sentence(30),
        createdAt: new Date()
      });
    }
    return queryInterface.bulkInsert("comments", data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("comments", null, {});
  }
};
