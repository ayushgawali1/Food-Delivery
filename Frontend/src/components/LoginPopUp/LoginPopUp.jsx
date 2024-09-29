import React, { useContext, useState } from 'react'
import './LoginPopUp.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

function LoginPopUp({setShowLogin}) {

    const {URL,setToken} = useContext(StoreContext);

    const [currentState,setCurrentState] = useState('Sign in');
    const [data,setData] = useState({
        name:"",
        email:"",
        password:""
    })

    const onChangeHandler = (event) => {
        const {name,value} = event.target;
        setData((prev) => ({
            ...prev,
            [name]:value
        }))
    }

    const onLogin = async (event) => {
        event.preventDefault()
        let newUrl = URL;
        if(currentState === "Login" ){
            newUrl += "/api/user/login";
        }
        else{
            newUrl += "/api/user/register";
        }

        const responce = await axios.post(newUrl,data);

        if(responce.data.success){
            setToken(responce.data.token)
            localStorage.setItem("token",responce.data.token)
            setShowLogin(false)
        }
        else{
            alert(responce.data.message)
        }

    }


  return (
    <div className="login-PopUp">
        <form onSubmit={onLogin} className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currentState}</h2>
                <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className="login-popup-inputs">
                {currentState!=='Login' && <input type="text" placeholder='Your Name' name='name' onChange={onChangeHandler} value={data.name} required />}
                <input type="email" placeholder='Your email' name='email' onChange={onChangeHandler} value={data.email} required />
                <input type="password" placeholder='Password' name='password' onChange={onChangeHandler} value={data.password} required />
            </div>
            <button type='submit'>{currentState==='Sign Up'?'Create account':'Login'}</button>
            <div className="login-popup-constition">
                <input type="checkbox" required/>
                <p>I agree to the terms of use & privecy policy.</p>
            </div>
            {currentState==='Login' ?
                    <p>Create a new account? <span onClick={() => setCurrentState('Sign Up')}>Click here</span> </p> 
                : 
                    <p>Alredy have an account? <span onClick={() => setCurrentState('Login')}>Login here</span></p>
            }
            
            
        </form>
    </div>
  )
}

export default LoginPopUp