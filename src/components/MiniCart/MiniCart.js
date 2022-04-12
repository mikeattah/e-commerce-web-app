import React, { Component } from "react";
import FillButton from "../FillButton/FillButton";
import OutlineButton from "../OutlineButton/OutlineButton";
import CartItem from "../CartItem/CartItem";
import "./MiniCart.css";

class MiniCart extends Component {
  render() {
    return (
      <div
        className={`mini-cart ${
          this.props.isMiniCartOpen ? "" : "mini-cart-hidden"
        }`}
      >
        <h3 className="mini-cart-title">
          <span className="mini-cart-title-bold">My Bag,</span>{" "}
          {this.props.cart.length} items
        </h3>
        <div className="mini-cart-item-container">
          {this.props.cart.map((item, index) => {
            return <CartItem cartItem={item} key={index} />;
          })}
        </div>
        <div className="mini-cart-total-price">
          <span>Total</span>
          <span>{this.props.cartTotal}</span>
        </div>
        <div className="mini-cart-buttons">
          <div className="mini-cart-left">
            <OutlineButton onClick={() => this.props.viewBagClick()}>
              VIEW BAG
            </OutlineButton>
          </div>
          <div className="mini-cart-right">
            <FillButton onClick={() => this.props.checkOutClick()}>
              CHECK OUT
            </FillButton>
          </div>
        </div>
      </div>
    );
  }
}

export default MiniCart;
