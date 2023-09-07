import React from "react";
import { useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const [shown, setShown] = useState(false);
  const type = shown ? "text" : "password";
  // create a derived/computed state for the button text
  const buttonText = shown ? "Hide password" : "Show Password";

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/loginUser", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: state.email,
        password: state.password,
      }),
    });

    const jsonResponse = await response.json();
    console.log(" Line no.29 " + jsonResponse.success);
    if (jsonResponse.success) {
      localStorage.setItem("email", state.email);
      localStorage.setItem("authToken", jsonResponse.authToken);
      navigate("/");
    } else {
      alert("Enter Valid Credentials");
    }
    // .then((data) => {
    //   // const json = res.json();
    //   console.log(data);
    //   if (data.status !== 200) {
    //     alert("Enter Valid Credentials");
    //   } else {
    //     localStorage.setItem("authToken", data.json.authToken);
    //     navigate("/");
    //   }
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
    // const json = (await response).json;
    // console.log(json);

    // if (json.success) {
    //   alert("Enter Valid credentials");
    // }
  };

  const onChangeHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="bg-light">
        <div className="container">
          <h2 className="text-decoration-underline">Login</h2>
          <div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                name="email"
                value={state.email}
                onChange={onChangeHandler}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type={type}
                className="form-control"
                id="exampleInputPassword1"
                name="password"
                value={state.password}
                onChange={onChangeHandler}
              />
              <button onClick={() => setShown(!shown)}>{buttonText}</button>
            </div>
            <button
              type="submit"
              className="btn btn-success"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <Link to="/createUser" className="m-3 btn btn-danger">
              New User?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
