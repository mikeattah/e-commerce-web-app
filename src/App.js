import React, { Component } from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import NavBar from "./components/NavBar/NavBar";
import MiniCart from "./components/MiniCart/MiniCart";
import CategoryPage from "./containers/CategoryPage/CategoryPage";
import ProductPage from "./containers/ProductPage/ProductPage";
import CartPage from "./containers/CartPage/CartPage";
import "./App.css";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "cartpage",
      currency: "USD",
      category: "all",
      cart: [],
      cartTotal: 1000000,
      cartQuantity: 0,
      id: "",
      attributes: [], // 2d array of [name, value] pairs of attributes selected; Remove??
      isMiniCartOpen: true,
    };
  }

  handleCategoryClick = (category) => {
    this.setState({ category: category, page: "categorypage" });
  };

  handleProductClick = (id) => {
    this.setState({ id: id, page: "productpage" });
  };

  handleCartItemAttributes = (id, name, value) => {
    let cart = this.state.cart;
    for (let item of cart) {
      if (item.product.id === id) {
        let chk = false;
        let attributes = item.attributes;
        for (let i = 0; i < attributes.length; i++) {
          if (attributes[i][0] === name) {
            attributes[i][1] = value;
            chk = true;
          } else if (
            attributes[i][0] !== name &&
            chk === false &&
            i === attributes.length - 1
          ) {
            attributes.push([name, value]);
          }
        }
      }
    }
  };

  handleCartItemQuantity = (id, type) => {
    let cart = this.state.cart;
    for (let item of cart) {
      if (item.product.id === id) {
        if (type === "increase") {
          item.quantity += 1;
        } else if (type === "decrease") {
          if (item.quantity > 1) {
            item.quantity -= 1;
          }
        }
      }
    }
  };

  handleCurrencyClick = (currency) => {
    this.setState({ currency: currency });
  };

  handleAddToCart = (product, attributes) => {
    this.setState({
      cart: [
        ...this.state.cart,
        {
          product: product,
          attributes: attributes,
          quantity: 1,
        },
      ],
      attributes: [],
    });
    this.handleCartTotal(this.state.currency);
    this.handleCartQuantity();
  };

  handleRemoveFromCart = (id) => {
    let cart = this.state.cart;
    for (let item of cart) {
      if (item.product.id === id) {
        cart.splice(cart.indexOf(item), 1);
      }
    }
    this.setState({ cart: cart });
    this.handleCartTotal(this.state.currency);
    this.handleCartQuantity();
  };

  handleCartTotal = () => {
    let total = 0;
    let cart = this.state.cart;
    for (let item of cart) {
      let i = 0;
      while (this.state.currency !== item.product.prices[i].currency.label) i++;
      total += item.product.prices[i].amount;
    }
    this.setState({ cartTotal: total });
  };

  handleCartQuantity = () => {
    let cart = this.state.cart;
    let quantity = 0;
    for (let item of cart) {
      quantity += item.quantity;
    }
    this.setState({ cartQuantity: quantity });
  };

  handleMiniCartToggle = () => {
    this.setState({ isMiniCartOpen: !this.state.isMiniCartOpen });
  };

  handleViewBag = () => {
    this.setState({
      page: "cartpage",
      isMiniCartOpen: !this.state.isMiniCartOpen,
    });
  };

  handleContinueShopping = () => {
    this.setState({ page: "categorypage" });
  };

  handleCheckOut = () => {};

  render() {
    return (
      <ApolloProvider client={client}>
        <div className="app">
          <NavBar
            category={this.state.category}
            cartQuantity={this.state.cartQuantity}
            miniCartOpen={this.state.isMiniCartOpen}
            categoryClick={this.handleCategoryClick}
            currencyClick={this.handleCurrencyClick}
            miniCartToggle={this.handleMiniCartToggle}
            client={client}
          />
          <MiniCart
            currency={this.state.currency}
            cart={this.state.cart}
            cartTotal={this.state.cartTotal}
            cartQuantity={this.state.cartQuantity}
            miniCartOpen={this.state.isMiniCartOpen}
            cartItemAttributes={this.handleCartItemAttributes}
            cartItemQuantity={this.handleCartItemQuantity}
            removeFromCart={this.handleRemoveFromCart}
            viewBag={this.handleViewBag}
            checkOut={this.handleCheckOut}
          />
          {(() => {
            switch (this.state.page) {
              case "categorypage":
                return (
                  <CategoryPage
                    currency={this.state.currency}
                    category={this.state.category}
                    miniCartOpen={this.state.isMiniCartOpen}
                    productClick={this.handleProductClick}
                    addToCart={this.handleAddToCart}
                    miniCartToggle={this.handleMiniCartToggle}
                    client={client}
                  />
                );
              case "productpage":
                return (
                  <ProductPage
                    currency={this.state.currency}
                    id={this.state.id}
                    miniCartOpen={this.state.isMiniCartOpen}
                    addToCart={this.handleAddToCart}
                    miniCartToggle={this.handleMiniCartToggle}
                    client={client}
                  />
                );
              case "cartpage":
                return (
                  <CartPage
                    currency={this.state.currency}
                    cart={this.state.cart}
                    cartTotal={this.state.cartTotal}
                    cartQuantity={this.state.cartQuantity}
                    miniCartOpen={this.state.isMiniCartOpen}
                    cartItemAttributes={this.handleCartItemAttributes}
                    cartItemQuantity={this.handleCartItemQuantity}
                    removeFromCart={this.handleRemoveFromCart}
                    miniCartToggle={this.handleMiniCartToggle}
                    continueShopping={this.handleContinueShopping}
                    checkOut={this.handleCheckOut}
                  />
                );
              default:
                return null;
            }
          })()}
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
