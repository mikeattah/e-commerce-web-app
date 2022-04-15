import React, { Component } from "react";
import SelectedSize from "../SelectedSize/SelectedSize";
import SelectedQuantity from "../SelectedQuantity/SelectedQuantity";
import SmallImage from "../SmallImage/SmallImage";
import "./CartItem.css";

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: 0,
    };

    this.handleChangeImage = this.handleChangeImage.bind(this);
  }

  handleChangeImage(dir) {
    if (dir === "left") {
      if (this.state.image === 0) {
        this.setState({ image: this.props.product.gallery.length - 1 });
      } else {
        this.setState({ image: this.state.image - 1 });
      }
    } else if (dir === "right") {
      if (this.state.image === this.props.product.gallery.length - 1) {
        this.setState({ image: 0 });
      } else {
        this.setState({ image: this.state.image + 1 });
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
          <p className="cart-item-product-name">{this.props.product.name}</p>
          <p className="cart-item-product-brand">{this.props.product.brand}</p>
          <p className="cart-item-product-price">
            {symbol} {amount}
          </p>
          <div className="cart-item-product-sizes">
            {this.props.product.attributes[0].items.map((item) => {
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
            <p className="cart-item-quantity-text">{this.props.quantity}</p>
            <SelectedQuantity compSize={this.props.compSize}>
              -
            </SelectedQuantity>
          </div>
          <div className="cart-item-small-image-container">
            <SmallImage
              src={this.props.product.gallery[this.state.image]}
              alt={this.props.product.name}
              currentImage={null}
            />
            <div
              className="cart-item-image-left"
              onClick={() => this.handleChangeImage("left")}
            >
              &#12296;
            </div>
            <div
              className="cart-item-image-right"
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
