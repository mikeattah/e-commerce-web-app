import { makeVar } from "@apollo/client";
import initialCartItems from "./initialCartItems";

const cartItemsVar = makeVar(initialCartItems);

export default cartItemsVar;
