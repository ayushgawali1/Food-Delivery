import React, { useState } from 'react';
import './Add.css';
import {assets} from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

function Add() {

  const [image,setImage] = useState(null);
  const [data,setData] = useState({
    name:"",
    description:"",
    price:"",
    category:"salad",
  })

  const onChangeHandler =  (event) => {
    const {name,value} = event.target;
    setData((prev) => ({
      ...prev,
      [name]:value
    }))
  }

  const onSubmitHandler = async (event) => {
    const URL = "http://localhost:4000"
    event.preventDefault();
    const formData = new FormData();
    formData.append("name",data.name)
    formData.append("description",data.description)
    formData.append("price",Number(data.price))
    formData.append("category",data.category)
    formData.append("image",image)
    const responce = await axios.post(`${URL}/api/food/add`,formData)
    if(responce.data.success){
      setData({
        name:"",
        description:"",
        price:"",
        category:"Salad",
      })
      setImage(null)
      toast.success(responce.data.message)
    }
    else{
      toast.error(responce.data.message)
    }
  }


  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input onChange={(event) => setImage(event.target.files[0])} type="file" accept="image/png, image/jpeg, image/bmp" id='image' hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name='name' placeholder='Type here' />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea onChange={onChangeHandler} value={data.description} name='description' placeholder='Write Content Here' />
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={onChangeHandler} name="category">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input onChange={onChangeHandler} value={data.price} type="Number" name='price' placeholder='$20' />
          </div>
        </div>
        <button type='submit' className='add-btn'>Add</button>
      </form>
    </div>
  )
}

export default Add