import './placeorder.css';
import {StoreContext} from '../../context/StoreContext';
import {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

export default function PlaceOder(){

    const {getTotalCardAmount,token,food_list,cartItems,URL,} = useContext(StoreContext);

    const [data,setData] = useState({
        firstName:'',
        lastName:'',
        email:'',
        street:'',
        city:'',
        state:'',
        zipcode:'',
        country:'',
        phone:'',
    })

    function handleChange(event){
        const {name,value} = event.target;
        setData((prev) => ({
            ...prev,
            [name]:value
        }))
    }

    const placeHolder = async (event) => {
        event.preventDefault();
        let orderItems = [];
        food_list.map((item) => {
            if(cartItems[item._id]>0){
                let itemInfo = item;
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo)
            }
        })
        let orderData = {
            address:data,
            items:orderItems,
            amount:getTotalCardAmount()+2,
        }
        let responce = await axios.post(URL+"/api/order/place",orderData,{headers:{token}})
        if (responce.data.success) {
            const {success_url} = responce.data;
            window.location.replace(success_url);
        }
        else{
            alert("Error")
        }
    }

    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/cart")
        }
        else if(getTotalCardAmount() === 0){
            navigate("/cart")
        }
    },[])


    return(
        <form onSubmit={placeHolder} className="place-order">
            <div className="place-order-left">
                <div className="title">Delivey Information</div>
                <div className="multi-field">
                    <input value={data.firstName} required type="text" placeholder='First name' onChange={handleChange} name='firstName'/>
                    <input value={data.lastName} required type="text" placeholder='Last Name' onChange={handleChange} name='lastName'/>
                </div>
                <input value={data.email} required type="email" placeholder='email' onChange={handleChange} name='email'/>
                <input value={data.street} required type="text" placeholder='Street' onChange={handleChange} name='street'/>
                <div className="multi-field">
                    <input value={data.city} required type="text" placeholder='City' onChange={handleChange} name='city'/>
                    <input value={data.state} required type="text" placeholder='State' onChange={handleChange} name='state'/>
                </div>
                <div className="multi-field">
                    <input value={data.zipcode} required type="text" placeholder='Pin code' onChange={handleChange} name='zipcode'/>
                    <input value={data.country} required type="text" placeholder='Counter' onChange={handleChange} name='country'/>
                </div>
                <input value={data.phone} required type="text" placeholder='Mobile No' onChange={handleChange} name='phone'/>
            </div>
            <div className="place-order-right">
            <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>${getTotalCardAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Free</p>
                            <p>${getTotalCardAmount() === 0 ? 0 : 2}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>${getTotalCardAmount() === 0 ? 0 : getTotalCardAmount()+2}</b>
                        </div>
                    </div>
                    <button type='submit' >Procced to Payment</button>
                </div>
            </div>
        </form>
    )
}