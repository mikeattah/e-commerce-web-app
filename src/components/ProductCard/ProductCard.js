import React, { Component } from "react";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.id = props.id;
    this.name = props.name;
    this.inStock = props.inStock;
    this.gallery = props.gallery;
    this.label = props.label;
    this.symbol = props.symbol;
    this.amount = props.amount;
    this.onClick = props.onClick;

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // Router.push(`/productpage/${this.state.product.id}`);
  }

  render() {
    return (
      <div className="container" onClick={this.handleClick}>
        <img src={this.gallery[0]} alt={this.name} className="image" />
        <p className="title">{this.name}</p>
        <p className="price">
          {this.symbol} {this.amount}
        </p>
      </div>
    );
  }
}

export default ProductCard;
