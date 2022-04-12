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
      page: "cartpage",
      category: "all",
      product: "",
      selectedSize: "",
      selectedQuantity: 1,
      currency: "USD",
      cart: [],
      cartTotal: 1000000,
      isMiniCartOpen: true,
    };

    this.handleCategoryClick = this.handleCategoryClick.bind(this);
    this.handleProductClick = this.handleProductClick.bind(this);
    this.handleSelectedSize = this.handleSelectedSize.bind(this);
    this.handleCurrencyClick = this.handleCurrencyClick.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleCartTotal = this.handleCartTotal.bind(this);
    this.handleMiniCartToggle = this.handleMiniCartToggle.bind(this);
    this.handleViewBag = this.handleViewBag.bind(this);
    this.handleCheckOut = this.handleCheckOut.bind(this);
  }

  handleCategoryClick(category) {
    this.setState({ category: category, page: "categorypage" });
  }

  handleProductClick(product) {
    this.setState({ product: product, page: "productpage" });
  }

  handleSelectedSize(value) {
    this.setState({ selectedSize: value });
  }

  handleSelectedQuantity(product) {}

  handleCurrencyClick(currency) {
    this.setState({ currency: currency });
  }

  handleAddToCart() {
    this.setState({
      cart: [
        ...this.state.cart,
        {
          product: this.state.product,
          selectedSize: this.state.selectedSize,
          selectedQuantity: this.state.selectedQuantity,
        },
      ],
    });
    this.handleCartTotal(this.state.currency);
  }

  handleCartTotal(currency) {
    let total = 0;
    for (let item of this.state.cart) {
      let i = 0;
      while (currency !== item.product.prices[i].currency.label) i++;
      total += item.product.prices[i].amount;
    }
    this.setState({ cartTotal: total });
  }

  handleMiniCartToggle() {
    this.setState({ isMiniCartOpen: !this.state.isMiniCartOpen });
  }

  handleViewBag() {
    this.setState({
      page: "cartpage",
      isMiniCartOpen: !this.state.isMiniCartOpen,
    });
  }

  handleCheckOut() {}

  render() {
    return (
      <div className="app">
        <NavBar
          category={this.state.category}
          categoryClick={this.handleCategoryClick}
          currencyClick={this.handleCurrencyClick}
          cart={this.state.cart}
          cartTotal={this.state.cartTotal}
          miniCartToggle={this.handleMiniCartToggle}
          miniCartOpen={this.state.isMiniCartOpen}
          viewBagClick={this.handleViewBag}
          checkOutClick={this.handleCheckOut}
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
                  selectedSize={this.handleSelectedSize}
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
