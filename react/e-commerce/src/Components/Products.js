import React, { Component } from "react";

export class Products extends Component {
  render() {
    let { title, imageUrl, price, rating, description } = this.props;
    return (
      <div
        className="my-3"
        style={{ display: "flex", justifyContent: "space-evenly" }}
      >
        <div className="card" style={{ width: "18rem" }}>
          <img
            className="mx-3"
            src={imageUrl}
            className="card-img-top"
            style={{
              width: "15rem",
              height: "15rem",
            }}
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title"> {title}</h5>

            <p className="card-text">{price}$</p>
            <p className="card-text">{rating}*****</p>
            <button type="button" className="btn btn-primary">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Products;
