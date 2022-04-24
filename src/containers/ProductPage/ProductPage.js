import React, { Component } from "react";
import { gql } from "@apollo/client";
import { nanoid } from "nanoid";
import { Markup } from "interweave";
import SmallImage from "../../components/SmallImage/SmallImage";
import Attribute from "../../components/Attribute/Attribute";
import FillButton from "../../components/FillButton/FillButton";
import Swatch from "../../components/Swatch/Swatch";
import "./ProductPage.css";

const GET_PRODUCT = gql`
  query GetProduct($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
      brand
    }
  }
`;
class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      image: "",
      attributes: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.props.client
      .query({
        query: GET_PRODUCT,
        variables: {
          id: this.props.id,
        },
      })
      .then((response) => {
        let attributes = response.data.product.attributes;
        let name,
          value,
          temp = [];
        for (let attribute of attributes) {
          name = attribute.name;
          value = attribute.items[0].value;
          temp.push([name, value]);
        }
        this.setState({
          product: response.data.product,
          image: response.data.product.gallery[0],
          attributes: temp,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          error: error,
        });
      });
  }

  addToCart = () => {
    this.props.addToCart(this.state.product, this.state.attributes);
  };

  handleImageToggle = (image) => {
    this.setState({ image: image });
  };

  handleProductPageAttributes = (name, value) => {
    let attributes = this.state.attributes;
    for (let i = 0; i < attributes.length; i++) {
      if (attributes[i][0] === name) {
        attributes[i][1] = value;
      }
    }
    this.setState({ attributes: attributes });
  };

  render() {
    if (this.state.loading) return <p>Loading...</p>;
    if (this.state.error) return <p>Error: {this.state.error}</p>;
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
        <div className="product-page-small-image-container">
          {this.state.product.gallery.map((image) => {
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
        <div className="product-page-large-image-container">
          <img
            src={this.state.image}
            alt="Enlarged product"
            className="product-page-large-image"
          />
          <div className="product-page-large-image-overlay"></div>
        </div>
        <div className="product-page-details">
          <h3 className="product-page-title">{this.state.product.name}</h3>
          <p className="product-page-brand">{this.state.product.brand}</p>
          <div className="product-page-attributes-container">
            {this.state.product.attributes.map((attribute) => {
              return (
                <div key={nanoid()} className="product-page-attributes">
                  <p className="product-page-attributes-text">
                    {attribute.name}:
                  </p>
                  {attribute.type !== "swatch" &&
                    attribute.items.map((item) => {
                      return (
                        <Attribute
                          key={item.id}
                          name={attribute.name}
                          displayValue={item.displayValue}
                          value={item.value}
                          id={item.id}
                          attributes={this.state.attributes}
                          attributeClick={this.handleProductPageAttributes}
                          compSize="large"
                        />
                      );
                    })}
                  {attribute.type === "swatch" &&
                    attribute.items.map((item) => {
                      return (
                        <Swatch
                          key={item.id}
                          name={attribute.name}
                          displayValue={item.displayValue}
                          value={item.value}
                          id={item.id}
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
