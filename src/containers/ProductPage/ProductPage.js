import React, { Component } from "react";
import { nanoid } from "nanoid";
import { Markup } from "interweave";
import SmallImage from "../../components/SmallImage/SmallImage";
import ProductSize from "../../components/ProductSize/ProductSize";
import FillButton from "../../components/FillButton/FillButton";
import { ProductPageHOC } from "../../hoc/ProductPageHOC";
class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: this.props.product.gallery[0],
      selectedSize: "",
    };

    this.handleImageToggle = this.handleImageToggle.bind(this);
    this.handleProductSize = this.handleProductSize.bind(this);
  }

  addToCart = () => {
    this.props.addToCart(this.props.product);
  };

  handleImageToggle(image) {
    this.setState({ image: image });
  }

  handleProductSize(value) {
    this.setState({ selectedSize: value });
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
        <div className="product-page-small-images-container">
          {this.props.product.gallery.map((image) => {
            return (
              <SmallImage
                key={nanoid()}
                src={image}
                alt="click to view"
                className="product-page-small-image"
                onClick={() => this.handleImageToggle(image)}
              />
            );
          })}
        </div>
        <img
          src={this.state.image}
          alt="Enlarged product"
          className="product-page-large-image"
        />
        <div className="product-page-details">
          <h3 className="product-page-title">{this.props.product.name}</h3>
          <p className="product-page-brand">{this.props.product.brand}</p>
          <div>
            <p className="product-page-size">SIZES:</p>
            {this.props.product.attributes.items.map((item) => {
              return (
                <ProductSize
                  displayValue={item.displayValue}
                  value={item.value}
                  key={item.id}
                  onClick={() => this.handleProductSize(item.value)}
                />
              );
            })}
          </div>
          <p className="product-page-price">PRICE:</p>
          <p className="product-page-price">
            {symbol} {amount}
          </p>
        </div>
        <FillButton
          onClick={() => this.addToCart()}
          disabled={!this.props.product.inStock}
        >
          ADD TO CART
        </FillButton>
        <div className="product-page-description">
          <Markup content={this.props.product.description} />
        </div>
      </div>
    );
  }
}

export default ProductPageHOC(ProductPage);
