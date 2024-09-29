import React, { useEffect, useState } from 'react';
import './List.css'
import axios from 'axios';
import { toast } from 'react-toastify';

function List() {
  const URL = "http://localhost:4000";
  const [list,SetList] = useState([]);

  const fetchlist = async () => {
    const responce = await axios.get(`${URL}/api/food/list`);
    console.log(responce.data)
    if (responce.data.success){
      SetList(responce.data.data);
    }
    else{
      toast.error("Error")
    }
  }

  const removeFood = async (foodID) => {
    const responce = await axios.post(`${URL}/api/food/remove`,{id:foodID})
    await fetchlist();
    if(responce.data.success){
      toast.success(responce.data.message)
    }
    else{
      toast.error("Error")
    }
  }

  useEffect(() => {fetchlist()},[])

  return (
    <div className='list add flex-col'>
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index) => {
          return(
            <div key={index} className="list-table-format">
              <img src={`${URL}/images/`+item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p onClick={() => removeFood(item._id)} className='cursor'>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List