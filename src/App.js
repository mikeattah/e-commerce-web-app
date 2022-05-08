import React, { Component } from "react";
import Error from "./components/Error/Error";
import Loading from "./components/Loading/Loading";
import MiniCart from "./components/MiniCart/MiniCart";
import NavBar from "./components/NavBar/NavBar";
import CartPage from "./containers/CartPage/CartPage";
import CategoryPage from "./containers/CategoryPage/CategoryPage";
import ErrorBoundary from "./containers/ErrorBoundary/ErrorBoundary";
import ProductPage from "./containers/ProductPage/ProductPage";
import { GET_ALL_DATA } from "./operations/queries/getAllData";
import { cartItemsVar } from "./store/cartItemsVar";
import "./App.css";

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
      miniCartOpen: false,
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.props.client
      .query({
        query: GET_ALL_DATA,
      })
      .then((response) => {
        const categoryNames = response.data.categories.map(
          (category) => category.name
        );
        // unfreeze arrays and objects saved in local storage
        const cartItems = response.data.cartItems.map((item) => {
          const init = { ...item };
          const temp = [...init.attributes].map((attribute) => [...attribute]);
          init.attributes = temp;
          return init;
        });
        this.setState(
          {
            categories: response.data.categories,
            categoryNames: categoryNames,
            currencies: response.data.currencies,
            cartItems: cartItems,
            loading: false,
          },
          () => {
            this.handleCartQuantity();
            this.handleCartTotal();
          }
        );
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
    const categories = this.state.categories;
    for (const category of categories) {
      const products = category.products;
      for (const product of products) {
        if (product.id === id) {
          return product;
        }
      }
    }
  };

  handleCartQuantity = () => {
    let quantity = 0;
    this.state.cartItems.forEach((item) => (quantity += item.quantity));
    this.setState({ cartQuantity: quantity });
  };

  handleCartTotal = () => {
    let total = 0;
    const { cartItems, currency } = this.state;
    cartItems.forEach((item) => {
      let i = 0,
        product = this.handleGetProduct(item.id);
      while (currency !== product.prices[i].currency.label) i++;
      total += product.prices[i].amount * item.quantity;
    });
    this.setState({ cartTotal: total });
  };

  handleSaveCartItems = () => {
    window.localStorage.setItem(
      "eCommerceWebApp.cartItems",
      JSON.stringify(cartItemsVar())
    );
  };

  handleAddToCart = (id, attributes) => {
    let cartItems = this.state.cartItems,
      check = false;
    for (const item of cartItems) {
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
    cartItems = [...cartItems, { id: id, attributes: attributes, quantity: 1 }];
    cartItemsVar(cartItems);
    this.handleSaveCartItems();
    this.setState({ cartItems: cartItems }, () => {
      this.handleCartQuantity();
      this.handleCartTotal();
    });
  };

  handleRemoveFromCart = (id) => {
    let cartItems = this.state.cartItems;
    for (const item of cartItems) {
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

  handleCartItemAttributes = (id, name, value) => {
    let cartItems = this.state.cartItems,
      check = false;
    for (const item of cartItems) {
      if (item.id === id) {
        const attributes = item.attributes;
        for (let i = 0; i < attributes.length; i++) {
          if (attributes[i][0] === name) {
            check = true;
            attributes[i][1] = value;
          }
        }
        if (!check) attributes.push([name, value]);
        item.attributes = attributes;
        break;
      }
    }
    cartItemsVar(cartItems);
    this.handleSaveCartItems();
    this.setState({ cartItems: cartItems });
  };

  handleCartItemQuantity = (id, type) => {
    const cartItems = this.state.cartItems;
    for (const item of cartItems) {
      if (item.id === id) {
        if (type === "increase") {
          item.quantity += 1;
        } else if (type === "decrease") {
          if (item.quantity > 1) {
            item.quantity -= 1;
          } else {
            this.handleRemoveFromCart(id);
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
    const {
      page,
      currency,
      currencies,
      category,
      categories,
      categoryNames,
      cartItems,
      cartTotal,
      cartQuantity,
      id,
      attributes,
      miniCartOpen,
      loading,
      error,
    } = this.state;
    const {
      handleCategoryClick,
      handleProductClick,
      handleGetProduct,
      handleAddToCart,
      handleRemoveFromCart,
      handleCartItemAttributes,
      handleCartItemQuantity,
      handleCurrencyClick,
      handleMiniCartToggle,
      handleViewBag,
      handlePlaceOrder,
      handleNumberFormat,
    } = this;
    if (loading) return <Loading />;
    if (error) return <Error error={error} />;
    const taxRate = 0.075;
    const subTotal = handleNumberFormat(cartTotal);
    const tax = handleNumberFormat(cartTotal * taxRate);
    const total = handleNumberFormat(cartTotal + tax);
    return (
      <ErrorBoundary>
        <div className="app">
          <NavBar
            currencies={currencies}
            category={category}
            categoryNames={categoryNames}
            cartQuantity={cartQuantity}
            categoryClick={handleCategoryClick}
            currencyClick={handleCurrencyClick}
            miniCartToggle={handleMiniCartToggle}
          />
          <MiniCart
            currency={currency}
            currencies={currencies}
            cartItems={cartItems}
            subTotal={subTotal}
            cartQuantity={cartQuantity}
            miniCartOpen={miniCartOpen}
            getProduct={handleGetProduct}
            cartItemAttributes={handleCartItemAttributes}
            cartItemQuantity={handleCartItemQuantity}
            removeFromCart={handleRemoveFromCart}
            viewBag={handleViewBag}
            placeOrder={handlePlaceOrder}
            numberFormat={handleNumberFormat}
          />
          {(() => {
            switch (page) {
              case "categorypage":
                return (
                  <CategoryPage
                    currency={currency}
                    category={category}
                    categories={categories}
                    categoryNames={categoryNames}
                    miniCartOpen={miniCartOpen}
                    productClick={handleProductClick}
                    addToCart={handleAddToCart}
                    miniCartToggle={handleMiniCartToggle}
                    numberFormat={handleNumberFormat}
                  />
                );
              case "productpage":
                return (
                  <ProductPage
                    currency={currency}
                    categories={categories}
                    id={id}
                    attributes={attributes}
                    miniCartOpen={miniCartOpen}
                    addToCart={handleAddToCart}
                    miniCartToggle={handleMiniCartToggle}
                    numberFormat={handleNumberFormat}
                  />
                );
              case "cartpage":
                return (
                  <CartPage
                    currency={currency}
                    currencies={currencies}
                    cartItems={cartItems}
                    subTotal={subTotal}
                    tax={tax}
                    total={total}
                    cartQuantity={cartQuantity}
                    miniCartOpen={miniCartOpen}
                    getProduct={handleGetProduct}
                    cartItemAttributes={handleCartItemAttributes}
                    cartItemQuantity={handleCartItemQuantity}
                    removeFromCart={handleRemoveFromCart}
                    miniCartToggle={handleMiniCartToggle}
                    placeOrder={handlePlaceOrder}
                    numberFormat={handleNumberFormat}
                  />
                );
              default:
                return null;
            }
          })()}
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
