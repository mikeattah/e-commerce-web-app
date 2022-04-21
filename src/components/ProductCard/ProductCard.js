import React, { Component } from "react";
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
        onClick={() => this.props.productClick(this.props.id)}
      >
        <img
          src={this.props.gallery[0]}
          alt={this.props.name}
          className="product-card-image"
        />
        <div className="product-card-color-overlay"></div>
        <p className="product-card-title">{this.props.name}</p>
        {this.props.attributes.map((element) => {
          return (
            <div className="product-card-attributes">
              {element.type !== "swatch" &&
                element.items.forEach((item) => {
                  return (
                    <Attribute
                      key={item.id}
                      name={element.name}
                      displayValue={item.displayValue}
                      value={item.value}
                      id={item.id}
                      attributes={this.state.attributes}
                      attributeClick={this.handleProductCardAttributes}
                      compSize="small"
                    />
                  );
                })}
              {element.type === "swatch" &&
                element.items.forEach((item) => {
                  return (
                    <Swatch
                      key={item.id}
                      name={element.name}
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
        <div className="product-card-add-to-cart">
          <img
            src={require("../../assets/images/shopping-cart-white.png")}
            alt="Click icon to add product to cart, created by Kiranshastry - Flaticon https://www.flaticon.com/free-icons/shopping-cart"
            className="nav-bar-image"
            aria-label="Click icon to add product to cart"
            onClick={() =>
              this.props.categoryPageAddToCart(
                this.props.id,
                this.state.attributes
              )
            }
          />
        </div>
        <p className="product-card-price">
          {this.props.symbol} {this.props.amount}
        </p>
        <p
          className={`product-card-text-overlay-hidden ${
            this.props.inStock ? "" : "product-card-text-overlay-visible"
          }`}
        >
          OUT OF STOCK
        </p>
      </div>
    );
  }
}

export default ProductCard;
