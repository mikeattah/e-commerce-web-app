import React, { Component } from "react";
import NavBar from "../../components/NavBar/NavBar";
import SmallImage from "../../components/SmallImage/SmallImage";
import ProductSize from "../../components/ProductSize/ProductSize";

class ProductPage extends Component {
  render() {
    return (
      <div class="container">
        <NavBar />
        <div class="main-container">
          <div>
            {images.map((image) => {
              return (
                <SmallImage
                  src={image.src}
                  alt="click to view image"
                  key={image.id}
                />
              );
            })}
          </div>
          <img src={images[0].src} alt="current in view image" />
          <div>
            <h3>{product.title}</h3>
            <p>{product.type}</p>
            <div>
              <p>SIZE:</p>
              {sizes.map((size) => {
                return <ProductSize key={size.id} title={size.size} />;
              })}
            </div>
            <p>PRICE:</p>
            <p>{product.price}</p>
          </div>
          <Button class="add-to-cart">ADD TO CART</Button>
          <p>{product.description}</p>
        </div>
      </div>
    );
  }
}

export default ProductPage;
