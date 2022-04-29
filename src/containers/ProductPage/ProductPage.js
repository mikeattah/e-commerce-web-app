import React, { Component } from "react";
import { nanoid } from "nanoid";
import { Markup } from "interweave";
import SmallImage from "../../components/SmallImage/SmallImage";
import Attribute from "../../components/Attribute/Attribute";
import FillButton from "../../components/FillButton/FillButton";
import Swatch from "../../components/Swatch/Swatch";
import "./ProductPage.css";

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      image: "",
      attributes: [],
      loading: true,
    };
  }

  componentDidMount() {
    let categories = this.props.categories;
    for (let category of categories) {
      let products = category.products;
      for (let product of products) {
        if (product.id === this.props.id) {
          this.setState({
            product: product,
            image: product.gallery[0],
            attributes: this.props.attributes,
            loading: false,
          });
          return;
        }
      }
    }
  }

  addToCart = () => {
    this.props.addToCart(this.props.id, this.state.attributes);
  };

  handleImageToggle = (image) => {
    this.setState({ image: image });
  };

  handleProductPageAttributes = (id, name, value) => {
    let attributes = this.state.attributes;
    for (let i = 0; i < attributes.length; i++) {
      if (attributes[i][0] === name) {
        attributes[i][1] = value;
        break;
      }
    }
    this.setState({ attributes: attributes });
  };

  render() {
    if (this.state.loading) return <div>Loading...</div>;
    let prices = this.state.product.prices;
    let symbol, amount;
    for (let price of prices) {
      if (price.currency.label === this.props.currency) {
        symbol = price.currency.symbol;
        amount = this.props.numberFormat(price.amount);
      }
    }
    return (
      <div className="product-page">
        <div className="product-page-small-images-container">
          {this.state.product.gallery.map((image) => {
            return (
              <div className="product-page-small-image">
                <SmallImage
                  key={nanoid()}
                  src={image}
                  alt="click to view"
                  imageClick={this.handleImageToggle}
                  currentImage={this.state.image}
                />
              </div>
            );
          })}
        </div>
        <div className="product-page-large-image-container">
          <img
            src={this.state.image}
            alt="Enlarged product"
            className="product-page-large-image"
          />
          <div className="product-page-large-image-overlay"></div>
        </div>
        <div className="product-page-details">
          <h3 className="product-page-title">{this.state.product.brand}</h3>
          <p className="product-page-brand">{this.state.product.name}</p>
          <div className="product-page-attributes-container">
            {this.state.product.attributes.map((attribute) => {
              const { id, name, type, items } = attribute;
              return (
                <div key={nanoid()} id={id} className="product-page-attributes">
                  <p className="product-page-attributes-text">
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
                          productId={this.state.product.id}
                          attributes={this.state.attributes}
                          attributeClick={this.handleProductPageAttributes}
                          compSize="large"
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
                          productId={this.state.product.id}
                          attributes={this.state.attributes}
                          swatchClick={this.handleProductPageAttributes}
                          compSize="large"
                        />
                      );
                    })}
                </div>
              );
            })}
          </div>
          <p className="product-page-price-desc">Price:</p>
          <p className="product-page-price-amnt">
            {symbol} {amount}
          </p>
          <FillButton
            buttonClick={this.addToCart}
            disabled={!this.state.product.inStock}
            compSize="large"
          >
            ADD TO CART
          </FillButton>
          <div className="product-page-description">
            <Markup content={this.state.product.description} />
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

export default ProductPage;
