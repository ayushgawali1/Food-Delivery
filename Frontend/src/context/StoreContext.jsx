import { createContext } from "react";
import {food_list} from '../assets/assets'

export const StoreContext = createContext({
    "food_list":food_list,
    setCartItems:null,
    cartItems:null,
    addToCart:null,
    removeFromCart:null,
    getTotalCardAmount:null,
    URL:"http://localhost:4000",
    token:'',
    setToken:'',
})
