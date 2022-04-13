import React, { Component } from "react";
import SelectedSize from "../SelectedSize/SelectedSize";
import SelectedQuantity from "../SelectedQuantity/SelectedQuantity";
import SmallImage from "../SmallImage/SmallImage";
import "./CartItem.css";

class CartItem extends Component {
  render() {
    let symbol, amount;
    for (let price of this.props.prices) {
      if (price.currency.label === this.props.currency) {
        symbol = price.currency.symbol;
        amount = price.amount;
      }
    }

    return (
      <div
        className={
          this.props.compSize === "large"
            ? "cart-item-large"
            : "cart-item-small"
        }
      >
        <div className="cart-item-left">
          <p className="cart-item-product-name">{this.props.name}</p>
          <p className="cart-item-product-type">{this.props.brand}</p>
          <p className="cart-item-product-price">
            {symbol} {amount}
          </p>
          <div className="cart-item-product-sizes">
            {this.props.attributes.items.map((item, index) => {
              return (
                <SelectedSize
                  displayValue={item.value}
                  value={item.value}
                  key={item.id}
                  compSize={this.props.compSize}
                />
              );
            })}
          </div>
        </div>
        <div className="cart-item-right">
          <div className="cart-item-quantity">
            <SelectedQuantity compSize={this.props.compSize}>
              +
            </SelectedQuantity>
            <p className="cart-item-quantity-text">
              {this.props.selectedQuantity}
            </p>
            <SelectedQuantity compSize={this.props.compSize}>
              -
            </SelectedQuantity>
          </div>
          <SmallImage src={this.props.gallery[0]} alt={this.props.name} />
        </div>
      </div>
    );
  }
}

export default CartItem;
