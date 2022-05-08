import React, { PureComponent } from "react";
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

  render() {
    const {
      id: productId,
      name,
      inStock,
      gallery,
      symbol,
      amount,
      brand,
      productClick,
      addToCart,
    } = this.props;
    const { attributes: attributesFromState, loading } = this.state;
    if (loading) return <div>Loading...</div>;
    return (
      <div className={`product-card ${inStock ? "" : "product-card-disabled"}`}>
        <img
          src={gallery[0]}
          alt={name}
          className="product-card-image"
          onClick={() => {
            productClick(productId, attributesFromState);
          }}
        />
        <p className="product-card-title">
          {brand} {name}
        </p>
        <div
          className="product-card-add-to-cart"
          onClick={() => {
            addToCart(productId, attributesFromState);
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
            productClick(productId, attributesFromState);
          }}
        >
          <p>OUT OF STOCK</p>
        </div>
      </div>
    );
  }
}

export default ProductCard;
