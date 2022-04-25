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
      page: "categorypage",
      currency: "USD",
      category: "all",
      cart: [],
      cartTotal: 0,
      cartQuantity: 0,
      id: "",
      attributes: [],
      miniCartOpen: false,
    };
  }

  handleCategoryClick = (category) => {
    this.setState({ category: category, page: "categorypage" });
  };

  handleProductClick = (id, attributes) => {
    this.setState({ id: id, attributes: attributes, page: "productpage" });
  };

  handleCartQuantity = () => {
    let cart = this.state.cart;
    let quantity = 0;
    for (let item of cart) {
      quantity += item.quantity;
    }
    this.setState({ cartQuantity: quantity });
  };

  handleCartTotal = () => {
    let total = 0;
    let cart = this.state.cart;
    for (let item of cart) {
      let i = 0;
      while (this.state.currency !== item.product.prices[i].currency.label) i++;
      total += item.product.prices[i].amount * item.quantity;
    }
    this.setState({ cartTotal: total });
  };

  handleCartItemAttributes = (id, name, value) => {
    let cart = this.state.cart;
    for (let item of cart) {
      if (item.product.id === id) {
        let attributes = item.attributes;
        for (let i = 0; i < attributes.length; i++) {
          if (attributes[i][0] === name) {
            attributes[i][1] = value;
          } else if (attributes[i][0] !== name && i === attributes.length - 1) {
            attributes.push([name, value]);
          }
        }
        break;
      }
    }
    this.setState({ cart: cart });
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
        break;
      }
    }
    this.setState({ cart: cart }, () => {
      this.handleCartQuantity();
      this.handleCartTotal();
    });
  };

  handleCurrencyClick = (currency) => {
    this.setState({ currency: currency }, () => {
      this.handleCartTotal();
    });
  };

  handleAddToCart = (product, attributes) => {
    let cart = this.state.cart;
    let check = true;
    for (let item of cart) {
      if (item.product.id === product.id) {
        item.attributes = attributes;
        item.quantity += 1;
        check = false;
        break;
      }
    }
    if (!check) {
      this.setState({ cart: cart }, () => {
        this.handleCartQuantity();
        this.handleCartTotal();
      });
    }
    if (check) {
      this.setState(
        {
          cart: [
            ...this.state.cart,
            {
              product: product,
              attributes: attributes,
              quantity: 1,
            },
          ],
        },
        () => {
          this.handleCartQuantity();
          this.handleCartTotal();
        }
      );
    }
  };

  handleRemoveFromCart = (id) => {
    let cart = this.state.cart;
    for (let item of cart) {
      if (item.product.id === id) {
        cart.splice(cart.indexOf(item), 1);
        break;
      }
    }
    this.setState({ cart: cart }, () => {
      this.handleCartQuantity();
      this.handleCartTotal();
    });
  };

  handleMiniCartToggle = () => {
    this.setState({ miniCartOpen: !this.state.miniCartOpen });
  };

  handleViewBag = () => {
    this.setState({
      page: "cartpage",
      miniCartOpen: !this.state.miniCartOpen,
    });
  };

  handlePlaceOrder = () => {};

  handleNumberFormat = (number) => {
    return parseFloat(parseFloat(number).toFixed(2)).toLocaleString("en-US", {
      useGrouping: true,
    });
  };

  render() {
    const taxRate = 0.075;
    const subTotal = this.handleNumberFormat(this.state.cartTotal);
    const tax = this.handleNumberFormat(this.state.cartTotal * taxRate);
    const total = this.handleNumberFormat(
      this.state.cartTotal + this.state.cartTotal * taxRate
    );
    return (
      <ApolloProvider client={client}>
        <div className="app">
          <NavBar
            category={this.state.category}
            cartQuantity={this.state.cartQuantity}
            miniCartOpen={this.state.miniCartOpen}
            categoryClick={this.handleCategoryClick}
            currencyClick={this.handleCurrencyClick}
            miniCartToggle={this.handleMiniCartToggle}
            client={client}
          />
          <MiniCart
            currency={this.state.currency}
            cart={this.state.cart}
            total={total}
            cartQuantity={this.state.cartQuantity}
            miniCartOpen={this.state.miniCartOpen}
            cartItemAttributes={this.handleCartItemAttributes}
            cartItemQuantity={this.handleCartItemQuantity}
            removeFromCart={this.handleRemoveFromCart}
            viewBag={this.handleViewBag}
            placeOrder={this.handlePlaceOrder}
            client={client}
          />
          {(() => {
            switch (this.state.page) {
              case "categorypage":
                return (
                  <CategoryPage
                    currency={this.state.currency}
                    category={this.state.category}
                    miniCartOpen={this.state.miniCartOpen}
                    productClick={this.handleProductClick}
                    addToCart={this.handleAddToCart}
                    miniCartToggle={this.handleMiniCartToggle}
                    numberFormat={this.handleNumberFormat}
                    client={client}
                  />
                );
              case "productpage":
                return (
                  <ProductPage
                    currency={this.state.currency}
                    id={this.state.id}
                    attributes={this.state.attributes}
                    miniCartOpen={this.state.miniCartOpen}
                    addToCart={this.handleAddToCart}
                    miniCartToggle={this.handleMiniCartToggle}
                    numberFormat={this.handleNumberFormat}
                    client={client}
                  />
                );
              case "cartpage":
                return (
                  <CartPage
                    currency={this.state.currency}
                    cart={this.state.cart}
                    subTotal={subTotal}
                    tax={tax}
                    total={total}
                    cartQuantity={this.state.cartQuantity}
                    miniCartOpen={this.state.miniCartOpen}
                    cartItemAttributes={this.handleCartItemAttributes}
                    cartItemQuantity={this.handleCartItemQuantity}
                    removeFromCart={this.handleRemoveFromCart}
                    miniCartToggle={this.handleMiniCartToggle}
                    placeOrder={this.handlePlaceOrder}
                    client={client}
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
