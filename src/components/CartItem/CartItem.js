import React, { PureComponent } from "react";
import { nanoid } from "nanoid";
import Attribute from "../Attribute/Attribute";
import Quantity from "../Quantity/Quantity";
import Swatch from "../Swatch/Swatch";
import "./CartItem.css";

class CartItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imageIndex: 0,
    };
  }

  handleChangeImage = (dir) => {
    const { imageIndex } = this.state;
    if (dir === "left") {
      if (imageIndex === 0) {
        this.setState({ imageIndex: this.props.product.gallery.length - 1 });
      } else {
        this.setState({ imageIndex: imageIndex - 1 });
      }
    } else if (dir === "right") {
      if (imageIndex === this.props.product.gallery.length - 1) {
        this.setState({ imageIndex: 0 });
      } else {
        this.setState({ imageIndex: imageIndex + 1 });
      }
    }
  };

  render() {
    const {
      product,
      attributes,
      cartItemAttributes,
      quantity,
      cartItemQuantity,
      removeFromCart,
      currency,
      numberFormat,
      compSize,
    } = this.props;
    const { imageIndex } = this.state;
    let symbol, amount;
    product.prices.forEach((price) => {
      if (price.currency.label === currency) {
        symbol = price.currency.symbol;
        amount = numberFormat(price.amount);
      }
    });
    return (
      <div
        className={`cart-item ${compSize === "large" ? "" : "cart-item-small"}`}
      >
        <div
          className={`cart-item-left-section ${
            compSize === "large" ? "" : "cart-item-left-section-small"
          }`}
        >
          <p className="cart-item-brand">{product.brand}</p>
          <p className="cart-item-name">{product.name}</p>
          <p className="cart-item-price">
            {symbol} {amount}
          </p>
          <div className="cart-item-attributes-container">
            {product.attributes.map((attribute) => {
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
                          productId={product.id}
                          attributes={attributes}
                          attributeClick={cartItemAttributes}
                          compSize={compSize}
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
                          productId={product.id}
                          attributes={attributes}
                          swatchClick={cartItemAttributes}
                          compSize={compSize}
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
            compSize === "large" ? "" : "cart-item-right-section-small"
          }`}
        >
          <div
            className={`cart-item-quantity ${
              compSize === "large" ? "" : "cart-item-quantity-small"
            }`}
          >
            <Quantity
              compSize={compSize}
              type="increase"
              id={product.id}
              quantityClick={cartItemQuantity}
            >
              +
            </Quantity>
            <p className="cart-item-quantity-text">{quantity}</p>
            <Quantity
              compSize={compSize}
              type="decrease"
              id={product.id}
              quantityClick={cartItemQuantity}
            >
              -
            </Quantity>
          </div>
          <div
            className={`cart-item-image-container ${
              compSize === "large" ? "" : "cart-item-image-container-small"
            }`}
          >
            <img
              src={product.gallery[imageIndex]}
              alt={product.name}
              className="cart-item-image"
            />
            <div className="cart-item-image-overlay"></div>
            <button
              className={`cart-item-angle-left ${
                compSize === "large" ? "" : "cart-item-angle-left-small"
              }`}
              onClick={() => this.handleChangeImage("left")}
            >
              &#10094;
            </button>
            <button
              className={`cart-item-angle-right ${
                compSize === "large" ? "" : "cart-item-angle-right-small"
              }`}
              onClick={() => this.handleChangeImage("right")}
            >
              &#10095;
            </button>
          </div>
          <div
            className={`cart-item-remove-icon-container ${
              compSize === "large"
                ? ""
                : "cart-item-remove-icon-container-small"
            }`}
          >
            <button
              className={`cart-item-remove-icon ${
                compSize === "large" ? "" : "cart-item-remove-icon-small"
              }`}
              onClick={() => removeFromCart(product.id)}
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
