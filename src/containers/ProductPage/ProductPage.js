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
    this.product = props.product;
    this.currency = props.currency;
    this.addToCart = props.addToCart;
    this.state = {
      image: this.product.gallery[0],
    };
  }

  // componentDidMount() {
  //   const { id } = this.props;
  //   const { loading, error, data } = useQuery(PRODUCT, {
  //     variables: { id },
  //   });
  //   if (loading) return <p>Loading...</p>;
  //   if (error) return <p>Error :(</p>;
  //   this.setState({ product: data.product });
  // }

  handleImageToggle(image) {
    return () => {
      this.setState({ image: image });
    };
  }

  render() {
    let label, symbol, amount;
    for (let price of this.product.prices) {
      if (price.currency.label === this.currency) {
        label = price.currency.label;
        symbol = price.currency.symbol;
        amount = price.amount;
      }
    }

    return (
      <div className="container">
        <div className="small-images-container">
          {this.product.gallery.map((image) => {
            return (
              <SmallImage
                key={nanoid()}
                src={image}
                alt="click to view"
                className="small-image"
                onClick={this.handleImageToggle(image)}
              />
            );
          })}
        </div>
        <img
          src={this.state.image}
          alt="Enlarged product"
          className="large-image"
        />
        <div className="product-details">
          <h3 className="product-title">{this.product.name}</h3>
          <p className="product-brand">{this.product.brand}</p>
          <div>
            <p className="product-size">SIZE:</p>
            {this.product.attributes.items.map((item) => {
              return (
                <ProductSize
                  displayValue={item.displayValue}
                  value={item.value}
                  key={item.id}
                />
              );
            })}
          </div>
          <p className="product-price">PRICE:</p>
          <p className="product-price">
            {symbol} {amount}
          </p>
        </div>
        <FillButton onClick={this.addToCart} disabled={!this.product.inStock}>
          ADD TO CART
        </FillButton>
        <div className="product-description">
          <Markup content={this.product.description} />
        </div>
      </div>
    );
  }
}

export default ProductPageHOC(ProductPage);
