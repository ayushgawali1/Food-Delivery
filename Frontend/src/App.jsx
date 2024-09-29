import './index.css'
import { createBrowserRouter, RouterProvider ,Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import {StoreContext} from './context/StoreContext';
// import {food_list} from './assets/assets'
import { useEffect, useState } from "react";
import Footer from "./components/Footer/Footer";
import LoginPopUp from './components/LoginPopUp/LoginPopUp';
import axios from 'axios';

const URL = "http://localhost:4000"

function App(){

    const [showLogin,setShowLogin] = useState(false);

    const [cartItems,setCartItems] = useState({});

    const [token,setToken] = useState("");

    const [food_list,setFoodList] = useState([]) 

    const addToCart = async (itemId) => {
        if (!cartItems[itemId]){
            setCartItems((prev) => ({...prev,[itemId]:1}))
        }
        else{
            setCartItems((prev) => ({...prev,[itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post(URL+"/api/cart/add",{itemId},{headers:{token}})
        }
    }

    const removeFromCart  = async (itemId) => {
        setCartItems((prev) => ({...prev,[itemId]:prev[itemId]-1}))
        if(token){
            await axios.post(URL+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }

    const loadCartData = async (token) => {
        const responce = await axios.post(URL+"/api/cart/getCart",{},{headers:{token}})
        setCartItems(responce.data.cartData)
    }

    const getTotalCardAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems){
            if (cartItems[item]>0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price* cartItems[item] 
            }
        }
        return totalAmount;
    }

    const fetFoodList = async () => {
        const responce = await axios.get(URL + "/api/food/list");
        setFoodList(responce.data.data)
    }


    useEffect(() => {
        async function loadData(){
            await fetFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"))
            }
        }
        loadData()
    },[])


    const route = createBrowserRouter([
        {path:'/',element:
            <>
                {showLogin && <LoginPopUp setShowLogin={setShowLogin} />}
                <div className="app">
                    <Navbar setShowLogin={setShowLogin} /><Outlet />
                </div>
                <Footer />
            </>
            ,children:[
            {path:'', element:<Home />},
            {path:'cart', element:<Cart />},
            {path:'order', element:<PlaceOrder />}
        ]}
        
    ])

    return(
        <StoreContext.Provider value={{"food_list":food_list,cartItems,setCartItems,addToCart,removeFromCart,getTotalCardAmount,URL,token,setToken}}>
            <RouterProvider router={route} />
        </StoreContext.Provider> 
        
    )
}
export default App