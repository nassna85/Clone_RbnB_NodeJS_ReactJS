"use strict";
const faker = require("faker");
const { getHash } = require("../helpers/hashPassword");

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [];
    let count = 30;

    while (count--) {
      data.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        isAdmin: 0,
        introduction: faker.lorem.sentence(25),
        description: faker.lorem.sentence(60),
        password: getHash("password"),
        avatar: faker.image.avatar(),
        createdAt: new Date()
      });
    }
    return queryInterface.bulkInsert("users", data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  }
};
