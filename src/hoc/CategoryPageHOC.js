import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";

export const CategoryPageHOC = (Component) => {
  const CATEGORY_PRODUCTS = gql`
    query {
      categories {
        name
        products {
          id
          name
          inStock
          gallery
          prices {
            currency {
              label
              symbol
            }
            amount
          }
        }
      }
    }
  `;

  return (props) => {
    const { loading, error, data } = useQuery(CATEGORY_PRODUCTS);

    if (loading) return <p>Loading...</p>;

    if (error) return <p>Error :(</p>;

    const categories = data.categories;

    return <Component categories={categories} {...props} />;
  };
};
