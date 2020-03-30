const { validationResult } = require("express-validator");
const { Ad, User, Comment } = require("../models");

const findAll = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      attributes: ["id", "rating", "message", "createdAt"],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "firstName", "lastName", "email"]
        },
        {
          model: Ad,
          as: "ad",
          attributes: ["id", "title"]
        }
      ]
    });
    if (comments.length < 1) {
      return res.status(404).json({ msg: "Comments Not Found" });
    }

    return res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

const findByAd = async (req, res) => {
  const id = +req.params.id;
  try {
    const comments = await Comment.findAll({
      attributes: ["id", "rating", "message", "createdAt"],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "firstName", "lastName", "avatar"]
        }
      ],
      where: { adId: id }
    });

    return res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

const create = async (req, res) => {
  const id = +req.params.id;
  const currentUser = req.user;
  const { rating, message } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const ad = await Ad.findByPk(id);
  if (!ad) {
    return res.status(400).json({ msg: "Ad Not Found" });
  }

  await Comment.create({
    rating,
    message,
    userId: currentUser.id,
    adId: ad.id
  });

  return res.status(201).json({ msg: "Comment created successfully" });
};

module.exports = {
  findAll,
  findByAd,
  create
};
