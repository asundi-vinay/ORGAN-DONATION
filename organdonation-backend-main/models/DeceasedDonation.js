const mongoose =require('mongoose')
const Donor = require('./Donor');
const Patient = require('./Patient');
const Schema=require('mongoose').Schema

const DeceasedDonationSchema =mongoose.Schema({

  donationOrgan: {
    type: String,
    required: true,
    enum:["Eyes","Kidney","Heart"]
  },

  donationStatus: {
    type: String,
    required: true,
    default:"Pending",
    enum:["Pending","Verified","Confirmed","Completed","Cancelled"]
  },

  donationType:{
    type:String,
    required:true,
    default:"Deceased",
    enum:["Deceased"]
  },

  cancelReason:{
    type: String
  },
  
  donorDetails: { type: Schema.Types.ObjectId, ref: Donor },

  receivingPatientDetails: { type: Schema.Types.ObjectId, ref: Patient }

},
{ timestamps: true });

module.exports=mongoose.model("DeceasedDonation",DeceasedDonationSchema)