import React, { PureComponent } from "react";
import { nanoid } from "nanoid";
import DropDown from "../DropDown/DropDown";
import "./NavBar.css";

class NavBar extends PureComponent {
  render() {
    const {
      currencies,
      category: categoryFromProps,
      categoryNames,
      cartQuantity,
      categoryClick,
      currencyClick,
      miniCartToggle,
    } = this.props;
    return (
      <nav className="nav-bar">
        <ul className="nav-bar-group">
          {categoryNames.map((category) => {
            return (
              <li
                key={nanoid()}
                className={`nav-bar-item ${
                  category === categoryFromProps ? "nav-bar-item-selected" : ""
                }`}
                onClick={() => categoryClick(category)}
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
          <DropDown items={currencies} dropDownClick={currencyClick} />
          <img
            src={require("../../assets/images/shopping-cart-black.png")}
            alt="Toggle minicart, created by Kiranshastry - Flaticon https://www.flaticon.com/free-icons/shopping-cart"
            className="nav-bar-image"
            aria-label="Toggle minicart"
            onClick={() => miniCartToggle()}
          />
          <div className="nav-bar-counter">
            <span>{cartQuantity}</span>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavBar;
