import foodModle from "../models/foodModle.js";
import fs from 'fs';


//add food item

const addFood = async (req,res) => {

    let image_filename = `${req.file.filename}`;

    const food = new foodModle({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename,
    })

    try {
        await food.save()
        res.json({success:true,message:"Food Added"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }

}

// get all food list

const listFood = async (req,res) => {
    try {
        const foods = await foodModle.find({});
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}


// remove food items
const removeFood = async (req,res) => {
    try {
        const foods = await foodModle.findById(req.body.id);
        fs.unlink(`uploads/${foods.image}`,()=>{})

        await foodModle.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Remove"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}



export {addFood,listFood,removeFood}