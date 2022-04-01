import React, { Component } from "react";
import ProductSize from "./ProductSize";
import ItemQuantity from "./ItemQuantity";

class CartItem extends Component {
  render() {
    return (
      <div class="container">
        <div class="left-container">
          <p class="product-name">{this.props.cartItem.product.name}</p>
          <p class="product-type">{this.props.cartItem.product.type}</p>
          <p class="product-price">{this.props.cartItem.product.price}</p>
          <div class="product-sizes">
            {this.props.cartItem.product.sizes.map((size, index) => {
              return <ProductSize size={size} key={index} />;
            })}
          </div>
        </div>
        <div class="right-container">
          <div class="quantity-container">
            <ItemQuantity>+</ItemQuantity>
            <p class="cart-item-quantity">{this.props.cartItem.quantity}</p>
            <ItemQuantity>-</ItemQuantity>
          </div>
          <img
            src={this.props.cartItem.product.image}
            alt={this.props.cartItem.product.name}
            class="cart-item-image"
          />
        </div>
      </div>
    );
  }
}

export default CartItem;
