import React, { Component } from "react";
import SmallImage from "../../components/SmallImage/SmallImage";
import ProductSize from "../../components/ProductSize/ProductSize";
import FillButton from "../../components/FillButton/FillButton";

class ProductPage extends Component {
  render() {
    return (
      <div className="container">
        <div className="small-images-container">
          {images.map((image) => {
            return (
              <SmallImage
                src={image.src}
                alt="click to view image"
                key={image.id}
                className="small-image"
              />
            );
          })}
        </div>
        <img
          src={images[0].src}
          alt="current in view image"
          className="large-image"
        />
        <div className="product-details">
          <h3 className="product-title">{product.title}</h3>
          <p className="product-type">{product.type}</p>
          <div>
            <p className="product-size">SIZE:</p>
            {sizes.map((size) => {
              return <ProductSize key={size.id} title={size.size} />;
            })}
          </div>
          <p className="product-price">PRICE:</p>
          <p className="product-price">{product.price}</p>
        </div>
        <FillButton>ADD TO CART</FillButton>
        <p className="product-description">{product.description}</p>
      </div>
    );
  }
}

export default ProductPage;
