const express = require('express');
const jwt = require('jsonwebtoken');
const {UserModel}=require('../models/user.model');
const bcrypt= require('bcrypt');

const userRouter = express.Router();


userRouter.post('/register',(req,res)=>{
    const {name,email,pass, role}=req.body;
   try{
       bcrypt.hash(pass,5,async(err,hash)=>{
        if(err){
            res.status(200).json({error:err});
        }else{
            const user = new UserModel({name,email,pass:hash,role});
            await user.save();
            console.log(user);
            res.status(200).json({msg:"hey! user you are Successfuly Register",user});
        }
       })
   }catch(err){
    res.status(200).json({msg:err});
   }
})


userRouter.post('/login',async(req,res)=>{
    const {email,pass}=req.body;
    try{
       const user = await UserModel.findOne({email});
       if(user){
        bcrypt.compare(pass,user.pass,(err,result)=>{
            if(result){
                const token=jwt.sign({userID:user._id},"Anjali",{expiresIn:"1d"});
                const refresh_token=jwt.sign({userID:user._id},"Anjali",{expiresIn:"7d"});
                res.status(200).json({msg:"Login Successfull!",token,refresh_token});
            }else{
                res.status(200).json({msg:"Wrong Password"});
            }
        })
       }
    }
    catch(err){
        res.status(400).json({msg:"Please register first, wrong Credential"});
        console.log(err);
    }
})



module.exports={
    userRouter,
}