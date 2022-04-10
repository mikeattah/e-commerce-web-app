import React, { Component } from "react";
import CartItem from "../../components/CartItem/CartItem";
import FillButton from "../../components/FillButton/FillButton";
import OutlineButton from "../../components/OutlineButton/OutlineButton";

class CartPage extends Component {
  constructor(props) {
    super(props);

    this.handleContinueShopping = this.handleContinueShopping.bind(this);
    this.handleCheckOut = this.handleCheckOut.bind(this);
  }

  handleContinueShopping() {}

  handleCheckOut() {}

  render() {
    return (
      <div className="container">
        <h1 className="title">CART</h1>
        <div className="main">
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
        <div className="section">
          <div className="total">
            <span>Total:</span>
            <span>{this.props.cartTotal}</span>
          </div>
          <div className="buttons">
            <div className="left">
              <OutlineButton onClick={() => this.handleContinueShopping}>
                CONTINUE SHOPPING
              </OutlineButton>
            </div>
            <div className="right">
              <FillButton onClick={() => this.handleCheckOut}>
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
