const mongoose = require("mongoose");

const userSchema =  mongoose.Schema({
    name: String,
    email: String,
    password: String,
    pic: String,
    phone: String,
    bio: String
  },{
    versionKey:false  
  })

  const UserModel = mongoose.model("user",userSchema)

module.exports={UserModel}

