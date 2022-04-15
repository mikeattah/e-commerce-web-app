import React, { Component } from "react";
import NavBar from "./components/NavBar/NavBar";
import MiniCart from "./components/MiniCart/MiniCart";
import CategoryPage from "./containers/CategoryPage/CategoryPage";
import ProductPage from "./containers/ProductPage/ProductPage";
import CartPage from "./containers/CartPage/CartPage";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "productpage",
      category: "all",
      id: "",
      product: {},
      size: "",
      quantity: 1,
      currency: "USD",
      cart: [],
      cartTotal: 1000000,
      isMiniCartOpen: true,
    };

    this.handleCategoryClick = this.handleCategoryClick.bind(this);
    this.handleProductClick = this.handleProductClick.bind(this);
    this.handleSelectedSize = this.handleSelectedSize.bind(this);
    this.handleSelectedQuantity = this.handleSelectedQuantity.bind(this);
    this.handleCurrencyClick = this.handleCurrencyClick.bind(this);
    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
    this.handleCartTotal = this.handleCartTotal.bind(this);
    this.handleMiniCartToggle = this.handleMiniCartToggle.bind(this);
    this.handleViewBag = this.handleViewBag.bind(this);
    this.handleContinueShopping = this.handleContinueShopping.bind(this);
    this.handleCheckOut = this.handleCheckOut.bind(this);
  }

  handleCategoryClick(category) {
    this.setState({ category: category, page: "categorypage" });
  }

  handleProductClick(id) {
    this.setState({ id: id, page: "productpage" });
  }

  handleSelectedSize(value) {
    this.setState({ size: value });
  }

  handleSelectedQuantity(type) {
    if (type === "increase") {
      this.setState({ quantity: this.state.quantity + 1 });
    } else if (type === "decrease") {
      if (this.state.quantity > 1) {
        this.setState({ quantity: this.state.quantity - 1 });
      }
    }
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
          size: this.state.size,
          quantity: this.state.quantity,
        },
      ],
    });
    this.handleCartTotal(this.state.currency);
  }

  handleRemoveFromCart(id) {
    let cart = this.state.cart;
    for (let item of cart) {
      if (item.product.id === id) {
        cart.splice(cart.indexOf(item), 1);
      }
    }
    this.setState({ cart: cart });
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

  handleContinueShopping() {
    this.setState({ page: "categorypage" });
  }

  handleCheckOut() {}

  render() {
    return (
      <div className="app">
        <NavBar
          category={this.state.category}
          cart={this.state.cart}
          cartTotal={this.state.cartTotal}
          miniCartOpen={this.state.isMiniCartOpen}
          categoryClick={this.handleCategoryClick}
          currencyClick={this.handleCurrencyClick}
          miniCartToggle={this.handleMiniCartToggle}
          viewBag={this.handleViewBag}
          checkOut={this.handleCheckOut}
        />
        <MiniCart
          cart={this.state.cart}
          cartTotal={this.state.cartTotal}
          miniCartOpen={this.state.isMiniCartOpen}
          removeFromCart={this.handleRemoveFromCart}
          viewBag={this.handleViewBag}
          checkOut={this.handleCheckOut}
        />
        {(() => {
          switch (this.state.page) {
            case "categorypage":
              return (
                <CategoryPage
                  category={this.state.category}
                  currency={this.state.currency}
                  miniCartOpen={this.state.isMiniCartOpen}
                  productClick={this.handleProductClick}
                  miniCartToggle={this.handleMiniCartToggle}
                />
              );
            case "productpage":
              return (
                <ProductPage
                  id={this.state.id}
                  size={this.state.size}
                  currency={this.state.currency}
                  miniCartOpen={this.state.isMiniCartOpen}
                  selectedSize={this.handleSelectedSize}
                  addToCart={this.handleAddToCart}
                  miniCartToggle={this.handleMiniCartToggle}
                />
              );
            case "cartpage":
              return (
                <CartPage
                  size={this.state.size}
                  quantity={this.state.quantity}
                  currency={this.state.currency}
                  cart={this.state.cart}
                  cartTotal={this.state.cartTotal}
                  miniCartOpen={this.state.isMiniCartOpen}
                  selectedSize={this.handleSelectedSize}
                  selectedQuantity={this.handleSelectedQuantity}
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
    );
  }
}

export default App;
