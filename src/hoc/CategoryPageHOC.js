import React from "react";
import { useQuery, gql } from "@apollo/client";

export const CategoryPageHOC = (Component) => {
  const CATEGORY_PRODUCTS = gql`
    query GetCategories {
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
  `;

  const { loading, error, data } = useQuery(CATEGORY_PRODUCTS);

  // number of items per page
  const pageItems = 4;
  // number of pages
  let pageCount = Math.ceil(data.products.length / pageItems);
  // array of pages
  const pages = [];

  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }

  return (
    <Component loading={loading} error={error} data={data} pages={pages} />
  );
};
