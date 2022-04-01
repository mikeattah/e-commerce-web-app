import React, { Component } from "react";
import NavBar from "../../components/NavBar/NavBar";
import CartItem from "../../components/CartItem/CartItem";
import FillButton from "../../components/FillButton/FillButton";
import OutlineButton from "../../components/OutlineButton/OutlineButton";

class CartPage extends Component {
  render() {
    return (
      <div className="container">
        <NavBar />
        <h1>CART</h1>
        <div className="main-container">
          {cart.map((item) => {
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
        <div>
          <div className="total-price">
            <span>Total:</span>
            <span>{cartTotal}</span>
          </div>
          <div className="buttons">
            <div className="left-button">
              <OutlineButton onClick={onContinueShopping}>
                CONTINUE SHOPPING
              </OutlineButton>
            </div>
            <div className="right-button">
              <FillButton onClick={onCheckOut}>CHECK OUT</FillButton>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CartPage;
