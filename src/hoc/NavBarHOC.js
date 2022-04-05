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

  const { loading, error, data } = useQuery(CATEGORIES);

  return <Component loading={loading} error={error} data={data} />;
};
