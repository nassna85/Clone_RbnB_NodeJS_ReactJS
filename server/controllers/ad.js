const sequelize = require("sequelize");
const { validationResult } = require("express-validator");
const { Ad, User, Comment, Booking } = require("../models");
const { slugify } = require("../helpers/slugify");

const findAll = async (req, res) => {
  try {
    const ads = await Ad.findAll({
      attributes: [
        "id",
        "slug",
        "title",
        "introduction",
        "description",
        "coverImage",
        "location",
        "price",
        "createdAt",
        [sequelize.fn("AVG", sequelize.col("comments.rating")), "avgRatings"]
      ],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["firstName", "lastName", "avatar"]
        },

        {
          model: Comment,
          as: "comments",
          attributes: []
        }
      ],
      group: ["Ad.id"]
    });
    if (!ads) {
      return res.status(400).json({ msg: "Ads Not Found" });
    }
    return res.status(200).json(ads);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

const findLastAds = async (req, res) => {
    try{
      const ads = await Ad.findAll({
        order: [
          ["createdAt", "DESC"]
        ],
        limit: 3,
        attributes: [
            "id",
            "title",
            "coverImage",
            "price",
            "location",
            "slug",
            "createdAt",
            [sequelize.fn("AVG", sequelize.col("comments.rating")), "avgRatings"]
        ],
        include: [
          {
            //Add Duplicating because limit. If i don't use duplicating, => error
            model: Comment,
            as: "comments",
            attributes: [],
            duplicating: false
          }
        ],
        group: ["Ad.id"],
      });
      if(!ads){
        return res.status(404).json({ msg: "Ads Not Found" });
      }
      return res.status(200).json(ads);
    }catch(error){
      console.log(error);
      return res.status(500).json({ msg: "Server Error" });
    }
};

const findBestAds = async (req, res) => {
    try{
      const ads = await Ad.findAll({
        order: sequelize.literal('avgRatings DESC'),
        limit: 3,
        attributes: [
          "id",
          "title",
          "coverImage",
          "price",
          "location",
          "slug",
          "createdAt",
          [sequelize.fn("AVG", sequelize.col("comments.rating")), "avgRatings"],
        ],
        include: [
          {
            //Add Duplicating because limit. If i don't use duplicating, => error
            model: Comment,
            as: "comments",
            attributes: [],
            duplicating: false
          }
        ],
        group: ["ad.id", "comments.id"],
      });
      if(!ads){
        return res.status(404).json({ msg: "Ads Not Found" });
      }
      return res.status(200).json(ads);
    }catch(error){
      console.log(error);
      return res.status(500).json({ msg: "Server Error" });
    }
};

const findById = async (req, res) => {
  const id = +req.params.id;
  try {
    const ad = await Ad.findByPk(id, {
      attributes: [
        "id",
        "title",
        "introduction",
        "description",
        "coverImage",
        "price",
        "location",
        [sequelize.fn("AVG", sequelize.col("comments.rating")), "avgRatings"]
      ],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "firstName", "lastName", "introduction", "avatar"]
        },
        {
          model: Comment,
          as: "comments",
          attributes: []
        }
      ],
      group: ["Ad.id"]
    });
    if (!ad) {
      return res.status(404).json({ msg: "Ad Not Found" });
    }
    return res.status(200).json(ad);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

const findByUser = async (req, res) => {
  const id = +req.params.id;
  const currentUser = req.user;

  if (id !== currentUser.id) {
    return res.status(403).json({ msg: "Access Denied" });
  }

  try {
    const ads = await Ad.findAll({
      attributes: [
        "id",
        "title",
        "coverImage",
        "price",
        "location",
        [sequelize.fn("AVG", sequelize.col("comments.rating")), "avgRatings"]
      ],
      include: [
        {
          model: Comment,
          as: "comments",
          attributes: []
        }
      ],
      group: ["Ad.id"],
      where: { userId: id }
    });
    return res.status(200).json(ads);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

const create = async (req, res) => {
  const currentUser = req.user;
  const errors = validationResult(req);
  const {
    title,
    price,
    introduction,
    description,
    coverImage,
    rooms,
    location
  } = req.body;

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    await Ad.create({
      userId: currentUser.id,
      title,
      slug: slugify(title),
      price,
      introduction,
      description,
      coverImage,
      rooms,
      location
    });
    return res.status(201).json({ msg: "Ad created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

const update = async (req, res) => {
  const id = +req.params.id;
  const currentUser = req.user;
  const errors = validationResult(req);
  const {
    title,
    price,
    introduction,
    description,
    coverImage,
    rooms,
    location
  } = req.body;
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const ad = await Ad.findByPk(id);
    if (!ad) {
      return res.status(404).json({ msg: "Ad Not Found" });
    }
    if (currentUser.id !== ad.userId) {
      return res.status(403).json({ msg: "Acces Denied" });
    }

    await Ad.update(
      {
        userId: currentUser.id,
        title,
        slug: slugify(title),
        price,
        introduction,
        description,
        coverImage,
        rooms,
        location
      },
      {
        where: {
          id
        }
      }
    );
    return res.status(200).json({ msg: "Ad Updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

const destroy = async (req, res) => {
  const id = +req.params.id;
  const currentUser = req.user;

  try {
    const ad = await Ad.findByPk(id);

    if (!ad) {
      return res.status(404).json({ msg: "Ad Not Found" });
    }
    if (ad.userId !== currentUser.id) {
      return res.status(403).json({ msg: "Acces Denied" });
    }

    const bookings = await Booking.findAll({
      where: {
        adId: ad.id
      }
    });

    if (bookings.length > 0) {
      return res.status(401).json({
        msg:
          "Vous ne pouvez pas supprimer une annonce qui contient des réservations"
      });
    }

    await Ad.destroy({
      where: { id: ad.id }
    });
    return res.status(200).json({ msg: "Ad Deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  destroy,
  findByUser,
  findLastAds,
  findBestAds
};
