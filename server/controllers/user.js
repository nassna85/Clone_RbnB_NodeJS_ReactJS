const { validationResult } = require("express-validator");
const { User, Ad, Booking } = require("../models");

const findAll = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: [
        "id",
        "firstName",
        "lastName",
        "email",
        "avatar",
        "introduction",
        "description"
      ],
      include: [
        {
          model: Ad,
          as: "ads",
          attributes: [
            "id",
            "title",
            "introduction",
            "description",
            "price",
            "location"
          ]
        }
      ]
    });
    if (!users) {
      return res.status(404).json({ msg: "Users Not Found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

const findByIdForPublic = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByPk(id, {
      attributes: [
        "id",
        "firstName",
        "lastName",
        "avatar",
        "introduction",
        "description"
      ],
      include: [
        {
          model: Ad,
          as: "ads",
          attributes: ["id", "title", "coverImage", "price", "location"]
        }
      ]
    });
    if (!user) {
      return res.status(404).json({ msg: "User Not Found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

const findById = async (req, res) => {
  const id = +req.params.id;
  const currentUser = req.user;

  if (id !== currentUser.user.id) {
    return res.status(403).json({ msg: "Acces Denied" });
  }
  try {
    const user = await User.findByPk(id, {
      attributes: [
        "id",
        "firstName",
        "lastName",
        "email",
        "avatar",
        "introduction",
        "description"
      ]
    });

    if (!user) {
      return res.status(404).json({ msg: "User Not Found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

const update = async (req, res) => {
  const id = +req.params.id;
  const currentUser = req.user;

  if (id !== currentUser.id) {
    return res.status(403).json({ msg: "Acces Denied" });
  }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    firstName,
    lastName,
    email,
    avatar,
    introduction,
    description
  } = req.body;
  try {
    await User.update(
      {
        firstName,
        lastName,
        email,
        avatar,
        introduction,
        description,
        updatedAt: new Date()
      },
      {
        where: { id }
      }
    );
    return res.status(200).json({ msg: "User Updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

const destroy = async (req, res) => {
  const id = +req.params.id;
  const currentUser = req.user;
  try {
    if (id !== currentUser.id) {
      return res.status(403).json({ msg: "Acces Denied" });
    }

    const user = await User.findByPk(currentUser.id);

    if (!user) {
      return res.status(400).json({ msg: "User Not Found" });
    }

    //TODO => foreignKey delete problem !!
    await Ad.destroy({
      where: { userId: [currentUser.id] }
    });

    await Comment.destroy({
      where: { userId: [currentUser.id] }
    });

    await Booking.destroy({
      where: { userId: [currentUser.id] }
    });

    await User.destroy(user);

    return res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

module.exports = {
  findAll,
  findByIdForPublic,
  findById,
  update,
  destroy
};
