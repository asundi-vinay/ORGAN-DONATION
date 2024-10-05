const mongoose =require('mongoose')
const Hospital = require("./Hospital");
const Donor = require('./Donor');
const Patient = require('./Patient');
const Schema=require('mongoose').Schema

const LivingDonationSchema =mongoose.Schema({

  donationOrgan: {
    type: String,
    required: true,
    enum:["Eyes","Kidney"]
  },

  donationStatus: {
    type: String,
    required: true,
    default:"Pending",
    enum:["Pending","Confirmed","Completed","Cancelled"]
  },

  donationType:{
    type:String,
    required:true,
    default:"Living",
    enum:["Living"]
  },

  operationDate:{
    type:Date
  },

  medicaldetails:{
    type:String
  },

  cancelReason:{
    type:String
  },

  transplantHospitalDetails: { type: Schema.Types.ObjectId, ref: Hospital },

  donorDetails: { type: Schema.Types.ObjectId, ref: Donor },

  receivingPatientDetails: { type: Schema.Types.ObjectId, ref: Patient }

},
{ timestamps: true });

module.exports=mongoose.model("LivingDonation",LivingDonationSchema)