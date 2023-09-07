/*Need to install express validators to validate the data that is coming in req body is safe to enter into database*/

const express = require("express");
const router = express.Router();
const User = require("../Models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "MyNameIsAdarshKumar$2";

/*Using validator */

const { body, validationResult } = require("express-validator");

router.post(
  "/loginUser",
  [
    body("email").isEmail(),
    body("password", "Invalid length").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ error: err.array() });
    }
    try {
      let email = req.body.email;
      let userData = await User.findOne({ email });

      console.log(userData);

      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Try logging with valid credentials" });
      }

      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        userData.password
      );

      console.log(isPasswordValid);

      if (!isPasswordValid) {
        return res
          .status(400)
          .json({ errors: "Try logging with valid credentials" });
      }

      const data = {
        user: {
          id: userData.id,
        },
      };

      const authToken = jwt.sign(data, jwtSecret);

      return res.json({ success: true, authToken: authToken });
    } catch (err) {
      console.log(err);
      res.json({ success: false });
    }
  }
);

module.exports = router;
