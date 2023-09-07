const express = require("express");
const router = express.Router();
const Orders = require("../Models/Orders");

router.post("/orderData", async (req, res) => {
  try {
    const userEmail = req.body.email;
    const order_data = await Orders.findOne({ email: userEmail });
    await res.status(200).send(order_data);
  } catch (err) {
    console.log(err);
    res.send("Server Error: " + err.message);
  }
});

module.exports = router;
