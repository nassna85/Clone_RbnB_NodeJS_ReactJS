"use strict";
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define(
    "Booking",
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      adId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      startDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      remarks: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    { timestamps: false },
    {}
  );
  Booking.associate = function(models) {
    // associations can be defined here
    Booking.belongsTo(models.Ad, {
      foreignKey: "adId",
      as: "ad",
      allowNull: false
    });
    Booking.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
      allowNull: false
    });
  };
  return Booking;
};
