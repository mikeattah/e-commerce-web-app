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
      category: "all",
      product: "",
      cart: [],
    };
    this.handleCategory = this.handleCategory.bind(this);
  }

  handleCategory = (category) => {
    this.setState({ category: category });
  };

  render() {
    return (
      <div className="App">
        <NavBar category={this.state.category} onClick={this.handleCategory} />
        <CategoryPage category={this.state.category} />
      </div>
    );
  }
}

export default App;
