import React, { PureComponent } from "react";
import { nanoid } from "nanoid";
import Attribute from "../Attribute/Attribute";
import Swatch from "../Swatch/Swatch";
import "./ProductCard.css";

class ProductCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      attributes: [],
      loading: true,
    };
  }

  componentDidMount() {
    let name,
      value,
      temp = [];
    this.props.attributes.forEach((attribute) => {
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
    const {
      id,
      name,
      inStock,
      gallery,
      attributes,
      label,
      symbol,
      amount,
      brand,
      productClick,
      addToCart,
    } = this.props;
    if (this.state.loading) return <div>Loading...</div>;
    return (
      <div className={`product-card ${inStock ? "" : "product-card-disabled"}`}>
        <img
          src={gallery[0]}
          alt={name}
          className="product-card-image"
          onClick={() => {
            productClick(id, this.state.attributes);
          }}
        />
        <p className="product-card-title">
          {brand} {name}
        </p>
        <div className="product-card-attributes-container">
          {attributes.map((attribute) => {
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
                        productId={id}
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
                        productId={id}
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
            addToCart(id, this.state.attributes);
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
          {symbol} {amount}
        </p>
        <div
          className={`product-card-overlay-hidden ${
            inStock ? "" : "product-card-overlay-visible"
          }`}
          onClick={() => {
            productClick(id, this.state.attributes);
          }}
        >
          <p>OUT OF STOCK</p>
        </div>
      </div>
    );
  }
}

export default ProductCard;
