const bcrypt = require('bcrypt');
const { User } = require('../Models/User');
const jwt = require('jsonwebtoken');
const { successMessage, errorMessage } = require('../Utils/responseSender');
require("dotenv").config();

const registerUser = async (req, res) => {
    try {
        const alreadyExist=await User.find({email:req.body.email})
        if (alreadyExist.length!=0){
            return res.status(409).json({ message: "User already Registered Please Login"});
        };
        const unique=await User.find({user_name:req.body.user_name})
        if (unique.length!=0){
            return res.status(409).json({ message: "Username Already taken Try different username"});
        }


        req.body.password = await bcrypt.hash(req.body.password, 10);
        const registeredUser = await User.create(req.body);
        return successMessage(
            res,
            "User registered successfully",
            registeredUser,
        );
    } catch (error) {
        return errorMessage(
            res,
            "Registration Unsuccessful , Please try again !",
            error,
        );
    }
}
const loginUser = async (req,res) =>{
    try {
        const { email, password, name, user_name } = req.user;
        const jwtUser = {
        email,
        password,
        user_name,
        name,
        };
        console.log(req.body)
        const accessToken = jwt.sign(jwtUser, process.env.ACCESS_TOKEN);
        const user = req.user;
        const data = {
            AccessToken: accessToken,
            user_name: user.user_name,
            name: user.name,
            email: user.email,
        }
        successMessage(
            res,
            "Here's your auth token for login into the the app",
            data,
        )
    } catch (error) {
        errorMessage(
            res,
            "Give proper credential's or try registering again !",
            error,
        )
    }
}
const allUser = async (req, res) => {
    try {
        console.log(req.user.id);
        const userr = await User.find();

        successMessage(
            res,
            "Here are all the users",
            userr,
        );
    }
    catch (error) {
        errorMessage(
            res,
            "message",
            error,

        );

    }
}
const userData= async (req,res)=>{
    try {
        
        const userr = await User.findById(req.user._id);

        successMessage(
            res,
            "Here is users data",
            userr
        );
    }
    catch (error) {
        errorMessage(
            res,
            "message",
            error,

        );

    }
}




module.exports = {
    registerUser,
    loginUser,
    allUser,
    userData
}