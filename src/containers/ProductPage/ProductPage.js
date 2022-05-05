import React, { Component } from "react";
import { nanoid } from "nanoid";
import { Markup } from "interweave";
import Attribute from "../../components/Attribute/Attribute";
import FillButton from "../../components/FillButton/FillButton";
import Loading from "../../components/Loading/Loading";
import SmallImage from "../../components/SmallImage/SmallImage";
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
    const categories = this.props.categories;
    for (const category of categories) {
      const products = category.products;
      for (const product of products) {
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
    const attributes = this.state.attributes;
    for (let i = 0; i < attributes.length; i++) {
      if (attributes[i][0] === name) {
        attributes[i][1] = value;
        break;
      }
    }
    this.setState({ attributes: attributes });
  };

  render() {
    const {
      currency,
      categories,
      id,
      attributes: attributesFromProps,
      miniCartOpen,
      addToCart,
      miniCartToggle,
      numberFormat,
    } = this.props;
    const {
      product,
      image,
      attributes: attributesFromState,
      loading,
    } = this.state;
    if (loading) return <Loading />;
    let symbol, amount;
    product.prices.forEach((price) => {
      if (price.currency.label === currency) {
        symbol = price.currency.symbol;
        amount = numberFormat(price.amount);
      }
    });
    return (
      <div className="product-page">
        <div className="product-page-small-images-container">
          {product.gallery.map((image) => {
            return (
              <div className="product-page-small-image">
                <SmallImage
                  key={nanoid()}
                  src={image}
                  alt="click to view"
                  imageClick={this.handleImageToggle}
                  currentImage={image}
                />
              </div>
            );
          })}
        </div>
        <div className="product-page-large-image-container">
          <img
            src={image}
            alt="Enlarged product"
            className="product-page-large-image"
          />
          <div className="product-page-large-image-overlay"></div>
        </div>
        <div className="product-page-details">
          <h1 className="product-page-title">{product.brand}</h1>
          <p className="product-page-brand">{product.name}</p>
          <div className="product-page-attributes-container">
            {product.attributes.map((attribute) => {
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
                          productId={product.id}
                          attributes={attributesFromState}
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
                          productId={product.id}
                          attributes={attributesFromState}
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
            disabled={!product.inStock}
            compSize="large"
          >
            ADD TO CART
          </FillButton>
          <div className="product-page-description">
            <Markup content={product.description} />
          </div>
        </div>
        <div
          className={
            miniCartOpen
              ? "product-page-overlay"
              : "product-page-overlay-hidden"
          }
          onClick={() => miniCartToggle()}
        ></div>
      </div>
    );
  }
}

export default ProductPage;
