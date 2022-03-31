import React, { Component } from "react";
import NavBar from "../../components/NavBar/NavBar";
import CartItem from "../../components/CartItem/CartItem";

class ProductPage extends Component {
  render() {
    return (
      <div class="container">
        <NavBar />
        <h1>Cart</h1>
        <div class="main-container">
          {cart.map((item) => {
            return (
              <CartItem
                title={item.title}
                type={item.type}
                price={item.price}
                sizes={item.sizes}
                quantity={item.quantity}
                image={item.image}
              />
            );
          })}
        </div>
        <div>
          <p>Total: {total}</p>
          <Button class="outline-bttn-type">CONTINUE SHOPPING</Button>
          <Button class="fill-bttn-type">GO TO CHECK OUT</Button>
        </div>
      </div>
    );
  }
}

export default ProductPage;
