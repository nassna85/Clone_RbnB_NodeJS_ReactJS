const bcrypt = require("bcrypt");
const uniqid = require("uniqid");
const { getHash } = require("../helpers/hashPassword");
const { generateToken } = require("../helpers/generateToken");
const { validationResult } = require("express-validator");
const { User } = require("../models");

const registration = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
    introduction,
    description,
    avatar
  } = req.body;

  if (password !== passwordConfirm) {
    return res.status(400).json({
      errors: [
        {
          msg: "Vos deux mot de passe ne correspondent pas !",
          param: "password"
        }
      ]
    });
  }

  try {
    const user = await User.findOne({
      where: {
        email
      }
    });
    if (user) {
      return res.status(400).json({
        errors: [{ msg: "Cette adresse email existe déjà !", param: "email" }]
      });
    }

    //Gérer le problème ici req.files undefined
    if(req.files === null){
      return res.status(400).json({
        errors: [
          {
            msg: "Veuillez insérer un avatar !",
            param: "avatar"
          }
        ]
      });
    }
    console.log(req.files);

    const file = req.files.avatar;
    const filename = uniqid(undefined, "-" + file.name);
    file.mv(`~/client/src/uploads/avatar/${filename}`, err => {
        if(err){
          console.log(err);
          return res.status(500).json({ msg: "Server Error" });
        }
    });
    await User.create({
      firstName,
      lastName,
      email,
      password: getHash(password),
      introduction,
      description,
      avatar: filename,
      isAdmin: 0
    });
    return res.status(201).json({ msg: "User created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

const login = async (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const user = await User.findOne({
      where: { email }
    });
    if (!user) {
      return res.status(400).json({
        errors: [{ msg: "Email ou mot de passe incorrect !" }]
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Email ou mot de passe incorrect !" }] });
    }
    //Validation passed
    const payload = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.isAdmin
    };
    generateToken(payload, (error, token) => {
      if (error) throw error;
      res.json({ token });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Server Error" });
  }
};

module.exports = {
  registration,
  login
};
