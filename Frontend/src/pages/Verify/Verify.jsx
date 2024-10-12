import React, { useContext, useEffect } from 'react'
import './Verify.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {StoreContext} from '../../context/StoreContext'
import axios from 'axios';

function Verify() {

    const [searchParams,setSearchParams] = useSearchParams();
    const sucess = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const {URL} = useContext(StoreContext);
    const navigate = useNavigate();

    const verifyPayment = async () => {
      const responce = await axios.post(URL+"/api/order/verify",{sucess,orderId});
      console.log(responce.data);
      
      if(responce.data.succes){
        navigate("/myorders")
      }else{
        navigate("/");
      }
    }

    useEffect(() => {
      verifyPayment();
    },[])

  return (
    <div className='verify'>
        <div className="spinner"></div>
    </div>
  )
}

export default Verify