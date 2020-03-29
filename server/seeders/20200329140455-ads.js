"use strict";
const faker = require("faker");
const { slugify } = require("../helpers/slugify");

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [];
    let count = 30;

    while (count--) {
      data.push({
        userId: faker.random.number({ min: 1, max: 30, precision: 1 }),
        title: faker.lorem.sentence(4),
        slug: slugify("test de slugify"),
        price: faker.random.number({ min: 50, max: 250, precision: 1 }),
        introduction: faker.lorem.sentence(25),
        description: faker.lorem.sentence(100),
        rooms: faker.random.number({ min: 1, max: 9, precision: 1 }),
        coverImage: faker.image.imageUrl(),
        location: faker.address.country(),
        createdAt: new Date()
      });
    }
    return queryInterface.bulkInsert("ads", data, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("ads", null, {});
  }
};
