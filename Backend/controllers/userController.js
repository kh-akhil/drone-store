import userModel from "../models/userModels.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//login 
const loginUser = async (req, res)=>{
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success: false, message: "User does not exist"});
        }
        const compare = await bcrypt.compare(password, user.password);
        if(!compare){
            return res.json({success: false, message: "Invalid credentials"});
        }
        const token = createToken(user._id);
        return res.json({success: true, token});
    } catch (error) {
        console.log(error);
        return res.json({success: false, message: "Error" });
    }
}

const createToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_TOKEN);
}
//Register User
const regUser = async (req, res) =>{
    const {name, email, password} = req.body;
    try{
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success: false, message: "User already exists"});
        }
        if(!validator.isEmail(email)){
            return res.json({success: false, message: "Please enter a valid email"});
        }
        if(password.length<8){
            return res.json({success: false, message: "Minimum length for password is 8 characters"});
        }

        //hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        });
        const user = await newUser.save();
        const token = createToken(user._id);
        return res.json({success: true, token});
    }catch(error){
        console.log(error);
        return res.json({success: false, message: "Error" });
    }
}

export {loginUser, regUser};