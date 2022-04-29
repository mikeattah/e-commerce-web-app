import React, { Component } from "react";
import { nanoid } from "nanoid";
import CartItem from "../../components/CartItem/CartItem";
import FillButton from "../../components/FillButton/FillButton";
import "./CartPage.css";

class CartPage extends Component {
  render() {
    let currencies = this.props.currencies;
    let symbol;
    for (let currency of currencies) {
      if (currency.label === this.props.currency) {
        symbol = currency.symbol;
      }
    }
    return (
      <div className="cart-page">
        <h1 className="cart-page-title">CART</h1>
        <div className="cart-page-main">
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
                compSize="large"
              />
            );
          })}
        </div>
        <div className="cart-page-section">
          <div className="cart-page-summary">
            <span className="cart-page-summary-text-one">Qty:</span>
            <span className="cart-page-summary-text-three">
              {this.props.cartQuantity}
            </span>
          </div>
          <div className="cart-page-summary">
            <span className="cart-page-summary-text-one">Sub-Total:</span>
            <span className="cart-page-summary-text-two">{symbol}</span>
            <span className="cart-page-summary-text-three">
              {this.props.subTotal}
            </span>
          </div>
          <div className="cart-page-summary">
            <span className="cart-page-summary-text-one">Tax:</span>
            <span className="cart-page-summary-text-two">{symbol}</span>
            <span className="cart-page-summary-text-three">
              {this.props.tax}
            </span>
          </div>
          <div className="cart-page-summary cart-page-summary-extra">
            <span className="cart-page-summary-text-one">Total:</span>
            <span className="cart-page-summary-text-two">{symbol}</span>
            <span className="cart-page-summary-text-three">
              {this.props.total}
            </span>
          </div>
          <div className="cart-page-button-container">
            <FillButton
              buttonClick={this.props.placeOrder}
              disabled={this.props.cartItems.length === 0}
              compSize="large"
            >
              ORDER
            </FillButton>
          </div>
        </div>
        <div
          className={
            this.props.miniCartOpen
              ? "cart-page-overlay"
              : "cart-page-overlay-hidden"
          }
          onClick={() => this.props.miniCartToggle()}
        ></div>
      </div>
    );
  }
}

export default CartPage;
