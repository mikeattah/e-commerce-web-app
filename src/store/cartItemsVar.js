import { makeVar } from "@apollo/client";
import initialCartItems from "./initialCartItems";

export const cartItemsVar = makeVar(initialCartItems);
