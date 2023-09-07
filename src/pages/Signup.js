import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
    location: "",
  });

  // const navigate = useNavigate();
  let [address, setAddress] = useState("");
  let navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    let navLocation = () => {
      return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
      });
    };
    let latlong = await navLocation().then((res) => {
      let latitude = res.coords.latitude;
      let longitude = res.coords.longitude;
      return [latitude, longitude];
    });
    // console.log(latlong)
    let [lat, long] = latlong;
    console.log(lat, long);
    const response = await fetch("http://localhost:5000/api/getlocation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ latlong: { lat, long } }),
    });
    const { location } = await response.json();
    console.log(location);
    setAddress(location);
    setState({ ...state, [e.target.name]: location });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    state.confirm_password !== state.password ? (
      alert("password did not match")
    ) : (
      <></>
    );

    fetch("http://localhost:5000/api/createUser", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: state.name,
        email: state.email,
        password: state.password,
        location: state.location,
      }),
    })
      .then((data) => {
        console.log(data);
        if (data.status !== 200) {
          alert("Enter Valid Credentials");
        } else {
          alert("SignedUp Successfully");
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
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
          <h2 className="text-decoration-underline">SignUp</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={state.name}
                onChange={onChangeHandler}
              />
            </div>
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
              <label htmlFor="name" className="form-label">
                Address
              </label>
              <fieldset>
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                />
              </fieldset>
            </div>
            <div className="m-3">
              <button
                type="button"
                onClick={handleClick}
                name="location"
                className=" btn btn-success"
              >
                Click for current Location{" "}
              </button>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                name="password"
                value={state.password}
                onChange={onChangeHandler}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword2" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword2"
                name="confirm_password"
                value={state.confirm_password}
                onChange={onChangeHandler}
              />
            </div>
            <button type="submit" className="btn btn-success">
              Submit
            </button>
            <Link to="/login" className="m-3 btn btn-danger">
              Already a user?
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
