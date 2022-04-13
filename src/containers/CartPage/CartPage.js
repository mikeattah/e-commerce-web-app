import React, { Component } from "react";
import CartItem from "../../components/CartItem/CartItem";
import FillButton from "../../components/FillButton/FillButton";
import OutlineButton from "../../components/OutlineButton/OutlineButton";
import "./CartPage.css";

class CartPage extends Component {
  render() {
    return (
      <div className="cart-page">
        <h1 className="cart-page-title">CART</h1>
        <div className="cart-page-main">
          {this.props.cart.map((item) => {
            return (
              <CartItem
                name={item.name}
                brand={item.brand}
                gallery={item.gallery}
                prices={item.prices}
                selectedSize={item.selectedSize}
                selectedQuantity={item.selectedQuantity}
                compSize="large"
              />
            );
          })}
        </div>
        <div className="cart-page-section">
          <div className="cart-page-total">
            <span className="cart-page-total-text-one">Total</span>
            <span className="cart-page-total-text-two">
              {this.props.cartTotal}
            </span>
          </div>
          <div className="cart-page-buttons">
            <OutlineButton
              buttonClick={this.props.continueShopping}
              compSize="large"
            >
              CONTINUE SHOPPING
            </OutlineButton>
            <FillButton buttonClick={this.props.checkOut} compSize="large">
              CHECK OUT
            </FillButton>
          </div>
        </div>
      </div>
    );
  }
}

export default CartPage;
