const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { checkAuth, checkRoleAdmin } = require("../auth/auth");
const commentController = require("../controllers/comment");

// Route GET /api/comments
// Desc  Get all comments
// Auth  Private & only Admin
router.get("/", checkRoleAdmin, commentController.findAll);

// Route GET /api/comments/ads/:id
// Desc  Get all comments By Ad
// Auth  Public
router.get("/ads/:id", commentController.findByAd);

// Route POST /api/comments/ads/:id
// Desc  Create a comment for Ad
// Auth  Private
router.post(
  "/ads/:id",
  [
    checkAuth,
    check("rating")
      .not()
      .isEmpty()
      .withMessage("Veuillez renseigner une note !")
      .matches(/^[1-5]{1}$/)
      .withMessage("Votre note doit être compris entre 1 et 5 !"),
    check("message")
      .not()
      .isEmpty()
      .withMessage("Veuillez renseigner un commentaire !")
      .isLength({ min: 5 })
      .withMessage("Votre commentaire doit contenir au moins 5 caractères !")
  ],
  commentController.create
);

module.exports = router;
