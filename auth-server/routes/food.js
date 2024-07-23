const express = require("express");

const protect = require("../middleware/authMiddleware");
const {
  createFood,
  getAllFood,
  getFoodById,
  getNewFood,
} = require("../controller/food");

const router = express.Router();

router.post("/addfood", protect, createFood);
router.get("/getAllFood", getAllFood);
router.get("/getFood/:id", getFoodById);
router.get("/getNewFood", getNewFood);

module.exports = router;
