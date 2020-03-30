const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { checkAuth } = require("../auth/auth");
const bookingController = require("../controllers/booking");

// Route GET /api/bookings/users/:id
// Desc  Get bookings by User
// Auth  Private
router.get("/users/:id", checkAuth, bookingController.findByUser);

// Route POST /api/bookings/ads/:id
// Desc  Create Booking
// Auth  Private
router.post(
  "/ads/:id",
  [
    checkAuth,
    check("startDate")
      .not()
      .isEmpty()
      .withMessage("Veuillez renseigner une date de départ")
      .matches(/^[0-9]{4}[\-][0-9]{2}[\-][0-9]{2}$/)
      .withMessage(
        "Veuillez renseigner un format de date de départ correcte !"
      ),
    check("endDate")
      .not()
      .isEmpty()
      .withMessage("Veuillez renseigner une date de retour")
      .matches(/^[0-9]{4}[\-][0-9]{2}[\-][0-9]{2}$/)
      .withMessage("Veuillez renseigner un format de date de retour correcte !")
  ],
  bookingController.create
);

module.exports = router;
