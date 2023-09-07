const express = require("express");
const router = express.Router();
const axios = require("axios");
const { route } = require("./orderData");

router.post("/getlocation", async (req, res) => {
  try {
    let lat = req.body.latlong.lat;
    let long = req.body.latlong.long;
    console.log(lat, long);
    let location = await axios
      .get(
        "https://api.opencagedata.com/geocode/v1/json?q=" +
          lat +
          "+" +
          long +
          "&key=74c89b3be64946ac96d777d08b878d43"
      )
      .then(async (res) => {
        // console.log(`statusCode: ${res.status}`)
        console.log(res.data.results);
        // let response = stringify(res)
        // response = await JSON.parse(response)
        let response = res.data.results[0].components;
        console.log(response);
        let { road, suburb, city, country, state_district, postcode } =
          response;
        return String(
          road +
            "," +
            suburb +
            "," +
            city +
            "," +
            state_district +
            "," +
            country +
            "," +
            "\n" +
            postcode
        );
      })
      .catch((error) => {
        console.error(error);
      });
    res.send({ location });
  } catch (error) {
    console.error(error.message);
    res.send("Server Error");
  }
});

module.exports = router;
