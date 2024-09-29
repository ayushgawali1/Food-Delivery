import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    item:{type:Array,required:true},
    amount:{type:Number,required:true},
    address:{type:Object,required:true},
    status:{type:String,default:"Processing"},
    date:{type:Date,default:Date.now()},
    payment:{type:Boolean,default:false},
})

const orderModle = mongoose.model.order || mongoose.model("order",orderSchema)

export default orderModle