const router = require("express").Router();
const bcrypt = require("bcrypt");
const Userid = require("../models/Userid");
const Hospital = require("../models/Hospital");
const Patient = require("../models/Patient");
const DeceasedDonation = require("../models/DeceasedDonation");
const LivingDonation = require("../models/LivingDonation");

// Hospital Account Registration Route
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const counter=await Userid.countDocuments()
    if( counter === 0) {
      const newuserid=new Userid(
        {
          autoid:0
        }
      );
      const a =await newuserid.save();
    }
    const counter2=await Userid.countDocuments()
    if(counter2 ===1){
      await Userid.findOneAndUpdate({}, {$inc : {"autoid" : 1}});
      const newuserid=await Userid.findOne({});
      const newHospital = new Hospital({
        name: req.body.name,
        email: req.body.email,
        password: hashedPass,
        userid: newuserid.autoid,
        role: "Hospital",
        verificationstatus:"Pending"
      });
      const hsptl = await newHospital.save();
      res.status(200).json(hsptl);
    }
    else{
      res.status(500).json({message:"There are invalid number of records"});
    }
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// Hospital Details Entry
router.put("/entrydetails/:hospitalid", async (req, res) => {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await Hospital.findByIdAndUpdate(
        req.params.hospitalid,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
  }
});

// Getting Particular Hospital Details
router.get("/getdetails/:hospitalid",async(req,res)=>{
  try{
    const hospital=await Hospital.findById(req.params.hospitalid);
    const { password, ...others } = hospital._doc;
    res.status(200).json(others);
  }
  catch(err){
    res.status(500).json(err)
  }
});

//-------------------------------------------------------------------------------------------------------
//                                            Patients

// Creating Patients Data
router.post("/createpatient/:hospitalid", async (req, res) => {
  try {
    const newPatient = new Patient({
      name: req.body.name,
      email: req.body.email,
      gender: req.body.gender,
      phone: req.body.phone,
      DOB: req.body.DOB,
      address: req.body.address,
      bloodgroup: req.body.bloodgroup,
      medicalCondition: req.body.medicalCondition,
      requiredOrgan: req.body.requiredOrgan,
      requestStatus:"Requested",
      patientHospitalDetails:req.params.hospitalid
    });
    const patient = await newPatient.save();
    Patient.findById(patient._id,function(err,pat){
      if(err){
        res.status(401).json(err)
      }
      const{password,...others}=pat.patientHospitalDetails._doc
      pat.patientHospitalDetails=others
      res.status(200).json(pat)
    }).populate("patientHospitalDetails")
  }
  catch (err) {
    res.status(500).json(err);
  }
});


//Get ALL The Non Confirmed Patient Requests
router.get("/getnonconfirmedpatientrequests/:hospitalid", async(req,res)=>{
  try{
    Patient.find({ requestStatus:'Requested', patientHospitalDetails:req.params.hospitalid},function(err,listpat){
      if(err){
        res.status(401).json(err)
      }
      var listp=[]
      listpat.forEach((element) => {
        const{password,...others}=element.patientHospitalDetails._doc
        element.patientHospitalDetails=others
        listp.push(element)
        if(listpat.length===listp.length){
          f(listp)
        }
      });
      async function f(listp){
        res.status(200).json(listp)
      }
    }).populate("patientHospitalDetails")
  }
  catch{
    res.status(500).json(err);
  }
})

// Get ALl Confirmed Patient Requests Of A Particular Hospital
router.get("/getconfirmedpatientrequests/:hospitalid",async(req,res)=>{
  try{
    Patient.find({requestStatus:"Confirmed", patientHospitalDetails:req.params.hospitalid},'_id').exec((err,patids)=>{
      if(err){
        res.status(401).json(err)
      }
      DeceasedDonation.find({donationStatus:"Completed", receivingPatientDetails:{$in:patids}},function(err,dd){
        if(err){
          res.status(401).json(err)
        }
        LivingDonation.find({donationStatus:"Completed", receivingPatientDetails:{$in:patids}},function(err,ld){
          if(err){
            res.status(401).json(err)
          }
          ld.forEach((i)=>{
            dd.push(i)
          })
          res.status(200).json(dd)
        }).populate([{
          path : 'receivingPatientDetails',
          populate : {
            path : 'patientHospitalDetails'
          }
        },
        {
          path : 'donorDetails' 
        },
        {
          path : 'transplantHospitalDetails' 
        }])
      }).populate([{
        path : 'receivingPatientDetails',
        populate : {
          path : 'patientHospitalDetails'
        }
      },{
          path : 'donorDetails',
          populate : {
            path : 'transplantHospitalDetails'
          }
      }])
    })
  }
  catch(err){
    res.status(500).json(err)
  }
})

// Get ALl Completed Patient Requests Of A Particular Hospital
router.get("/getcompletedpatientrequests/:hospitalid",async(req,res)=>{
  try{
    Patient.find({requestStatus:"Completed", patientHospitalDetails:req.params.hospitalid},'_id').exec((err,patids)=>{
      if(err){
        res.status(401).json(err)
      }
      DeceasedDonation.find({donationStatus:"Completed", receivingPatientDetails:{$in:patids}},function(err,dd){
        if(err){
          res.status(401).json(err)
        }
        LivingDonation.find({donationStatus:"Completed", receivingPatientDetails:{$in:patids}},function(err,ld){
          if(err){
            res.status(401).json(err)
          }
          ld.forEach((i)=>{
            dd.push(i)
          })
          res.status(200).json(dd)
        }).populate([{
          path : 'receivingPatientDetails',
          populate : {
            path : 'patientHospitalDetails'
          }
        },
        {
          path : 'donorDetails' 
        },
        {
          path : 'transplantHospitalDetails' 
        }])
      }).populate([{
        path : 'receivingPatientDetails',
        populate : {
          path : 'patientHospitalDetails'
        }
      },{
          path : 'donorDetails',
          populate : {
            path : 'transplantHospitalDetails'
          }
      }])
    })
  }
  catch(err){
    res.status(500).json(err)
  }
})


router.get("/getcancelledpatientrequests/:hospitalid",async(req,res)=>{
  try{
    const data=await Patient.find({requestStatus:"Cancelled", patientHospitalDetails:req.params.hospitalid})
      res.status(200).json(data)
  }
  catch(err){
    res.status(500).json(err)
  }
})

//-------------------------------------------------------------------------------------------------------
module.exports=router;