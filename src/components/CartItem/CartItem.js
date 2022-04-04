import React, { Component } from "react";
import ProductSize from "../ProductSize/ProductSize";
import ItemQuantity from "../ItemQuantity/ItemQuantity";

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItem: {
        product: {
          id: props.id,
          name: props.name,
          type: props.type,
          price: props.price,
          image: props.image,
        },
        sizes: props.sizes,
        quantity: props.quantity,
      },
    };
  }

  render() {
    return (
      <div className="container">
        <div className="left-container">
          <p className="product-name">{this.props.cartItem.product.name}</p>
          <p className="product-type">{this.props.cartItem.product.type}</p>
          <p className="product-price">{this.props.cartItem.product.price}</p>
          <div className="product-sizes">
            {this.props.cartItem.sizes.map((size, index) => {
              return <ProductSize size={size} key={index} />;
            })}
          </div>
        </div>
        <div className="right-container">
          <div className="quantity-container">
            <ItemQuantity>+</ItemQuantity>
            <p className="cart-item-quantity">{this.props.cartItem.quantity}</p>
            <ItemQuantity>-</ItemQuantity>
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
