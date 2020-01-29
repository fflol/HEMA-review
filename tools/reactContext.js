import { createContext } from "react";

//
// user
const userInitial = {};

export const userContext = createContext(userInitial);

//
// products
const productsInitial = [];

export const productsContext = createContext(productsInitial);
