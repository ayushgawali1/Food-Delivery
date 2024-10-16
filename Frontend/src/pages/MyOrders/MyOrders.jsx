import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

function MyOrders() {

    const {URL,token} = useContext(StoreContext);
    const [data,setData] = useState([]);

    const fetchOrder = async () => {
        const responce = await axios.post(URL+"/api/order/userorders",{},{headers:{token}});
        setData(responce.data.data);
    }

    useEffect(() => {
        if(token){
            fetchOrder();
        }
    },[token])

  return (
    <div className="my-orders">
        <h2>My Orders</h2>
        <div className="container">
            {data.map((order,index) => (
                <div key={index} className="my-orders-order">
                    <img src={assets.parcel_icon} alt="" />
                    <p>
                        {order.item.map((item,index) => {
                            if(index === order.item.length-1){
                                return item.name+" x "+item.quantity
                            }
                            else{
                                return item.name+" x "+item.quantity+", "
                            }
                        })}
                    </p>
                    <p>${order.amount}.00</p>
                    <p>Items : {order.item.length}</p>
                    <p><span>&#x25cf;</span><b>{order.status}</b></p>
                    <button onClick={fetchOrder}>Track Order</button>
                </div>
            ))}
        </div>
    </div>
  )
}

export default MyOrders