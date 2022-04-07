import React from "react";
import { useQuery, gql } from "@apollo/client";

export const NavBarHOC = (Component) => {
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

  return (props) => {
    const { loading, error, data } = useQuery(CATEGORIES);

    if (loading) return <p>Loading...</p>;

    if (error) return <p>Error :(</p>;

    const categories = data.categories;
    const currencies = data.currencies;

    return (
      <Component categories={categories} currencies={currencies} {...props} />
    );
  };
};
