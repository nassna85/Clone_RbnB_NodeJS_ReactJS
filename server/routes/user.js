const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const userController = require("../controllers/user");

// Route GET /api/users
// Desc  Get all users
// Auth  Private only Admin
router.get("/", userController.findAll);

// Route GET /api/users/informations/:id
// Desc  Get user with informations
// Auth  Public
router.get("/informations/:id", userController.findByIdForPublic);

// Route GET /api/users/:id
// Desc  Get user by ID
// Auth  Private
router.get("/:id", userController.findById);

// Route PUT /api/users/:id
// Desc  Update User by ID
// Auth  Private
router.put(
  "/:id",
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
    ).isLength({ min: 30 })
  ],
  userController.update
);

module.exports = router;
