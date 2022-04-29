import React, { Component } from "react";
import { ApolloClient, ApolloProvider } from "@apollo/client";
import cache from "./store/cache";
import cartItemsVar from "./store/cartItemsVar";
import GetAllData from "./GetAllData";
import NavBar from "./components/NavBar/NavBar";
import MiniCart from "./components/MiniCart/MiniCart";
import CategoryPage from "./containers/CategoryPage/CategoryPage";
import ProductPage from "./containers/ProductPage/ProductPage";
import CartPage from "./containers/CartPage/CartPage";
import "./App.css";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache,
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "categorypage",
      currency: "USD",
      currencies: [],
      category: "all",
      categories: [],
      categoryNames: [],
      cartItems: [],
      cartTotal: 0,
      cartQuantity: 0,
      id: "",
      attributes: [],
      miniCartOpen: true,
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    client
      .query({
        query: GetAllData,
      })
      .then((response) => {
        let categories = response.data.categories;
        let categoryNames = [];
        for (let category of categories) {
          categoryNames.push(category.name);
        }
        this.setState({
          categories: categories,
          categoryNames: categoryNames,
          currencies: response.data.currencies,
          cartItems: response.data.cartItems,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          error: error,
        });
      });
  }

  handleCategoryClick = (category) => {
    this.setState({ category: category, page: "categorypage" });
  };

  handleProductClick = (id, attributes) => {
    this.setState({ id: id, attributes: attributes, page: "productpage" });
  };

  handleGetProduct = (id) => {
    let categories = this.state.categories;
    for (let category of categories) {
      let products = category.products;
      for (let product of products) {
        if (product.id === id) {
          return product;
        }
      }
    }
  };

  handleCartQuantity = () => {
    let cartItems = this.state.cartItems;
    let quantity = 0;
    for (let item of cartItems) {
      quantity += item.quantity;
    }
    this.setState({ cartQuantity: quantity });
  };

  handleCartTotal = () => {
    let cartItems = this.state.cartItems;
    let total = 0;
    for (let item of cartItems) {
      let i = 0;
      while (this.state.currency !== item.product.prices[i].currency.label) i++;
      total += item.product.prices[i].amount * item.quantity;
    }
    this.setState({ cartTotal: total });
  };

  handleSaveCartItems = () => {
    window.localStorage.setItem(
      "eCommerceWebApp.cartItems",
      JSON.stringify(cartItemsVar())
    );
  };

  handleCartItemAttributes = (id, name, value) => {
    let cartItems = this.state.cartItems;
    let check = false;
    for (let item of cartItems) {
      if (item.id === id) {
        let attributes = item.attributes;
        for (let i = 0; i < attributes.length; i++) {
          if (attributes[i][0] === name) {
            check = true;
            attributes[i][1] = value;
          }
        }
        if (!check) attributes.push([name, value]);
        break;
      }
    }
    cartItemsVar(cartItems);
    this.handleSaveCartItems();
    this.setState({ cartItems: cartItems });
  };

  handleCartItemQuantity = (id, type) => {
    let cartItems = this.state.cartItems;
    for (let item of cartItems) {
      if (item.id === id) {
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
    cartItemsVar(cartItems);
    this.handleSaveCartItems();
    this.setState({ cartItems: cartItems }, () => {
      this.handleCartQuantity();
      this.handleCartTotal();
    });
  };

  handleCurrencyClick = (currency) => {
    this.setState({ currency: currency }, () => {
      this.handleCartTotal();
    });
  };

  handleAddToCart = (id, attributes) => {
    let cartItems = this.state.cartItems,
      check = false;
    for (let item of cartItems) {
      if (item.id === id) {
        check = true;
        item.attributes = attributes;
        item.quantity += 1;
        break;
      }
    }
    if (check) {
      cartItemsVar(cartItems);
      this.handleSaveCartItems();
      this.setState({ cartItems: cartItems }, () => {
        this.handleCartQuantity();
        this.handleCartTotal();
      });
      return;
    }
    cartItems.push({
      id: id,
      attributes: attributes,
      quantity: 1,
    });
    cartItemsVar(cartItems);
    this.handleSaveCartItems();
    this.setState({ cartItems: cartItems }, () => {
      this.handleCartQuantity();
      this.handleCartTotal();
    });
  };

  handleRemoveFromCart = (id) => {
    let cartItems = this.state.cartItems;
    for (let item of cartItems) {
      if (item.id === id) {
        cartItems.splice(cartItems.indexOf(item), 1);
        break;
      }
    }
    cartItemsVar(cartItems);
    this.handleSaveCartItems();
    this.setState({ cartItems: cartItems }, () => {
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
    if (this.state.loading) return <div>Loading...</div>;
    if (this.state.error) return <div>Error: {this.state.error.message}</div>;
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
            currencies={this.state.currencies}
            category={this.state.category}
            categoryNames={this.state.categoryNames}
            cartQuantity={this.state.cartQuantity}
            miniCartOpen={this.state.miniCartOpen}
            categoryClick={this.handleCategoryClick}
            currencyClick={this.handleCurrencyClick}
            miniCartToggle={this.handleMiniCartToggle}
          />
          <MiniCart
            currency={this.state.currency}
            currencies={this.state.currencies}
            cartItems={this.state.cartItems}
            subTotal={subTotal}
            total={total}
            cartQuantity={this.state.cartQuantity}
            miniCartOpen={this.state.miniCartOpen}
            getProduct={this.handleGetProduct}
            cartItemAttributes={this.handleCartItemAttributes}
            cartItemQuantity={this.handleCartItemQuantity}
            removeFromCart={this.handleRemoveFromCart}
            viewBag={this.handleViewBag}
            placeOrder={this.handlePlaceOrder}
          />
          {(() => {
            switch (this.state.page) {
              case "categorypage":
                return (
                  <CategoryPage
                    currency={this.state.currency}
                    category={this.state.category}
                    categories={this.state.categories}
                    categoryNames={this.state.categoryNames}
                    miniCartOpen={this.state.miniCartOpen}
                    productClick={this.handleProductClick}
                    addToCart={this.handleAddToCart}
                    miniCartToggle={this.handleMiniCartToggle}
                    numberFormat={this.handleNumberFormat}
                  />
                );
              case "productpage":
                return (
                  <ProductPage
                    currency={this.state.currency}
                    categories={this.state.categories}
                    id={this.state.id}
                    attributes={this.state.attributes}
                    miniCartOpen={this.state.miniCartOpen}
                    addToCart={this.handleAddToCart}
                    miniCartToggle={this.handleMiniCartToggle}
                    numberFormat={this.handleNumberFormat}
                  />
                );
              case "cartpage":
                return (
                  <CartPage
                    currency={this.state.currency}
                    currencies={this.state.currencies}
                    categories={this.state.categories}
                    cartItems={this.state.cartItems}
                    subTotal={subTotal}
                    tax={tax}
                    total={total}
                    cartQuantity={this.state.cartQuantity}
                    miniCartOpen={this.state.miniCartOpen}
                    getProduct={this.handleGetProduct}
                    cartItemAttributes={this.handleCartItemAttributes}
                    cartItemQuantity={this.handleCartItemQuantity}
                    removeFromCart={this.handleRemoveFromCart}
                    miniCartToggle={this.handleMiniCartToggle}
                    placeOrder={this.handlePlaceOrder}
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
