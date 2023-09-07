const mongoose = require("mongoose");

const uri = "mongodb://127.0.0.1:27017/goFood";

const mongodb = async () => {
  try {
    await mongoose
      .connect(uri)
      .then(() => {
        console.log("conncected to mongodb");
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log("connected successfully");
    const fetched_data = await mongoose.connection.db.collection("foodData");

    // console.log(fetched_data);

    const data = fetched_data
      .find({})
      .toArray()
      .then(async (data) => {
        // console.log(data);

        const foodCategory = await mongoose.connection.db.collection(
          "foodCategory"
        );

        foodCategory
          .find({})
          .toArray()
          .then((catData) => {
            global.foodCategory = catData;
          });
        global.food_items = data;
      })
      .catch((err) => {
        console.log(err);
      });

    // fetching orders history

    // const fetched_order_data = await mongoose.connection.db.collection(
    //   "orders"
    // );

    // fetched_order_data
    //   .find({})
    //   .toArray()
    //   .then((data) => {
    //     global.orderData = data;
    //   });

    // console.log(data);
  } catch (err) {
    console.log("something went wrong", err);
  }
};
// console.log("connected successfully");

module.exports = mongodb;
