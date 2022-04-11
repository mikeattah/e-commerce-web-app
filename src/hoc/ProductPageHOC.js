import React from "react";
import { useQuery, gql } from "@apollo/client";

export const ProductPageHOC = (Component) => {
  const PRODUCT = gql`
    query ($id: String!) {
      product(id: $id) {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  `;

  return (props) => {
    const { id } = props;
    const { loading, error, data } = useQuery(PRODUCT, {
      variables: { id: id },
    });

    if (loading) return <p>Loading...</p>;

    if (error) return <p>Error :(</p>;

    const product = data.product;

    return <Component product={product} {...props} />;
  };
};
