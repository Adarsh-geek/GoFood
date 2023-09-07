import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MyOrders() {
  const [orderData, setOrderData] = useState({});

  const loadMyOrdersData = async () => {
    let response = await fetch("http://localhost:5000/api/orderData", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("email"),
      }),
    });
    let res = await response.json();
    console.log(response);
    console.log(res);
    await setOrderData(res);
    console.log(orderData);
  };

  useEffect(() => {
    loadMyOrdersData();
  }, []);

  // order_data = orders.filter((item) => {
  //   return item.length > 0;
  // });

  // for (const item of orders) {
  //   if (item.length > 0) {
  //     order_data.push(item);
  //   }
  // }

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="container">
        <div className="row">
          {orderData !== {} ? (
            Array(orderData).map((data) => {
              console.log(orderData);
              console.log(data);
              return data.order_data ? (
                data.order_data
                  .slice(0)
                  .reverse()
                  .map((item) => {
                    console.log(item);
                    return item.map((arrayData) => {
                      console.log(arrayData);
                      return (
                        <div>
                          {arrayData.order_date ? (
                            <div className="m-auto mt-5">
                              {(data = arrayData.order_date)}
                              <hr />
                            </div>
                          ) : (
                            <div className="col-12 col-md-6 col-lg-3">
                              <div
                                className="card mt-3"
                                style={{
                                  width: "16rem",
                                  maxHeight: "360px",
                                }}
                              >
                                <img
                                  src={arrayData.img}
                                  className="card-img-top"
                                  alt="..."
                                  style={{
                                    height: "120px",
                                    objectFit: "fill",
                                  }}
                                />
                                <div className="card-body">
                                  <h5 className="card-title">
                                    {arrayData.name}
                                  </h5>
                                  <div
                                    className="container w-100 p-0"
                                    style={{ height: "38px" }}
                                  >
                                    <span className="m-1">{arrayData.qty}</span>
                                    <span className="m-1">
                                      {arrayData.size}
                                    </span>
                                    <span className="m-1">{data}</span>
                                    <div className=" d-inline ms-2 h-100 w-20 fs-5">
                                      ₹{arrayData.price}/-
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    });
                  })
              ) : (
                <h3>No Items</h3>
              );
            })
          ) : (
            <h3>No Items</h3>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
