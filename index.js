const express = require("express");
const connection = require("./Config/db");
const {UserModel} = require("./Models/UserModel");
const {userRouter} = require("./Routes/userRouter");
const cors = require('cors');
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/users",userRouter);

app.get("/",(req,res)=>{
    res.send("User Profile - Base Api Endpoint");
})


app.listen(process.env.PORT,async ()=>{
    console.log("Server running at port:"+process.env.PORT)
    try {
        await connection;
        console.log("Connected to db")
    } catch (error) {
        console.log(error.message)
    }
})