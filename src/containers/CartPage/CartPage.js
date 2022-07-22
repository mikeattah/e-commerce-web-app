import React, { Component } from "react";
import { nanoid } from "nanoid";
import CartItem from "../../components/CartItem/CartItem";
import FillButton from "../../components/FillButton/FillButton";
import "./CartPage.css";

class CartPage extends Component {
  render() {
    const {
      currency,
      currencies,
      cartItems,
      subTotal,
      tax,
      total,
      cartQuantity,
      miniCartOpen,
      getProduct,
      cartItemAttributes,
      cartItemQuantity,
      removeFromCart,
      miniCartToggle,
      placeOrder,
      numberFormat,
    } = this.props;
    let symbol;
    currencies.forEach((currency) => {
      if (currency.label === currency) {
        symbol = currency.symbol;
      }
    });
    return (
      <div className="cart-page">
        <h1 className="cart-page-title">CART</h1>
        <div className="cart-page-main">
          {cartItems.map((item) => {
            const { productId, itemId, attributes, quantity } = item;
            const product = getProduct(productId);
            return (
              <CartItem
                key={nanoid()}
                product={product}
                itemId={itemId}
                attributes={attributes}
                cartItemAttributes={cartItemAttributes}
                quantity={quantity}
                cartItemQuantity={cartItemQuantity}
                removeFromCart={removeFromCart}
                currency={currency}
                numberFormat={numberFormat}
                compSize="large"
              />
            );
          })}
        </div>
        <div className="cart-page-section">
          <div className="cart-page-summary">
            <span className="cart-page-summary-text-one">Qty:</span>
            <span className="cart-page-summary-text-three">{cartQuantity}</span>
          </div>
          <div className="cart-page-summary">
            <span className="cart-page-summary-text-one">Sub-Total:</span>
            <span className="cart-page-summary-text-two">{symbol}</span>
            <span className="cart-page-summary-text-three">{subTotal}</span>
          </div>
          <div className="cart-page-summary">
            <span className="cart-page-summary-text-one">Tax:</span>
            <span className="cart-page-summary-text-two">{symbol}</span>
            <span className="cart-page-summary-text-three">{tax}</span>
          </div>
          <div className="cart-page-summary cart-page-summary-extra">
            <span className="cart-page-summary-text-one">Total:</span>
            <span className="cart-page-summary-text-two">{symbol}</span>
            <span className="cart-page-summary-text-three">{total}</span>
          </div>
          <div className="cart-page-button-container">
            <FillButton
              buttonClick={placeOrder}
              disabled={cartItems.length === 0}
              compSize="large"
            >
              ORDER
            </FillButton>
          </div>
        </div>
        <div
          className={
            miniCartOpen ? "cart-page-overlay" : "cart-page-overlay-hidden"
          }
          onClick={() => miniCartToggle()}
        ></div>
      </div>
    );
  }
}

export default CartPage;
