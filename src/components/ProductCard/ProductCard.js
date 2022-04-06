import React, { Component } from "react";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        id: props.id,
        name: props.name,
        gallery: props.gallery,
        prices: props.prices,
      },
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // Router.push(`/productpage/${this.state.product.id}`);
  }

  render() {
    return (
      <div className="container" onClick={this.handleClick}>
        <img
          src={this.state.product.gallery}
          alt={this.state.product.name}
          className="image"
        />
        <p className="title">{this.state.product.name}</p>
        <p className="price">{this.state.product.prices}</p>
      </div>
    );
  }
}

export default ProductCard;
