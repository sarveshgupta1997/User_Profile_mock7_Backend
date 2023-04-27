const {UserModel} = require("../Models/UserModel");
const express = require("express")
const {authenticator} = require("../Middlewares/authenticator");
const bcrypt = require('bcrypt');
require("dotenv").config();
var jwt = require('jsonwebtoken');

const userRouter = express.Router();

// Get all users
userRouter.get("/all", async (req,res)=>{
    try {        
        let users = await UserModel.find();
        res.status(200).send({msg:"Users",users});
    } catch (error) {
        res.status(400).send({err:"Something went wrong"});
        console.log(error)
    }
})


// Get User by id
userRouter.get("/getProfile/:id", async (req,res)=>{
    let id=req.params.id;
    try {        
        let user = await UserModel.findOne({_id:id});
        res.status(200).send({msg:"User Details",user});
    } catch (error) {
        res.status(400).send({err:"Something went wrong"});
        console.log(error)
    }
})


//Register
userRouter.post("/register", async (req,res)=>{
    let {name,email,password,pic,phone,bio} = req.body;
    try {
        bcrypt.hash(password, +process.env.salt, async function(err, hash) {
            if(err){
                res.status(400).send({err:"Something went wrong"});
                console.log(err)
            }else{
                let user = new UserModel({name,email,password:hash,pic,phone,bio})
                await user.save();
                res.status(200).send({msg:"User Registered",user});
            }
        });
    } catch (error) {
        res.status(400).send({err:"Something went wrong"});
        console.log(error)
    }
})

//Login
userRouter.post("/login", async (req,res)=>{
    let {email,password} = req.body;
    try {        
        let user = await UserModel.findOne({email});
        if(user){
            bcrypt.compare(password, user.password, async function(err, result) {
                if(result){
                    var token = jwt.sign({ userID: user._id }, process.env.secret);
                    res.status(200).send({msg:"Login Sucess",user,token});
                }else{
                    res.status(400).send({err:"Wrong Credentials"});
                }
            });
        }else{
            res.status(400).send({err:"User Not found"});
        }
    } catch (error) {
        res.status(400).send({err:"Something went wrong"});
        console.log(error)
    }
})

// Update
userRouter.patch("/updateProfile/:id", authenticator, async (req,res)=>{
    let id=req.params.id;
    let {name,email,password,pic,phone,bio} = req.body;
    try {
        bcrypt.hash(password, +process.env.salt, async function(err, hash) {
            if(err){
                res.status(400).send({err:"Something went wrong"});
                console.log(err)
            }else{
                let user = await UserModel.findByIdAndUpdate({_id:id},{name,email,password:hash,pic,phone,bio})
                res.status(200).send({msg:"Profile Updated",user});
            }
        });
    } catch (error) {
        res.status(400).send({err:"Something went wrong"});
        console.log(error)
    }
})


module.exports={userRouter};