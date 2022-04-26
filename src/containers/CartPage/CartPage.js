import React, { Component } from "react";
import { gql } from "@apollo/client";
import { nanoid } from "nanoid";
import CartItem from "../../components/CartItem/CartItem";
import FillButton from "../../components/FillButton/FillButton";
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
      loading: true,
      error: null,
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
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          error: error,
        });
      });
  }

  render() {
    if (this.state.loading) return <p>Loading...</p>;
    if (this.state.error) return <p>Error: {this.state.error}</p>;
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
              disabled={this.props.cart.length === 0}
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
