import React, { Component } from "react";
import CartItem from "../../components/CartItem/CartItem";
import FillButton from "../../components/FillButton/FillButton";
import OutlineButton from "../../components/OutlineButton/OutlineButton";

class CartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      cartTotal: 0,
    };
    this.handleContinueShopping = this.handleContinueShopping.bind(this);
    this.handleCheckOut = this.handleCheckOut.bind(this);
  }

  componentDidMount() {}

  componentDidUpdate() {}

  handleContinueShopping() {}

  handleCheckOut() {}

  render() {
    return (
      <div className="container">
        <h1 className="title">CART</h1>
        <div className="main-container">
          {this.state.cart.map((item) => {
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
        <div className="bottom-container">
          <div className="total-price">
            <span>Total:</span>
            <span>{this.state.cartTotal}</span>
          </div>
          <div className="buttons">
            <div className="left-button">
              <OutlineButton onClick={this.handleContinueShopping}>
                CONTINUE SHOPPING
              </OutlineButton>
            </div>
            <div className="right-button">
              <FillButton onClick={this.handleCheckOut}>CHECK OUT</FillButton>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CartPage;
