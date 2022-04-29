import React, { Component } from "react";
import { nanoid } from "nanoid";
import FillButton from "../FillButton/FillButton";
import OutlineButton from "../OutlineButton/OutlineButton";
import CartItem from "../CartItem/CartItem";
import "./MiniCart.css";

class MiniCart extends Component {
  render() {
    let currencies = this.props.currencies;
    let symbol;
    for (let currency of currencies) {
      if (currency.label === this.props.currency) {
        symbol = currency.symbol;
      }
    }
    return (
      <div
        className={`mini-cart ${
          this.props.miniCartOpen ? "" : "mini-cart-hidden"
        }`}
      >
        <p className="mini-cart-title">
          <span className="mini-cart-title-span">My Bag,</span>{" "}
          {this.props.cartQuantity}{" "}
          {this.props.cartQuantity > 1 ? "items" : "item"}
        </p>
        <div className="mini-cart-items-container">
          {this.props.cartItems.map((item) => {
            const { id, attributes, quantity } = item;
            const product = this.props.getProduct(id);
            return (
              <CartItem
                key={nanoid()}
                product={product}
                attributes={attributes}
                cartItemAttributes={this.props.cartItemAttributes}
                quantity={quantity}
                cartItemQuantity={this.props.cartItemQuantity}
                removeFromCart={this.props.removeFromCart}
                currency={this.props.currency}
                compSize="small"
              />
            );
          })}
        </div>
        <div className="mini-cart-total-price">
          <span>Total (Incl. Tax)</span>
          <span>
            {symbol} {this.props.subTotal}
          </span>
        </div>
        <div className="mini-cart-buttons">
          <OutlineButton
            buttonClick={this.props.viewBag}
            compSize="small"
            disabled={false}
          >
            VIEW BAG
          </OutlineButton>
          <FillButton
            buttonClick={this.props.placeOrder}
            compSize="small"
            disabled={false}
          >
            CHECK OUT
          </FillButton>
        </div>
      </div>
    );
  }
}

export default MiniCart;
