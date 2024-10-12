import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Add from './pages/Add/Add';
import Order from './pages/Order/Order';
import List from './pages/List/List';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App(){

    const URL = "https://food-delivery-backend-f25c.onrender.com";

    return(
        <div>
            <ToastContainer />
            <Navbar />
            <hr />
            <div className="app-content">
                <Sidebar />
                <Routes>
                    <Route path='/add' element={<Add url={URL} />}/>
                    <Route path='/list' element={<List url={URL} />}/>
                    <Route path='/order' element={<Order url={URL} />}/>
                </Routes>
            </div>
        </div>
    )
}
export default App
