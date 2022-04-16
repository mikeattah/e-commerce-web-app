import React, { Component } from "react";
import Attributes from "../Attributes/Attributes";
import Quantity from "../Quantity/Quantity";
import SmallImage from "../SmallImage/SmallImage";
import "./CartItem.css";

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageIndex: 0,
    };

    this.handleChangeImage = this.handleChangeImage.bind(this);
  }

  handleChangeImage(dir) {
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
  }

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
        <div className="cart-item-left">
          <p className="cart-item-name">{this.props.product.name}</p>
          <p className="cart-item-brand">{this.props.product.brand}</p>
          <p className="cart-item-price">
            {symbol} {amount}
          </p>
          <div className="cart-item-attributes-container">
            {this.props.product.attributes.map((element) => {
              return (
                <div className="cart-item-attributes">
                  {element.items.forEach((item) => {
                    return (
                      <Attributes
                        name={element.name}
                        displayValue={item.value}
                        value={item.value}
                        key={item.id}
                        attributes={this.props.attributes}
                        cartItemAttributes={this.props.cartItemAttributes}
                        compSize={this.props.compSize}
                        container="cart"
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
        <div className="cart-item-right">
          <div className="cart-item-quantity">
            <Quantity
              compSize={this.props.compSize}
              type="increase"
              cartItemQuantity={this.props.cartItemQuantity}
            >
              +
            </Quantity>
            <p className="cart-item-quantity-text">{this.props.quantity}</p>
            <Quantity
              compSize={this.props.compSize}
              type="decrease"
              cartItemQuantity={this.props.cartItemQuantity}
            >
              -
            </Quantity>
          </div>
          <div className="cart-item-image-container">
            <SmallImage
              src={this.props.product.gallery[this.state.imageIndex]}
              alt={this.props.product.name}
              currentImage={null}
            />
            <div
              className="cart-item-angle-left"
              onClick={() => this.handleChangeImage("left")}
            >
              &#12296;
            </div>
            <div
              className="cart-item-angle-right"
              onClick={() => this.handleChangeImage("right")}
            >
              &#12297;
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CartItem;
