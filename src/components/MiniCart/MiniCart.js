import React, { Component } from "react";
import CartItem from "./CartItem";
import FillButton from "../FillButton/FillButton";
import OutlineButton from "../OutlineButton/OutlineButton";

class MiniCart extends Component {
  render() {
    return (
      <div className="container">
        <h3 className="title">My Bag, {this.props.cartItem.listTotal} items</h3>
        <div className="cart-item-container">
          {this.props.cartItem.cartItems.map((cartItem, index) => {
            return <CartItem cartItem={cartItem} key={index} />;
          })}
        </div>
        <div className="total-price">
          <span>Total:</span>
          <span>{this.props.cartItem.priceTotal}</span>
        </div>
        <div className="buttons">
          <div className="left-button">
            <OutlineButton onClick={onViewBag}>VIEW BAG</OutlineButton>
          </div>
          <div className="right-button">
            <FillButton onClick={onCheckout}>CHECK OUT</FillButton>
          </div>
        </div>
      </div>
    );
  }
}

export default MiniCart;
