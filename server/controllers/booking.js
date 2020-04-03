const { validationResult } = require("express-validator");
const { Ad, User, Booking } = require("../models");

const findByUser = async (req, res) => {
  const id = +req.params.id;
  const currentUser = req.user;

  if (id !== currentUser.id) {
    return res.status(403).json({ msg: "Acces Denied" });
  }

  try {
    const bookings = await Booking.findAll({
      attributes: [
        "id",
        "startDate",
        "endDate",
        "createdAt",
        "amount",
        "remarks"
      ],
      include: [
        {
          model: Ad,
          as: "ad",
          attributes: ["id", "slug", "title", "coverImage", "price", "location"]
        }
      ],
      where: { userId: id }
    });
    return res.status(200).json(bookings);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

const create = async (req, res) => {
  const id = +req.params.id;
  const currentUser = req.user;
  const { endDate, startDate, remarks } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const ad = await Ad.findByPk(id);

    if (!ad) {
      return res.status(403).json({ msg: "Ad Not Found" });
    }

    const times = new Date(endDate).getTime() - new Date(startDate).getTime();
    const daysDuration = times / (1000 * 3600 * 24);
    console.log(daysDuration);
    const amount = daysDuration * ad.price;

    await Booking.create({
      adId: id,
      userId: currentUser.id,
      amount,
      endDate,
      startDate,
      remarks
    });
    return res.status(201).json({ msg: "Booking created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

module.exports = {
  findByUser,
  create
};
