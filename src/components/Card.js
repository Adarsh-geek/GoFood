import React, { useState, useRef, useEffect } from "react";
import { useCart, useDispatch } from "./CartContext";

function Card(props) {
  let priceOptions = Object.keys(props.option);
  let options = props.option;
  let dispatch = useDispatch();

  // console.log(priceOptions);

  const data = useCart();
  const priceRef = useRef();

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const handleAddToCart = async () => {
    let food = [];

    console.log(data);

    for (let item of data) {
      if (item.id === props.foodItems._id && item.size === size) {
        food = item;
        console.log(food);
        break;
      }
    }

    console.log(food);

    if (food !== []) {
      if (food.size === size) {
        console.log(food.CategoryName + " " + size);
        await dispatch({
          type: "UPDATE_QTY",
          id: props.foodItems._id,
          qty: qty,
          price: totalPrice,
          size: size,
        });
        return;
      } else if (food.size != size) {
        await dispatch({
          type: "ADD",
          id: props.foodItems._id,
          image: props.foodItems.img,
          category: props.foodItems.CategoryName,
          name: props.foodItems.name,
          desc: props.foodItems.description,
          price: totalPrice,
          qty: qty,
          size: size,
          priceByOption: options[size],
        });
        return;
      }
    }
  };

  let totalPrice = qty * parseInt(options[size]);

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div className="m-3 ">
      <div
        className="card mt-3"
        style={{
          width: "18rem",
          maxHeight: "450px",
        }}
      >
        <img
          src={props.foodItems.img}
          style={{ objectFit: "fill", height: "150px" }}
          className="card-img-top w-100"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItems.name}</h5>
          <p className="card-text">{props.foodItems.description}</p>
          <div className=" m-2 w-100">
            <select
              className="m-2 h-100 bg-success"
              onChange={(e) => {
                setQty(e.target.value);
              }}
            >
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-100 bg-success"
              ref={priceRef}
              onChange={(e) => {
                setSize(e.target.value);
              }}
            >
              {priceOptions.map((option) => {
                return (
                  <option key={option} value={option}>
                    {option}
                  </option>
                );
              })}{" "}
            </select>
            <div className="d-inline fs-5"> ₹{totalPrice}</div>
            <hr />
            <button
              className="btn btn-success justify-center ms-2"
              onClick={() => {
                handleAddToCart();
                alert("Successfully added to cart");
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
