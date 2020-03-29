"use strict";
module.exports = (sequelize, DataTypes) => {
  const Ad = sequelize.define(
    "Ad",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      introduction: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      coverImage: {
        type: DataTypes.STRING,
        allowNull: false
      },
      rooms: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {}
  );
  Ad.associate = function(models) {
    // associations can be defined here
    Ad.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
      allowNull: false
    });
    Ad.hasMany(models.Comment, { as: "comments" });
    Ad.hasMany(models.Booking, { as: "bookings" });
  };
  return Ad;
};
