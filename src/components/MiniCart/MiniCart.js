import React, { Component } from "react";
import { nanoid } from "nanoid";
import FillButton from "../FillButton/FillButton";
import OutlineButton from "../OutlineButton/OutlineButton";
import CartItem from "../CartItem/CartItem";
import "./MiniCart.css";

class MiniCart extends Component {
  render() {
    return (
      <div
        className={`mini-cart ${
          this.props.miniCartOpen ? "" : "mini-cart-hidden"
        }`}
      >
        <p className="mini-cart-title">
          <span className="mini-cart-title-bold">My Bag,</span>{" "}
          {this.props.cart.length}{" "}
          {this.props.cart.length > 1 ? "items" : "item"}
        </p>
        <div className="mini-cart-items-container">
          {this.props.cart.map((item) => {
            return (
              <CartItem
                key={nanoid()}
                product={item.product}
                size={item.size}
                quantity={item.quantity}
                currency={this.props.currency}
                compSize="small"
              />
            );
          })}
        </div>
        <div className="mini-cart-total-price">
          <span>Total</span>
          <span>{this.props.cartTotal}</span>
        </div>
        <div className="mini-cart-buttons">
          <OutlineButton buttonClick={this.props.viewBag} compSize="small">
            VIEW BAG
          </OutlineButton>
          <FillButton buttonClick={this.props.checkOut} compSize="small">
            CHECK OUT
          </FillButton>
        </div>
      </div>
    );
  }
}

export default MiniCart;
