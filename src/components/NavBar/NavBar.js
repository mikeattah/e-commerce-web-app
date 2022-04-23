import React, { Component } from "react";
import { gql } from "@apollo/client";
import { nanoid } from "nanoid";
import DropDown from "../DropDown/DropDown";
import "./NavBar.css";

const GET_CATEGORIES_AND_CURRENCIES = gql`
  query GetCategoriesAndCurrencies {
    categories {
      name
    }
    currencies {
      label
      symbol
    }
  }
`;

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      currencies: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.props.client
      .query({
        query: GET_CATEGORIES_AND_CURRENCIES,
      })
      .then((response) => {
        this.setState({
          categories: response.data.categories,
          currencies: response.data.currencies,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          error: error,
        });
      });
  }

  render() {
    if (this.state.loading) return <p>Loading...</p>;
    if (this.state.error) return <p>Error: {this.state.error}</p>;
    return (
      <nav className="nav-bar">
        <ul className="nav-bar-group">
          {this.state.categories.map((category) => {
            let { name } = category;
            return (
              <li
                key={nanoid()}
                className={`nav-bar-item ${
                  this.props.category === name ? "nav-bar-item-selected" : ""
                }`}
                onClick={() => this.props.categoryClick(name)}
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
        <DropDown
          items={this.state.currencies}
          dropDownClick={this.props.currencyClick}
        />
      </nav>
    );
  }
}

export default NavBar;
