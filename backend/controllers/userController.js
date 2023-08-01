import asyncHandler from "express-async-handler";

import User from "../models/userModel.js";

import generateToken from "../utils/generateToken.js";

const authUser = asyncHandler( async (req,res) => {
    const {email,password} = req.body;

    const user= await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        generateToken(res,user._id)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
        })
    }else{
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

const registerUser = asyncHandler( async (req,res) => {
//     const name = req.body.name.trim();
//   const email = req.body.email.trim();
//   const password = req.body.password.trim();

// const name = req.body.name.trim();
// const email = req.body.email.trim();
// const password = req.body.password.trim();

// // Check for empty fields
// if (!name || !email || !password) {
//   return res.status(400).json({
//     error: "Name, email, and password are required fields.",
//   });
// }

//   //if password is good
//   if (!password || password.length < 6) {
//     return res.json({
//       error: "password is required and should be at least 6 characters long",
// });
//   }

    const {name,email,password} = req.body;

    const userExist = await User.findOne({email})

    if(userExist){
        res.status(400);
        throw new Error('User already exists')
    }
    const user = await User.create({
        name,
        email,
        password
    });

    if(user){
        generateToken(res,user._id)
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            image:user.imagePath
        })
    }else{
        res.status(400);
        throw new Error('Invalid user data');
    }

    res.status(200).json({message:'Register User'});
});

const logoutUser = asyncHandler( async (req,res) => {
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(200).json({message:'User Logged out'});
});

const getUserProfile = asyncHandler( async (req,res) => {
    const user={
       _id:req.user._id,
       name:req.user.name,
       email:req.user.email 
    }
  

    res.status(200).json({message:'User profile'});
});

const updateUserProfile = asyncHandler( async (req,res) => {
    const user = await User.findById(req.user._id);
    console.log(req.file);

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.file){
            user.imagePath =req.file.filename || user.imagePath
        }

        if(req.body.password){
            user.password = req.body.password;
        }

        const updateUser = await user.save();

        res.status(200).json({
            _id:updateUser._id,
            name:updateUser.name,
            email:updateUser.email,
            image:updateUser.imagePath,
        })
    }else{
        res.status(404);
        throw new Error('User not found')
    }

});

export {authUser,registerUser,logoutUser,updateUserProfile,getUserProfile};