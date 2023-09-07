const express = require("express");
const mongo = require("./db.js");

mongo();

const cors = require("cors");

const app = express();
const port = 5000;

// to allow CORS policy
app.use(cors());

app.use(function (req, res, next) {
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "POST");
  next();
});

app.use(express.json());

app.use("/api", require("./Routes/createUser.js"));
app.use("/api", require("./Routes/loginUser.js"));
app.use("/api", require("./Routes/FoodData.js"));
app.use("/api", require("./Routes/myOrders.js"));
app.use("/api", require("./Routes/orderData.js"));
app.use("/api", require("./Routes/findLocation.js"));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, (err) => {
  if (err) {
    console.log("Something went wrong", err);
  } else {
    console.log(`Listening on port ${port}`);
  }
});
