import React, { Component } from "react";
import { nanoid } from "nanoid";
import { Markup } from "interweave";
import SmallImage from "../../components/SmallImage/SmallImage";
import SelectedSize from "../../components/SelectedSize/SelectedSize";
import FillButton from "../../components/FillButton/FillButton";
import { ProductPageHOC } from "../../hoc/ProductPageHOC";
import "./ProductPage.css";

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: this.props.product.gallery[0],
    };

    this.handleImageToggle = this.handleImageToggle.bind(this);
  }

  addToCart = () => {
    this.props.addToCart();
  };

  handleImageToggle(image) {
    this.setState({ image: image });
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
      <div className="product-page">
        <div className="product-page-small-images">
          {this.props.product.gallery.map((image) => {
            return (
              <SmallImage
                key={nanoid()}
                src={image}
                alt="click to view"
                imageClick={this.handleImageToggle}
                currentImage={this.state.image}
              />
            );
          })}
        </div>
        <div className="product-page-large-image-box">
          <img
            src={this.state.image}
            alt="Enlarged product"
            className="product-page-large-image"
          />
          <div className="product-page-large-image-overlay"></div>
        </div>
        <div className="product-page-details">
          <h3 className="product-page-title">{this.props.product.name}</h3>
          <p className="product-page-brand">{this.props.product.brand}</p>
          <p className="product-page-size">SIZES:</p>
          <div className="product-page-size-container">
            {this.props.product.attributes[0].items.map((item) => {
              return (
                <SelectedSize
                  displayValue={item.displayValue}
                  value={item.value}
                  key={item.id}
                  size={this.props.size}
                  selectedSize={this.props.selectedSize}
                  compSize="large"
                />
              );
            })}
          </div>
          <p className="product-page-price-desc">PRICE:</p>
          <p className="product-page-price-amnt">
            {symbol} {amount}
          </p>
          <FillButton
            buttonClick={this.addToCart}
            disabled={!this.props.product.inStock}
            compSize="large"
          >
            ADD TO CART
          </FillButton>
          <div className="product-page-description">
            <Markup content={this.props.product.description} />
          </div>
        </div>
        <div
          className={
            this.props.miniCartOpen
              ? "product-page-overlay"
              : "product-page-overlay-hidden"
          }
          onClick={() => this.props.miniCartToggle()}
        ></div>
      </div>
    );
  }
}

export default ProductPageHOC(ProductPage);
