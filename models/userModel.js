const mongoose = require("mongoose");
var plm = require("passport-local-mongoose"); 

var userModel = new mongoose.Schema({
    name:String,
    username:String,
    email:String,
    password:String,
    city:String,
    gender:String,
    about:String,
    phone:String,
    avatar:{
        type:String,
        default:"dummy.png"
    },
    posts:[{type:mongoose.Schema.Types.ObjectId,ref:"post"}],
    refreshToken: {
        type: Number,
        default: undefined,
    },
   

},{timestamps:true})

userModel.plugin(plm);

var user = mongoose.model("user",userModel);
module.exports = user; 