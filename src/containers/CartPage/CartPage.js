import React, { Component } from "react";
import CartItem from "../../components/CartItem/CartItem";
import FillButton from "../../components/FillButton/FillButton";
import OutlineButton from "../../components/OutlineButton/OutlineButton";
import "./CartPage.css";

class CartPage extends Component {
  constructor(props) {
    super(props);

    this.handleContinueShopping = this.handleContinueShopping.bind(this);
  }

  handleContinueShopping() {
    this.setState({ page: "categorypage" });
  }

  render() {
    return (
      <div className="cart-page">
        <h1 className="cart-page-title">CART</h1>
        <div className="cart-page-main">
          {this.props.cart.map((item) => {
            return (
              <CartItem
                title={item.title}
                type={item.type}
                price={item.price}
                sizes={item.sizes}
                quantity={item.quantity}
                image={item.image}
              />
            );
          })}
        </div>
        <div className="cart-page-section">
          <div className="cart-page-total">
            <span className="cart-page-total-text">Total</span>
            <span className="cart-page-total-text">{this.props.cartTotal}</span>
          </div>
          <div className="cart-page-buttons">
            <div className="cart-page-left">
              <OutlineButton buttonClick={this.handleContinueShopping}>
                CONTINUE SHOPPING
              </OutlineButton>
            </div>
            <div className="cart-page-right">
              <FillButton buttonClick={() => this.handleCheckOut()}>
                CHECK OUT
              </FillButton>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CartPage;
