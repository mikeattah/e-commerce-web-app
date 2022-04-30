import { InMemoryCache } from "@apollo/client";
import { cartItemsVar } from "./cartItemsVar";

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        cartItems: {
          read() {
            return cartItemsVar();
          },
        },
      },
    },
  },
});
