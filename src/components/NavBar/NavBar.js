import React, { Component } from "react";
import { nanoid } from "nanoid";
import DropDown from "../DropDown/DropDown";
import "./NavBar.css";

class NavBar extends Component {
  render() {
    return (
      <nav className="nav-bar">
        <ul className="nav-bar-group">
          {this.props.categoryNames.map((category) => {
            return (
              <li
                key={nanoid()}
                className={`nav-bar-item ${
                  this.props.category === category
                    ? "nav-bar-item-selected"
                    : ""
                }`}
                onClick={() => this.props.categoryClick(category)}
              >
                {category.toUpperCase()}
              </li>
            );
          })}
        </ul>
        <img
          src={require("../../assets/images/shopping-bag.png")}
          alt="Shopping Bag Icon, created by DinosoftLabs - Flaticon https://www.flaticon.com/free-icons/bag"
          className="nav-bar-image"
          onClick={() => {
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
          }}
        />
        <div className="nav-bar-toggles">
          <DropDown
            items={this.props.currencies}
            dropDownClick={this.props.currencyClick}
          />
          <img
            src={require("../../assets/images/shopping-cart-black.png")}
            alt="Toggle minicart, created by Kiranshastry - Flaticon https://www.flaticon.com/free-icons/shopping-cart"
            className="nav-bar-image"
            aria-label="Toggle minicart"
            onClick={() => this.props.miniCartToggle()}
          />
          <div className="nav-bar-counter">
            <span>{this.props.cartQuantity}</span>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
