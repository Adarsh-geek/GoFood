import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import Signup from "./pages/Signup";
import { CartProvider } from "./components/CartContext";
import Cart from "./pages/Cart";
import MyOrders from "./pages/MyOrders";
function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/createUser" element={<Signup />} />
            <Route exact path="/myCart" element={<Cart />} />
            <Route exact path="/myOrders" element={<MyOrders />} />
            <Route
              exact
              path="*"
              element={
                <h1 className="bg-danger p-4 text-center">
                  Error 404! Page not found
                </h1>
              }
            />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
