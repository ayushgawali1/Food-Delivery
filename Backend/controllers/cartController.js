import userModle from "../models/userModle.js";


// add item to user cart

const addToCart = async (req,res) => {
    try {
        let userData = await userModle.findById(req.body.userId)
        
        let cartData = await userData.cartData;
        
        
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1
        }
        else{
            cartData[req.body.itemId] += 1;
        }
        await userModle.findByIdAndUpdate(req.body.userId,{cartData});
        return(res.json({success:true,message:"Added to Cart"}))
    } catch (error) {
        console.log(error);
        return(res.json({success:false,message:"Error"}))
    }
}

// remove item to user cart

const removeToCart = async (req,res) => {
    try {
        let userData = await userModle.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1
        }
        await userModle.findByIdAndUpdate(req.body.userId,{cartData});
        return(res.json({success:true,message:"removed to Cart"}))
    } catch (error) {
        console.log(error);
        return(res.json({success:false,message:"Error"}))
    }
}


// fetch user cart data

const getCart = async (req,res) => {
    try {
        let userData = await userModle.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true,cartData})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}


export {addToCart,removeToCart,getCart}