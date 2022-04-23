import React, { Component } from "react";
import { nanoid } from "nanoid";
import Attribute from "../Attribute/Attribute";
import Swatch from "../Swatch/Swatch";
import "./ProductCard.css";

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attributes: [],
    };
  }

  componentDidMount() {
    let attributes = this.props.attributes;
    let name,
      value,
      temp = [];
    for (let attribute of attributes) {
      name = attribute.name;
      value = attribute.items[0].value;
      temp.push([name, value]);
    }
    this.setState({
      attributes: temp,
    });
  }

  handleProductCardAttributes = (name, value) => {
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
    return (
      <div
        className={`product-card ${
          this.props.inStock ? "" : "product-card-disabled"
        }`}
      >
        <img
          src={this.props.gallery[0]}
          alt={this.props.name}
          className="product-card-image"
        />
        <div
          className="product-card-color-overlay"
          onClick={() => this.props.productClick(this.props.id)}
        ></div>
        <p className="product-card-title">{this.props.name}</p>
        <div className="product-card-attributes-container">
          {this.props.attributes.map((attribute) => {
            return (
              <div key={nanoid()} className="product-card-attributes">
                <p className="product-card-attributes-text">
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
                        attributeClick={this.handleProductCardAttributes}
                        compSize="small"
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
                        swatchClick={this.handleProductCardAttributes}
                        compSize="small"
                      />
                    );
                  })}
              </div>
            );
          })}
        </div>
        <div
          className="product-card-add-to-cart"
          onClick={() =>
            this.props.categoryPageAddToCart(
              this.props.id,
              this.state.attributes
            )
          }
        >
          <img
            src={require("../../assets/images/shopping-cart-white.png")}
            alt="Click icon to add product to cart, created by Kiranshastry - Flaticon https://www.flaticon.com/free-icons/shopping-cart"
            className="nav-bar-image"
            aria-label="Click icon to add product to cart"
          />
        </div>
        <p className="product-card-price">
          {this.props.symbol} {this.props.amount}
        </p>
        <div
          className={`product-card-overlay-hidden ${
            this.props.inStock ? "" : "product-card-overlay-visible"
          }`}
        >
          <p>OUT OF STOCK</p>
        </div>
      </div>
    );
  }
}

export default ProductCard;
