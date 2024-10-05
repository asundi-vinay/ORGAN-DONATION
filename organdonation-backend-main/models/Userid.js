const mongoose = require("mongoose");

const Useridschema=new mongoose.Schema({
    autoid:{
        type:Number
    }
},{timestamps:true})
module.exports=mongoose.model("Userid",Useridschema);