import React, { Component } from "react";
class ProductCard extends Component {
  render() {
    return (
      <div className="container">
        <img src={product.image} alt={product.name} className="image" />
        <p className="title">{product.name}</p>
        <p className="price">{product.price}</p>
      </div>
    );
  }
}

export default ProductCard;
