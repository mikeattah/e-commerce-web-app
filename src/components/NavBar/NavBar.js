import React, { Component } from "react";
import { nanoid } from "nanoid";
import { NavBarHOC } from "../../hoc/NavBarHOC";
import MiniCart from "../MiniCart/MiniCart";
import "./NavBar.css";
class NavBar extends Component {
  categoryClick = (name) => {
    this.props.categoryClick(name);
  };

  currencyClick = () => {
    const selectTag = document.getElementById("currency");
    const currency = selectTag.options[selectTag.selectedIndex].value;
    this.props.currencyClick(currency);
  };

  render() {
    return (
      <nav className="nav-bar">
        <ul className="nav-bar-group">
          {this.props.categories.map((category) => {
            let { name } = category;
            return (
              <li
                key={nanoid()}
                className={`nav-bar-item ${
                  this.props.category === name ? "nav-bar-item-active" : ""
                }`}
                onClick={() => this.categoryClick(name)}
              >
                {name.toUpperCase()}
              </li>
            );
          })}
        </ul>
        <img
          src={require("../../assets/images/shopping-bag.png")}
          alt="Shopping Bag Icon, created by DinosoftLabs - Flaticon https://www.flaticon.com/free-icons/bag"
          className="nav-bar-image"
          onClick={() =>
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            })
          }
        />
        <div className="nav-bar-toggles">
          <select
            name="currency"
            id="currency"
            className="nav-bar-currency"
            aria-label="Choose currency"
            onChange={() => this.currencyClick()}
          >
            {this.props.currencies.map((currency) => {
              let { label, symbol } = currency;
              return (
                <option key={nanoid()} value={label}>
                  {symbol} {label}
                </option>
              );
            })}
          </select>
          <img
            src={require("../../assets/images/shopping-cart.png")}
            alt="Toggle minicart, created by Kiranshastry - Flaticon https://www.flaticon.com/free-icons/shopping-cart"
            className="nav-bar-image"
            aria-label="Toggle minicart"
            onClick={() => this.props.miniCartToggle()}
          />
        </div>
        <MiniCart
          cart={this.props.cart}
          cartTotal={this.props.cartTotal}
          miniCartOpen={this.props.isMiniCartOpen}
          viewBag={this.props.viewBag}
          checkOut={this.props.checkOut}
        />
      </nav>
    );
  }
}

export default NavBarHOC(NavBar);
