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
        className={
          this.props.compSize === "large"
            ? "cart-item-large"
            : "cart-item-small"
        }
      >
        <div className="cart-item-left-section">
          <p className="cart-item-name">{this.props.product.name}</p>
          <p className="cart-item-brand">{this.props.product.brand}</p>
          <div className="cart-item-attributes-container">
            {this.props.product.attributes.map((attribute) => {
              const { id, name, type, items } = attribute;
              return (
                <div key={nanoid()} id={id} className="cart-item-attributes">
                  <p className="cart-item-attributes-text">{name}:</p>
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
          <p className="cart-item-price">
            {symbol} {amount}
          </p>
        </div>
        <div className="cart-item-right-section">
          <div className="cart-item-quantity">
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
          <div className="cart-item-image-container">
            <SmallImage
              src={this.props.product.gallery[this.state.imageIndex]}
              alt={this.props.product.name}
              currentImage={null}
              imageClick={this.handleImageClick}
            />
            <span
              className="cart-item-angle-left"
              onClick={() => this.handleChangeImage("left")}
            >
              &#10094;
            </span>
            <span
              className="cart-item-angle-right"
              onClick={() => this.handleChangeImage("right")}
            >
              &#10095;
            </span>
          </div>
          <div className="cart-item-remove-icon-container">
            <span
              className="cart-item-remove-icon"
              onClick={() => this.props.removeFromCart(this.props.product.id)}
            >
              &#10005;
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default CartItem;
