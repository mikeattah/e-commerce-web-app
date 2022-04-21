import React, { Component } from "react";
import { nanoid } from "nanoid";
import FillButton from "../FillButton/FillButton";
import OutlineButton from "../OutlineButton/OutlineButton";
import CartItem from "../CartItem/CartItem";
import { gql } from "@apollo/client";
import "./MiniCart.css";

const GET_CURRENCIES = gql`
  query GetCurrencies {
    currencies {
      label
      symbol
    }
  }
`;

class MiniCart extends Component {
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
      <div
        className={`mini-cart ${
          this.props.miniCartOpen ? "" : "mini-cart-hidden"
        }`}
      >
        <p className="mini-cart-title">
          <span className="mini-cart-title-bold">My Bag,</span>{" "}
          {this.props.cartQuantity}{" "}
          {this.props.cartQuantity > 1 ? "items" : "item"}
        </p>
        <div className="mini-cart-items-container">
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
                compSize="small"
              />
            );
          })}
        </div>
        <div className="mini-cart-total-price">
          <span>Total</span>
          <span>
            {symbol} {this.props.cartTotal}
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
            buttonClick={this.props.checkOut}
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
