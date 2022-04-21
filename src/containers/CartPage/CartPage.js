import React, { Component } from "react";
import { gql } from "@apollo/client";
import { nanoid } from "nanoid";
import CartItem from "../../components/CartItem/CartItem";
import FillButton from "../../components/FillButton/FillButton";
import OutlineButton from "../../components/OutlineButton/OutlineButton";
import "./CartPage.css";

const GET_CURRENCIES = gql`
  query GetCurrencies {
    currencies {
      label
      symbol
    }
  }
`;

class CartPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
    };
  }

  componentDidMount() {
    this.props.client
      .query({
        query: GET_CURRENCIES,
      })
      .then((response) => {
        this.setState({
          currencies: response.data.currencies,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    let currencies = this.state.currencies;
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
          {this.props.cart.map((item) => {
            return (
              <CartItem
                key={nanoid()}
                product={item.product}
                attributes={item.attributes}
                cartItemAttributes={this.props.cartItemAttributes}
                quantity={item.quantity}
                cartItemQuantity={this.props.cartItemQuantity}
                currency={this.props.currency}
                compSize="large"
              />
            );
          })}
        </div>
        <div className="cart-page-section">
          <div className="cart-page-total">
            <span className="cart-page-total-text-one">Total</span>
            <span className="cart-page-total-text-two">
              {symbol} {this.props.cartTotal}
            </span>
          </div>
          <div className="cart-page-buttons">
            <OutlineButton
              buttonClick={this.props.continueShopping}
              disabled={false}
              compSize="large"
            >
              CONTINUE SHOPPING
            </OutlineButton>
            <FillButton
              buttonClick={this.props.checkOut}
              disabled={this.props.cart.length === 0}
              compSize="large"
            >
              CHECK OUT
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
