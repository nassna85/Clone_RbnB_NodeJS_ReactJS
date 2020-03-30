const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { checkAuth } = require("../auth/auth");
const adController = require("../controllers/ad");

// Route GET /api/ads
// Desc  Get all ads
// Auth  Public
router.get("/", adController.findAll);

// Route GET /api/ads/:id
// Desc  Get Ad by ID
// Auth  Public
router.get("/:id", adController.findById);

// Route POST /api/ads
// Desc  Create a Ad
// Auth  Private
router.post(
  "/",
  [
    checkAuth,
    check("title", "Veuillez renseigner un titre à votre annonce !")
      .not()
      .isEmpty(),
    check("price", "Veuillez renseigner un prix à votre annonce !")
      .not()
      .isEmpty(),
    check(
      "introduction",
      "Veuillez renseigner une introduction à votre annonce !"
    )
      .not()
      .isEmpty(),
    check(
      "description",
      "Veuillez renseigner une description à votre annonce !"
    )
      .not()
      .isEmpty(),
    check(
      "coverImage",
      "Veuillez indiquer une image principale à votre annonce !"
    )
      .not()
      .isEmpty(),
    check(
      "rooms",
      "Veuillez renseigner le nombre de chambre de votre annonce !"
    )
      .not()
      .isEmpty(),
    check("location", "Veuillez renseigner la localisation de votre annonce !")
      .not()
      .isEmpty(),
    check(
      "title",
      "Le titre doit contenir au maximum 255 caractères !"
    ).isLength({ max: 255 }),
    check("price", "Le prix doit être un nombre !").isNumeric(),
    check(
      "introduction",
      "L'introduction doit contenir au maximum 255 caractères !"
    ).isLength({ max: 255 }),
    check(
      "description",
      "La description doit contenir au minimum 30 caractères !"
    ).isLength({ min: 30 }),
    check(
      "rooms",
      "Le prix doit être un nombre compris entre 1 et 9 !"
    ).matches(/^[1-9]{1}$/),
    check(
      "location",
      "La localisation doit contenir au maximum 255 caractères !"
    ).isLength({ max: 255 })
  ],
  adController.create
);

// Route PUT /api/ads/:id
// Desc  Update Ad By ID
// Auth  Private
router.put(
  "/:id",
  [
    checkAuth,
    check("title", "Veuillez renseigner un titre à votre annonce !")
      .not()
      .isEmpty(),
    check("price", "Veuillez renseigner un prix à votre annonce !")
      .not()
      .isEmpty(),
    check(
      "introduction",
      "Veuillez renseigner une introduction à votre annonce !"
    )
      .not()
      .isEmpty(),
    check(
      "description",
      "Veuillez renseigner une description à votre annonce !"
    )
      .not()
      .isEmpty(),
    check(
      "coverImage",
      "Veuillez indiquer une image principale à votre annonce !"
    )
      .not()
      .isEmpty(),
    check(
      "rooms",
      "Veuillez renseigner le nombre de chambre de votre annonce !"
    )
      .not()
      .isEmpty(),
    check("location", "Veuillez renseigner la localisation de votre annonce !")
      .not()
      .isEmpty(),
    check(
      "title",
      "Le titre doit contenir au maximum 255 caractères !"
    ).isLength({ max: 255 }),
    check("price", "Le prix doit être un nombre !").isNumeric(),
    check(
      "introduction",
      "L'introduction doit contenir au maximum 255 caractères !"
    ).isLength({ max: 255 }),
    check(
      "description",
      "La description doit contenir au minimum 30 caractères !"
    ).isLength({ min: 30 }),
    check(
      "rooms",
      "Le prix doit être un nombre compris entre 1 et 9 !"
    ).matches(/^[1-9]{1}$/),
    check(
      "location",
      "La localisation doit contenir au maximum 255 caractères !"
    ).isLength({ max: 255 })
  ],
  adController.update
);

// Route DELETE /api/ads/:id
// Desc  Delete Ad By ID
// Auth  Private
router.delete("/:id", checkAuth, adController.destroy);

module.exports = router;
