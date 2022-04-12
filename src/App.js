import React, { Component } from "react";
import NavBar from "./components/NavBar/NavBar";
import CategoryPage from "./containers/CategoryPage/CategoryPage";
import ProductPage from "./containers/ProductPage/ProductPage";
import CartPage from "./containers/CartPage/CartPage";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "categorypage",
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
    this.setState({ category: category, page: "categorypage" });
  }

  handleProductClick(product) {
    this.setState({ product: product, page: "productpage" });
  }

  handleCurrencyClick(currency) {
    this.setState({ currency: currency });
  }

  handleAddToCart() {
    this.setState({
      cart: [
        ...this.state.cart,
        {
          product: this.state.product,
          selectedSize: "",
          selectedQuantity: 1,
        },
      ],
    });
    this.handleCartTotal(this.state.currency);
  }

  handleCartTotal(currency) {
    let total = 0;
    for (let item of this.state.cart) {
      total += item.product.prices[i].amount;
    }
    this.setState({ cartTotal: total });
  }

  render() {
    return (
      <div className="app">
        <NavBar
          category={this.state.category}
          categoryClick={this.handleCategoryClick}
          currencyClick={this.handleCurrencyClick}
        />
        {(() => {
          switch (this.state.page) {
            case "categorypage":
              return (
                <CategoryPage
                  category={this.state.category}
                  currency={this.state.currency}
                  productClick={this.handleProductClick}
                />
              );
            case "productpage":
              return (
                <ProductPage
                  product={this.state.product}
                  currency={this.state.currency}
                  addToCart={this.handleAddToCart}
                />
              );
            case "cartpage":
              return (
                <CartPage
                  cart={this.state.cart}
                  cartTotal={this.state.cartTotal}
                />
              );
            default:
              return null;
          }
        })()}
      </div>
    );
  }
}

export default App;
