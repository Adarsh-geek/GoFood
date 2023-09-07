import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
// import { Carousel } from "bootstrap/dist/js/bootstrap.bundle";
// import Carausel from "../components/Carousel";
// import { response } from "express";

function Home() {
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const handelSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const loadData = async () => {
      let response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
      });

      response = await response.json();
      setFoodItem(response[0]);
      setFoodCat(response[1]);
      console.log(response[0], response[1]);
    };
    loadData();
  }, []);

  // const loadData = async () => {
  //   let response = await fetch("http://localhost:5000/api/foodData", {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //   });

  //   // response = await response.json();
  //   console.log(response[0], response[1]);
  // };

  return (
    <div>
      <Navbar />
      {/* <Carausel /> */}
      {/* <Card />
      <Card />
      <Card />
      <Card /> */}
      {/* Carousel--start */}

      <div style={{ objectFit: "contain !important" }}>
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div
            className="carousel-inner"
            style={{ maxHeight: "300px", objectFit: "contain !important" }}
          >
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => {
                    handelSearch(e);
                  }}
                />
                <button
                  className="btn btn-outline-success text-white bg-success"
                  type="submit"
                >
                  Search
                </button>
              </form>
            </div>
            <div
              className="carousel-item active"
              style={{ objectFit: "contain !important" }}
            >
              <img
                src="https://source.unsplash.com/random/900x700?burger"
                className="d-block w-100"
                style={{
                  filter: "brightness(30%)",
                  objectFit: "contain !important",
                }}
                alt="https://source.unsplash.com/random/200x200?"
              />
            </div>
            <div
              className="carousel-item"
              style={{ objectFit: "contain !important" }}
            >
              <img
                src="https://source.unsplash.com/random/900x700?pizza"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="https://source.unsplash.com/random/200x200?"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700?paratha"
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="https://source.unsplash.com/random/200x200?"
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      {/* Carousel--end */}
      <div className="container">
        {foodCat !== [] ? (
          foodCat.map((foodCategory) => {
            return (
              <div>
                <div key={foodCategory._id} className="row mb-3  m-3">
                  <hr />
                  <h5>{foodCategory.CategoryName}</h5>

                  {foodItem !== [] ? (
                    foodItem
                      .filter(
                        (item) =>
                          item.CategoryName === foodCategory.CategoryName &&
                          item.name.toLowerCase().includes(search)
                      )
                      .map((item) => {
                        return (
                          <div key={item._id} className="col">
                            <Card foodItems={item} option={item.options[0]} />
                          </div>
                        );
                      })
                  ) : (
                    <h2>No data Found</h2>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <h1>Loading items</h1>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Home;
