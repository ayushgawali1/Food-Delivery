import './placeorder.css';
import {StoreContext} from '../../context/StoreContext';
import {useContext} from 'react';

export default function PlaceOder(){

    const {getTotalCardAmount} = useContext(StoreContext);


    return(
        <form className="place-order">
            <div className="place-order-left">
                <div className="title">Delivey Information</div>
                <div className="multi-field">
                    <input type="text" placeholder='First name'/>
                    <input type="text" placeholder='Last Name'/>
                </div>
                <input type="email" placeholder='email'/>
                <input type="text" placeholder='Street'/>
                <div className="multi-field">
                    <input type="text" placeholder='City'/>
                    <input type="text" placeholder='State'/>
                </div>
                <div className="multi-field">
                    <input type="text" placeholder='Pin code'/>
                    <input type="text" placeholder='Counter'/>
                </div>
                <input type="text" placeholder='Mobile No'/>
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
                    <button>Procced to Payment</button>
                </div>
            </div>
        </form>
    )
}