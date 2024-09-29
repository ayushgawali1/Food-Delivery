import userModle from "../models/userModle.js";
import jwt from "jsonwebtoken";
import bycrypt from "bcrypt";
import validator from "validator";


// Login user

const loginUser = async (req,res) => {
    const {email,password} = req.body;
    try {
        const user = await userModle.findOne({email});

        if(!user){
            return res.json({success:false,message:"User doesn't exist"})
        }

        const isMatch = await bycrypt.compare(password,user.password);

        if(!isMatch){
            return res.json({success:false,message:"Invalid Password"})
        }

        const token = createToken(user._id);
        return res.json({success:true,token})

    } catch (error) {
        console.log(error);
        return res.json({success:false,message:"Error"})
    }
}


const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}


// register user

const registerUser = async (req,res) => {
    const {name,password,email} = req.body;
    try {
        // check in usaer alredy exist
        const exists = await userModle.findOne({email});
        if(exists){
            return res.json({success:false,message:"User alredy register"})
        }

        // validating email format & strong password
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})
        }

        if(password.length<8){
            return res.json({success:false,message:"Please enter a Strong Password"})
        }

        // hashing user password
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password,salt)

        const newUser = new userModle({
            name:name,
            email:email,
            password:hashedPassword
        })

        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true,token})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {loginUser,registerUser}