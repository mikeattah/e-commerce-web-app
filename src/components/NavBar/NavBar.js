import React, { Component } from "react";

class NavBar extends Component {
  render() {
    return (
      <nav className="container">
        <ul className="nav-group">
          <li className="nav-item">WOMEN</li>
          <li className="nav-item">MEN</li>
          <li className="nav-item">KIDS</li>
        </ul>
        <img
          src="../../assets/images/shopping-bag.png"
          alt="Shopping Bag Icon, created by DinosoftLabs - Flaticon https://www.flaticon.com/free-icons/bag"
          className="nav-image"
        />
        <div>
          <select name="currency" id="currency" aria-label="Choose currency">
            <option value="">&#36;</option>
            <option value="usd">&#36; USD</option>
            <option value="eur">&#128; EUR</option>
            <option value="jpy">&#165; JPY</option>
          </select>
          <img
            src="../../assets/images/shopping-cart.png"
            alt="Toggle minicart, created by Kiranshastry - Flaticon https://www.flaticon.com/free-icons/shopping-cart"
            className="nav-image"
          />
        </div>
      </nav>
    );
  }
}

export default NavBar;
