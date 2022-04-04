import React, { Component } from "react";
import NavBar from "./components/NavBar/NavBar";
import CategoryPage from "./containers/CategoryPage/CategoryPage";
import ProductPage from "./containers/ProductPage/ProductPage";
import CartPage from "./containers/CartPage/CartPage";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <CategoryPage />
      </div>
    );
  }
}

export default App;
