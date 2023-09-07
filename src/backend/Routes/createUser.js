/*Need to install express validators to validate the data that is coming in req body is safe to enter into database*/

const express = require("express");
const router = express.Router();
const User = require("../Models/user");
const bcrypt = require("bcryptjs");
/*Using validator */

const { body, validationResult } = require("express-validator");

router.post(
  "/createUser",
  [
    body("name").isLength({ min: 5 }),
    body("email").isEmail(),
    body("password", "Invalid length").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ error: err.array() });
    }

    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt);

    try {
      await User.create({
        name: req.body.name,
        password: secPassword,
        location: req.body.location,
        email: req.body.email,
      });
      res.json({ success: true });
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  }
);

module.exports = router;
