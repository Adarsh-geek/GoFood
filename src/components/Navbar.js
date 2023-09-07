import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";
import { useCart } from "./CartContext";
import { Modal } from "bootstrap/dist/js/bootstrap.bundle";
import CartModal from "../CartModal";
import Cart from "../pages/Cart";

function Navbar() {
  const navigate = useNavigate();
  const cartItems = useCart();
  const [cartView, setCartView] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            GoFood
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav me-auto mb-2">
              <Link
                className="nav-link active fs-5 "
                aria-current="page"
                to="/"
              >
                Home
              </Link>
              {localStorage.getItem("authToken") ? (
                <Link
                  className="nav-link active fs-5 "
                  aria-current="page"
                  to="/myOrders"
                  // onClick={}
                >
                  My Orders
                </Link>
              ) : (
                ""
              )}
            </div>

            {localStorage.getItem("authToken") ? (
              <div>
                <div
                  className="btn bg-white text-success mx-1"
                  onClick={() => {
                    setCartView(true);
                  }}
                >
                  My Cart{" "}
                  <Badge pill className="bg-danger">
                    {cartItems.length}
                  </Badge>
                </div>
                {cartView ? (
                  <CartModal
                    onClose={() => {
                      setCartView(false);
                    }}
                  >
                    <Cart />
                  </CartModal>
                ) : null}
                <Link
                  className="btn bg-white text-danger mx-1 btn-link btn-logout"
                  // to="/"
                  onClick={handleLogout}
                >
                  Logout
                </Link>
              </div>
            ) : (
              <div className="d-flex">
                <Link className="btn bg-white text-success mx-1" to="/login">
                  Login
                </Link>
                <Link
                  className="btn bg-white text-success mx-1"
                  to="/createUser"
                >
                  SignUp
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
