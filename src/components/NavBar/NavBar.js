import React, { Component } from "react";
import { nanoid } from "nanoid";

import { NavBarHOC } from "../../hoc/NavBarHOC";
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.categories = props.categories;
    this.currencies = props.currencies;

    this.toggleMiniCart = this.toggleMiniCart.bind(this);
    this.changeCategory = this.changeCategory.bind(this);
  }

  toggleMiniCart = () => {};

  changeCategory = (category) => {};

  render() {
    return (
      <nav className="container">
        <ul className="nav-group">
          {this.categories.map((category) => {
            return (
              <li
                key={nanoid()}
                className="nav-item"
                onClick={this.changeCategory}
              >
                <a href="#">{category.name}</a>
              </li>
            );
          })}
        </ul>
        <img
          src="../../assets/images/shopping-bag.png"
          alt="Shopping Bag Icon, created by DinosoftLabs - Flaticon https://www.flaticon.com/free-icons/bag"
          className="nav-image"
        />
        <div className="nav-toggles">
          <select
            name="currency"
            id="currency"
            className="currency"
            aria-label="Choose currency"
          >
            {this.currencies.map((currency) => {
              return (
                <option key={nanoid()} value={currency.label}>
                  {currency.symbol} {currency.label}
                </option>
              );
            })}
          </select>
          <img
            src="../../assets/images/shopping-cart.png"
            alt="Toggle minicart, created by Kiranshastry - Flaticon https://www.flaticon.com/free-icons/shopping-cart"
            className="nav-image"
            onClick={this.toggleMiniCart}
          />
        </div>
      </nav>
    );
  }
}

export default NavBarHOC(NavBar);
