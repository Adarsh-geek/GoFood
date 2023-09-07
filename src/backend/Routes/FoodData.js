const express = require("express");
const router = express.Router();
const User = require("../Models/user");

router.post("/foodData", async (req, res) => {
  try {
    console.log(global.food_items);
    res.send([global.food_items, global.foodCategory]);
  } catch (err) {
    console.error(err.message);
    res.send("Server Error");
  }
});

module.exports = router;
