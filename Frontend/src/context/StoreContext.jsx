import { createContext } from "react";
import {food_list} from '../assets/assets'

export const StoreContext = createContext({
    "food_list":food_list,
    setCartItems:null,
    cartItems:null,
    addToCart:null,
    removeFromCart:null,
    getTotalCardAmount:null,
    URL:"https://food-delivery-backend-f25c.onrender.com",
    token:'',
    setToken:'',
})
