const express = require("express");
const router = express.Router();
const Orders = require("../Models/Orders");

router.post("/myOrders", async (req, res) => {
  try {
    let data = req.body.order_data;
    await data.splice(0, 0, { order_date: req.body.order_date });

    console.log("cart data: " + data);
    console.log(req.body);

    let eId = await Orders.findOne({ email: req.body.email });
    console.log(eId);
    if (eId === null) {
      await Orders.create({
        email: req.body.email,
        order_data: [data],
      }).then(() => {
        res.json({ success: true });
      });
    } else {
      try {
        await Orders.findOneAndUpdate(
          {
            email: req.body.email,
          },
          { $push: { order_data: data } }
        ).then((response) => {
          console.log(response);
          res.json({ success: true });
        });
      } catch (err) {
        res.send("Server Error", err.message);
      }
    }
  } catch (err) {
    res.json({ success: false });
  }
});

module.exports = router;
