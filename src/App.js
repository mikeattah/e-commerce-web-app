import React, { Component } from "react";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import CategoryPage from "./containers/CategoryPage/CategoryPage";
import ProductPage from "./containers/ProductPage/ProductPage";
import CartPage from "./containers/CartPage/CartPage";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "all",
      product: "",
      currency: "USD",
      cart: [],
      cartTotal: 0,
    };

    this.handleCategoryClick = this.handleCategoryClick.bind(this);
    this.handleProductClick = this.handleProductClick.bind(this);
    this.handleCurrencyClick = this.handleCurrencyClick.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
  }

  handleCategoryClick(category) {
    this.setState({ category: category });
  }

  handleProductClick(product) {
    this.setState({ product: product });
  }

  handleCurrencyClick(currency) {
    this.setState({ currency: currency });
  }

  handleAddToCart() {
    this.setState({
      cart: [...this.state.cart, { product: this.state.product, qty: 1 }],
      cartTotal: this.state.cartTotal + 1,
    });
  }

  render() {
    return (
      <div className="app">
        <NavBar
          category={this.state.category}
          categoryClick={this.handleCategoryClick}
          currencyClick={this.handleCurrencyClick}
        />
        <CategoryPage
          category={this.state.category}
          currency={this.state.currency}
          productClick={this.handleProductClick}
        />
        {/* <ProductPage
          product={this.state.product}
          currency={this.state.currency}
          addToCart={this.handleAddToCart}
        />
        <CartPage cart={this.state.cart} cartTotal={this.state.cartTotal} /> */}
      </div>
    );
  }
}

export default App;
