import React, { Component } from "react";
import { gql } from "@apollo/client";
import { nanoid } from "nanoid";
import FillButton from "../FillButton/FillButton";
import OutlineButton from "../OutlineButton/OutlineButton";
import CartItem from "../CartItem/CartItem";
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
          <span className="mini-cart-title-span">My Bag,</span>{" "}
          {this.props.cartQuantity}{" "}
          {this.props.cartQuantity > 1 ? "items" : "item"}
        </p>
        <div className="mini-cart-items-container">
          {this.props.cart.map((item) => {
            const { product, attributes, quantity } = item;
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
            {symbol} {this.props.total}
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
