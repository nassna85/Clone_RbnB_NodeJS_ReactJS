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
        startDate: faker.date.between("2019-01-01", "2019-01-20"),
        endDate: faker.date.between("2019-01-23", "2019-02-05"),
        amount: faker.finance.amount(700, 1500, 2),
        remarks: faker.lorem.sentence(30),
        createdAt: new Date()
      });
    }
    return queryInterface.bulkInsert("bookings", data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("bookings", null, {});
  }
};
