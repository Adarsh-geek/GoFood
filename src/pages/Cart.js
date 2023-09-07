import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart, useDispatch } from "../components/CartContext";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import { Modal } from "react-bootstrap";
import trash from "../trash.svg";

function Cart() {
  let cartItem = useCart();
  let dispatch = useDispatch();

  //   const [quantity, setQuantity] = useState(1);
  const [show, setShow] = useState(false);
  const [size, setSize] = useState("");
  const [priceOptions, setPriceOptions] = useState([]);
  const [priceOptionsID, setPriceOptionsID] = useState();
  const navigate = useNavigate();

  const handleModal = () => {
    setShow(!show);
  };

  async function handleIncreaseQuantity(id, index) {
    await console.log(id);
    await dispatch({
      type: "INCREASE_QUANTITY",
      id: id,
      index: index,
    });

    await console.log(cartItem);
  }
  async function handleDecreaseQuantity(id, index) {
    await console.log(id);
    await dispatch({
      type: "DECREASE_QUANTITY",
      id: id,
      index: index,
    });

    await console.log(cartItem);
  }

  async function handleUpdateItem(id) {
    await console.log(id);
    await dispatch({
      type: "UPDATE_SIZE",
      id: id,
      size: size,
    });

    await console.log(cartItem);
  }

  // useEffect(() => {

  // })

  let totalPrice = cartItem.reduce((total, food) => total + food.price, 0);

  /*Handling Chcekout button */
  const handleCheckout = async (e) => {
    e.preventDefault();

    let response = await fetch("http://localhost:5000/api/myOrders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("email"),
        order_data: cartItem,
        order_date: new Date().toDateString(),
      }),
    })
      .then(async (response) => {
        console.log(response);
        if (response.status === 200) {
          alert("order placed successfully");
          await dispatch({ type: "DROP" });
          // navigate("/");
        } else {
          alert("Something went wrong");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // console.log(response.json());
  };
  return (
    <div>
      {/* <Navbar /> */}
      {cartItem.length > 0 ? (
        <div className="container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md bg-dark">
          <table className="table table-hover">
            <thead className=" fs-4">
              <tr>
                <th className="text-success" scope="col">
                  #
                </th>
                <th className="text-success" scope="col">
                  Name
                </th>
                <th className="text-success" scope="col">
                  Quantity
                </th>
                <th className="text-success" scope="col">
                  Option
                </th>
                <th className="text-success" scope="col">
                  Amount
                </th>
                <th className="text-success" scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {cartItem.map((item, index) => {
                /*Table logic*/

                return (
                  <tr className="bg-dark">
                    <th scope="row">{index + 1}</th>
                    <td>{item.name}</td>
                    <td>
                      <button
                        className="text-grey border-0 bg-white fs-4"
                        onClick={() => {
                          handleDecreaseQuantity(item.id, index);
                          console.log(item.id);
                        }}
                      >
                        -
                      </button>
                      {item.qty}
                      <button
                        className="text-success border-0 bg-white fs-4"
                        onClick={() => {
                          handleIncreaseQuantity(item.id, index);
                          console.log(item.id);
                        }}
                      >
                        +
                      </button>
                    </td>

                    <td>{item.size}</td>
                    <td>{item.price}</td>
                    <td>
                      <button
                        className="btn text-success p-0 "
                        onClick={() => {
                          dispatch({ type: "REMOVE_ITEM", index: index });
                        }}
                      >
                        <img
                          style={{
                            width: "20px",
                            height: "20px",
                            border: "0px",
                          }}
                          src={trash}
                          alt="delete"
                        />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="text-white fw-bold"> Total Price : {totalPrice} </p>
          <button
            className="btn btn-success"
            onClick={(e) => {
              handleCheckout(e);
            }}
          >
            Checkout
          </button>
        </div>
      ) : (
        <h3 className="m-4 text-success text-center">
          Sorry!Your Cart is Empty.{" "}
        </h3>
      )}
    </div>
  );
}

export default Cart;
