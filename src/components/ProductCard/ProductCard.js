import React, { Component } from "react";

class ProductCard extends Component {
  render() {
    return (
      <div>
        <img src={product.image} alt={product.name} />
        <p>{product.name}</p>
        <p>{product.price}</p>
      </div>
    );
  }
}

export default ProductCard;
