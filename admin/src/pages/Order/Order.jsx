import React, { useEffect, useState } from 'react';
import './Order.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import {assets} from "../../assets/assets";



function Order({url}) {

  const [orders,setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const responce = await axios.get(url+"/api/order/list");
    if(responce.data.success){
      setOrders(responce.data.data)
      console.log(responce);
      
    }
    else{
      toast.error("Error")
    }
  }

  const statusHandler = async (event,orderId) => {
    const responce = await axios.post(url+"/api/order/status",{
      orderId,
      status:event.target.value
    })
    console.log(responce);
    
    if (responce.data.success) {
      await fetchAllOrders();
    }
  }

  useEffect(() => {
    fetchAllOrders();
  },[])

  return (
    <div className="order add">
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order,index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.item.map((item,index) => {
                  if (index === order.item.length-1) {
                    return item.name + " x " + item.quantity
                  }
                  else{
                    return item.name + " x " + item.quantity + ", "
                  }
                })}
              </p>
              <p className="order-item-name">
                {order.address.firstName + " " + order.address.firstName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>{order.address.city + " , " + order.address.state + " , " + order.address.country + " , " + order.address.zipcode}</p>
              </div>
                <p className="order-item-phone">
                  {order.address.phone}
                </p>
            </div>
            <p>Item : {order.item.length}</p>
            <p>${order.amount}</p>
            <select onChange={(event) => statusHandler(event,order._id)} value={order.status} >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for Delevering">Out for Delevering</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Order
