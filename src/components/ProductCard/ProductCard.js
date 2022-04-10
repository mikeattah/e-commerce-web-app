import React, { Component } from "react";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./ProductCard.css";
class ProductCard extends Component {
  render() {
    return (
      <div
        className="product-card"
        onClick={() => this.props.onClick(this.props.id)}
      >
        <img
          src={this.props.gallery[0]}
          alt={this.props.name}
          className="product-card-image"
        />
        <p className="product-card-title">{this.props.name}</p>
        <p className="product-card-price">
          {this.props.symbol} {this.props.amount}
        </p>
      </div>
    );
  }
}

export default ProductCard;
