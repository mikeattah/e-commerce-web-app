import React, { Component } from "react";
import { gql } from "@apollo/client";
import { nanoid } from "nanoid";
import { Markup } from "interweave";
import SmallImage from "../../components/SmallImage/SmallImage";
import Attributes from "../../components/Attributes/Attributes";
import FillButton from "../../components/FillButton/FillButton";
import "./ProductPage.css";

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      image: "",
    };

    this.handleImageToggle = this.handleImageToggle.bind(this);
  }

  componentDidMount() {
    this.props.client
      .query(
        {
          query: gql`
            query ($id: String!) {
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
          `,
        },
        {
          variables: {
            id: this.props.id,
          },
        }
      )
      .then((response) => {
        this.setState({
          product: response.data.product,
          image: response.data.product.gallery[0],
        });
      });
  }

  addToCart = () => {
    this.props.addToCart();
  };

  handleImageToggle(image) {
    this.setState({ image: image });
  }

  render() {
    let symbol, amount;
    for (let price of this.state.product.prices) {
      if (price.currency.label === this.props.currency) {
        symbol = price.currency.symbol;
        amount = price.amount;
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
          {/* adjust attributes */}
          <div className="product-page-attributes-container">
            {this.state.product.attributes.map((element) => {
              return (
                <div className="product-page-attributes">
                  <p className="product-page-attributes-text">
                    {element.name.toUpperCase()}:
                  </p>
                  {element.items.forEach((item) => {
                    return (
                      <Attributes
                        displayValue={item.displayValue}
                        value={item.value}
                        key={item.id}
                        attributes={this.props.attributes}
                        selectedAttributes={this.props.selectedAttributes}
                        compSize="large"
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
          <p className="product-page-price-desc">PRICE:</p>
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
