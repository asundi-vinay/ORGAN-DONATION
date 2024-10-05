const mongoose = require("mongoose");

const HospitalSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  userid: {
    type: Number,
    required: true,
  },

  role: {
    type: String,
    required: true,
    default:"Hospital",
    enum:["Hospital"]
  },

  verificationstatus:{
    type:String,
    default:"Pending",
    enum:["Verified","Pending","Rejected"],
    required:true
  },

  phone:{
    type:Number
  },
  
  address: {
    type: String
  },

  hospitalregnum: {
    type: String
  },

  cancelReason:{
    type: String
  }

},
{ timestamps: true });
module.exports=mongoose.model("Hospital",HospitalSchema);
