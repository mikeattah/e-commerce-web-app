import React, { Component } from "react";
import { useQuery, gql } from "@apollo/client";

const CATEGORIES = gql`
  query {
    categories {
      name
    }
    currencies {
      label
      symbol
    }
  }
`;

const { loading, error, data } = useQuery(CATEGORIES);
class NavBar extends Component {
  constructor(props) {
    this.toggleMiniCart = this.toggleMiniCart.bind(this);
  }

  toggleMiniCart = () => {}

  render() {
    if (loading) return <p>Loading Categories...</p>;
    if (error) return <p>Error :(</p>;
    return (
      <nav className="container">
        <ul className="nav-group">
          {data.categories.map((category) => {
            return (
              <li key={category.name}>
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
            {data.currencies.map((currency) => {
              return (
                <option key={currency.label} value={currency.label}>
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

export default NavBar;
