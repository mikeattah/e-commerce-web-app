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
      loading: true,
    };
  }

  componentDidMount() {
    const attributes = this.props.attributes;
    let name,
      value,
      temp = [];
    attributes.forEach((attribute) => {
      name = attribute.name;
      value = attribute.items[0].value;
      temp.push([name, value]);
    });
    this.setState({
      attributes: temp,
      loading: false,
    });
  }

  handleProductCardAttributes = (id, name, value) => {
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
    if (this.state.loading) return <div>Loading...</div>;
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
          onClick={() => {
            this.props.productClick(this.props.id, this.state.attributes);
          }}
        />
        <p className="product-card-title">
          {this.props.brand} {this.props.name}
        </p>
        <div className="product-card-attributes-container">
          {this.props.attributes.map((attribute) => {
            const { id, name, type, items } = attribute;
            return (
              <div key={nanoid()} id={id} className="product-card-attributes">
                <p className="product-card-attributes-text">
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
                        productId={this.props.id}
                        attributes={this.state.attributes}
                        attributeClick={this.handleProductCardAttributes}
                        compSize="small"
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
                        productId={this.props.id}
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
          onClick={() => {
            this.props.addToCart(this.props.id, this.state.attributes);
          }}
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
          onClick={() => {
            this.props.productClick(this.props.id, this.state.attributes);
          }}
        >
          <p>OUT OF STOCK</p>
        </div>
      </div>
    );
  }
}

export default ProductCard;
