const mongoose =require('mongoose')
const Hospital = require("./Hospital");
const Schema=require('mongoose').Schema

const PatientSchema =mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    
    email: {
        type: String,
        required: true
    },
    
    gender:{
        type:String,
        enum:["Male","Female","Others"],
        required: true
    },
    
    phone: {
        type: Number,
        required: true
    },
    
    DOB: {
        type: Date,
        required: true
    },
    
    address: {
        type: String,
        required: true
    },
    
    bloodgroup: {
        type: String,
        required: true
    },

    // Medical Condition Currently Facing OR The Reason For Requesting Transplantation
    medicalCondition:{
        type:String,
        required:true
    },

    requiredOrgan: {
        type: String,
        required: true,
        enum:["Eyes","Kidney","Heart"]
    },

    requestStatus: {
        type: String,
        required: true,
        default:"Requested",
        enum:["Requested","Confirmed","Completed","Cancelled"]
    },

    transplantationDate: {
        type: Date
    },

    cancelReason:{
        type:String
    },

    patientHospitalDetails: { type: Schema.Types.ObjectId, ref: Hospital }

},
{ timestamps: true });

module.exports=mongoose.model("Patient",PatientSchema)