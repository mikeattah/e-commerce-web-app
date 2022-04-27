import React, { Component } from "react";
import { nanoid } from "nanoid";
import Attribute from "../Attribute/Attribute";
import Quantity from "../Quantity/Quantity";
import SmallImage from "../SmallImage/SmallImage";
import Swatch from "../Swatch/Swatch";
import "./CartItem.css";

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageIndex: 0,
    };
  }

  handleChangeImage = (dir) => {
    if (dir === "left") {
      if (this.state.imageIndex === 0) {
        this.setState({ imageIndex: this.props.product.gallery.length - 1 });
      } else {
        this.setState({ imageIndex: this.state.imageIndex - 1 });
      }
    } else if (dir === "right") {
      if (this.state.imageIndex === this.props.product.gallery.length - 1) {
        this.setState({ imageIndex: 0 });
      } else {
        this.setState({ imageIndex: this.state.imageIndex + 1 });
      }
    }
  };

  handleImageClick = () => {
    return;
  };

  render() {
    let symbol, amount;
    for (let price of this.props.product.prices) {
      if (price.currency.label === this.props.currency) {
        symbol = price.currency.symbol;
        amount = price.amount;
      }
    }
    return (
      <div
        className={`cart-item ${
          this.props.compSize === "large" ? "" : "cart-item-small"
        }`}
      >
        <div
          className={`cart-item-left-section ${
            this.props.compSize === "large"
              ? ""
              : "cart-item-left-section-small"
          }`}
        >
          <p className="cart-item-name">{this.props.product.name}</p>
          <p className="cart-item-brand">{this.props.product.brand}</p>
          <p className="cart-item-price">
            {symbol} {amount}
          </p>
          <div className="cart-item-attributes-container">
            {this.props.product.attributes.map((attribute) => {
              const { id, name, type, items } = attribute;
              return (
                <div key={nanoid()} id={id} className="cart-item-attributes">
                  <p className="cart-item-attributes-text">
                    {name.toUpperCase()}:
                  </p>
                  {type !== "swatch" &&
                    items.map((item) => {
                      const { displayValue, value, id } = item;
                      return (
                        <Attribute
                          key={nanoid()}
                          name={name}
                          displayValue={displayValue}
                          value={value}
                          id={id}
                          productId={this.props.product.id}
                          attributes={this.props.attributes}
                          attributeClick={this.props.cartItemAttributes}
                          compSize={this.props.compSize}
                        />
                      );
                    })}
                  {type === "swatch" &&
                    items.map((item) => {
                      const { displayValue, value, id } = item;
                      return (
                        <Swatch
                          key={nanoid()}
                          name={name}
                          displayValue={displayValue}
                          value={value}
                          id={id}
                          productId={this.props.product.id}
                          attributes={this.props.attributes}
                          swatchClick={this.props.cartItemAttributes}
                          compSize={this.props.compSize}
                        />
                      );
                    })}
                </div>
              );
            })}
          </div>
        </div>
        <div
          className={`cart-item-right-section ${
            this.props.compSize === "large"
              ? ""
              : "cart-item-right-section-small"
          }`}
        >
          <div
            className={`cart-item-quantity ${
              this.props.compSize === "large" ? "" : "cart-item-quantity-small"
            }`}
          >
            <Quantity
              compSize={this.props.compSize}
              type="increase"
              id={this.props.product.id}
              quantityClick={this.props.cartItemQuantity}
            >
              +
            </Quantity>
            <p className="cart-item-quantity-text">{this.props.quantity}</p>
            <Quantity
              compSize={this.props.compSize}
              type="decrease"
              id={this.props.product.id}
              quantityClick={this.props.cartItemQuantity}
            >
              -
            </Quantity>
          </div>
          <div
            className={`cart-item-image-container ${
              this.props.compSize === "large"
                ? ""
                : "cart-item-image-container-small"
            }`}
          >
            <img
              src={this.props.product.gallery[this.state.imageIndex]}
              alt={this.props.product.name}
              className="cart-item-image"
            />
            <div className="cart-item-image-overlay"></div>
            <span
              className={`cart-item-angle-left ${
                this.props.compSize === "large"
                  ? ""
                  : "cart-item-angle-left-small"
              }`}
              onClick={() => this.handleChangeImage("left")}
            >
              &#10094;
            </span>
            <span
              className={`cart-item-angle-right ${
                this.props.compSize === "large"
                  ? ""
                  : "cart-item-angle-right-small"
              }`}
              onClick={() => this.handleChangeImage("right")}
            >
              &#10095;
            </span>
          </div>
          <div
            className={`cart-item-remove-icon-container ${
              this.props.compSize === "large"
                ? ""
                : "cart-item-remove-icon-container-small"
            }`}
          >
            <button
              className={`cart-item-remove-icon ${
                this.props.compSize === "large"
                  ? ""
                  : "cart-item-remove-icon-small"
              }`}
              onClick={() => this.props.removeFromCart(this.props.product.id)}
            >
              &#10005;
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CartItem;
