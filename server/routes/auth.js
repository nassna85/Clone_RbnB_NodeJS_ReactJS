const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const authController = require("../controllers/auth");

// Route POST /api/auth/registration
// Desc  Create a new User
// Auth  Public
router.post(
  "/registration",
  [
    check("firstName", "Veuillez renseigner votre prénom !")
      .not()
      .isEmpty(),
    check("lastName", "Veuillez renseigner votre nom !")
      .not()
      .isEmpty(),
    check("email", "Veuillez renseigner votre adresse email !")
      .not()
      .isEmpty(),
    check("introduction", "Veuillez renseigner une introduction !")
      .not()
      .isEmpty(),
    check("description", "Veuillez renseigner une description !")
      .not()
      .isEmpty(),
    check("password", "Veuillez renseigner un mot de passe !")
      .not()
      .isEmpty(),
    check(
      "password",
      "Votre mot de passe doit contenir au moins 6 caractères et au maximum 15, contenant des chiffres ou des lettres !"
    ).matches(/^[a-zéèàîïêë0-9]{6,15}$/i),
    check(
      "firstName",
      "Votre prénom ne doit contenir que des lettres compris entre 2 et 30 caractères !"
    ).matches(/^[a-zéèàîïêë(\-)?]{2,30}$/i),
    check(
      "lastName",
      "Votre nom ne doit contenir que des lettres compris entre 2 et 30 caractères !"
    ).matches(/^[a-zéèàîïêë(\-)?]{2,30}$/i),
    check(
      "email",
      "Veuillez renseigner une adresse email correcte !"
    ).isEmail(),
    check(
      "introduction",
      "Votre introduction doit contenir au moins 10 caractères et au maximum 255 !"
    ).isLength({ min: 10, max: 255 }),
    check(
      "description",
      "Votre description doit contenir au moins 30 caractères !"
    ).isLength({ min: 30 }),
  ],
  authController.registration
);

// Route POST /api/auth/login
// Desc  User Login
// Auth  Public
router.post(
  "/login",
  [
    check("email", "Veuillez renseigner une adresse email !")
      .not()
      .isEmpty(),
    check("password", "Veuillez renseigner un mot de passe !")
      .not()
      .isEmpty()
  ],
  authController.login
);

module.exports = router;
