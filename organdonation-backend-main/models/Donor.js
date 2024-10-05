const mongoose =require('mongoose')
const Schema=require('mongoose').Schema
const Hospital = require("./Hospital");

const DonorSchema =mongoose.Schema({
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
    required: true
  },

  role: {
    type: String,
    required: true,
    default:"Donor",
    enum:["Donor"]
  },
  
  gender:{
    type:String,
    enum:["Male","Female","Others"]
  },

  phone: {
    type: Number
  },

  DOB: {
    type: Date
  },

  address: {
    type: String
  },

  bloodgroup: {
    type: String
  },

  relativename: {
    type: String
  },

  relationship:{
    type:String
  },

  relativephone: {
    type: Number
  },

  familyPermission:{
    type:Boolean
  },

  causeOfDeath:{
    type:"String"
  },

  deathDate:{
    type:Date
  },

  ddoperationDate:{
    type:Date
  },

  medicaldetails:{
    type:String
  },
  
  transplantHospitalDetails: { type: Schema.Types.ObjectId, ref: Hospital },
},
{ timestamps: true });

module.exports=mongoose.model("Donor",DonorSchema)