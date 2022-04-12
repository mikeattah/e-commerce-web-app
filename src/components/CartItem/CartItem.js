import React, { Component } from "react";
import SelectedSize from "../SelectedSize/SelectedSize";
import SelectedQuantity from "../SelectedQuantity/SelectedQuantity";
import "./CartItem.css";

class CartItem extends Component {
  render() {
    return (
      <div className="cart-item">
        <div className="cart-item-left">
          <p className="cart-item-product-name">
            {this.props.cartItem.product.name}
          </p>
          <p className="cart-item-product-type">
            {this.props.cartItem.product.type}
          </p>
          <p className="cart-item-product-price">
            {this.props.cartItem.product.price}
          </p>
          <div className="cart-item-product-sizes">
            {this.props.cartItem.sizes.map((size, index) => {
              return <SelectedSize size={size} key={index} />;
            })}
          </div>
        </div>
        <div className="cart-item-right">
          <div className="cart-item-quantity-container">
            <SelectedQuantity>+</SelectedQuantity>
            <p className="cart-item-quantity">{this.props.cartItem.quantity}</p>
            <SelectedQuantity>-</SelectedQuantity>
          </div>
          <img
            src={this.props.cartItem.product.image}
            alt={this.props.cartItem.product.name}
            className="cart-item-image"
          />
        </div>
      </div>
    );
  }
}

export default CartItem;
