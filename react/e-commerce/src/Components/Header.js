import React from "react";
import style from "./style.css";

export default function Header() {
  return (
    <>
      {/*<div className="container">
        <h1 className="logo">Flipkart</h1>
        <input
          className="search"
          type="text"
          placeholder="Search products, brands here"
        ></input>
        <div className="login">
          <button className="login-button">Login</button>
          <img className="cart-image" src="./image/image.jpg" alt="image"></img>
        </div>
  </div>*/}

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Flipkart
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Electronic
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link active">Jewelery</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active">Men's clothing</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active">Women's clothing</a>
              </li>
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </form>
            <img
              className="cart-image"
              src="./image/image.jpg"
              alt="image"
            ></img>
            Cart
          </div>
        </div>
      </nav>
    </>
  );
}
