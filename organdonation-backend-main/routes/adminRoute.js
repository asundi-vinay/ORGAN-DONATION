const router = require("express").Router();
const Admin = require("../models/Admin");
const Hospital = require("../models/Hospital");
const bcrypt = require("bcrypt");
const DeceasedDonation = require("../models/DeceasedDonation");
const LivingDonation = require("../models/LivingDonation");
const Donor = require("../models/Donor");
const Patient = require("../models/Patient");

//-------------------------------------------------------------------------------------------------------
//                                               Creation of Admin

router.post("/create", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newAdmin = new Admin({
      name: req.body.name,
      email: req.body.email,
      password: hashedPass,
      role: "Admin",
    });
    const admin = await newAdmin.save();
    res.status(200).json(admin);
  } 
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//-------------------------------------------------------------------------------------------------------
//                                       Hospitals And Their Verification

// Getting All Hospitals Which Are Yet To Be Verified
router.get("/getunverifiedhospitals", async (req, res) => {
  try{
    const hospitals=await Hospital.find({verificationstatus:"Pending"})
    var listhospitals=[]
    hospitals.forEach((hsptl)=>{
      const { password, ...others } = hsptl._doc;
      listhospitals.push(others)
    })
    res.status(200).json(listhospitals)
  }
  catch(err){
    res.status(500).json(err)
  }
});

// Verification of Hospital
router.get("/verifyhospital/:hospitalid",async(req,res)=>{
  try{
    const hsp=await Hospital.findById(req.params.hospitalid)
    if(hsp.verificationstatus==="Verified"){
      res.status(400).json("The Requested Hospital Is Already Verified");
    }
    else if(hsp.verificationstatus==="Pending"){
      Hospital.findByIdAndUpdate(req.params.hospitalid,{ verificationstatus:'Verified'}, {new: true},function(err,hsptl){
        if(err){
          req.status(400).json(err)
        }
        const { password, ...others } = hsptl._doc;
        res.status(200).json(others);
      })
    }
  }
  catch(err){
      res.status(500).json(err)
  }
});

// Getting All Hospitals Which Are Verified
router.get("/getverifiedhospitals", async (req, res) => {
  try{
    const hospitals=await Hospital.find({verificationstatus:"Verified"})
    var listhospitals=[]
    hospitals.forEach((hsptl)=>{
      const { password, ...others } = hsptl._doc;
      listhospitals.push(others)
    })
    res.status(200).json(listhospitals)
  }
  catch(err){
    res.status(500).json(err)
  }
});

//Cancel The Hospital Request
router.put("/cancelhospitalrequest/:hospitalid",async(req,res)=>{
  try{
    Hospital.findByIdAndUpdate(req.params.hospitalid,{ verificationstatus:"Rejected", cancelReason:req.body.cancelReason },{ new:true },function(err,hosp){
      if(err){
        res.status(401).json(err)
      }
      const{password,...others}=hosp._doc
      res.status(200).json(others)
    })
  }
  catch(err){
    res.status(500).json(err)
  }
})

//-------------------------------------------------------------------------------------------------------
//                                                Deceased Donation

// Getting All Donors Who Have Applied/Requested For Deceased Donation
router.get("/getunverifieddeceaseddonations", async (req, res) => {
  try{
    DeceasedDonation.find({donationStatus:"Pending"}).populate("donorDetails").exec((err,deceaseddonations)=>{
      if(err){
        res.status(400).json(err);
      }
      var listdeceaseddonations=[]
      deceaseddonations.forEach((i)=>{
        const { password, ...others } = i.donorDetails._doc;
        i.donorDetails=others
        listdeceaseddonations.push(i)
      })
      res.status(200).json(listdeceaseddonations)
    })
  }
  catch(err){
    res.status(500).json(err)
  }
});

//  Cancel The Deceased Donation Request
router.put("/canceldeceaseddonation/:donationid",async(req,res)=>{
  try{
    DeceasedDonation.findByIdAndUpdate(req.params.donationid,{ donationStatus:"Cancelled", cancelReason:req.body.cancelReason },{ new:true },function(err,dd){
      if(err){
        res.status(401).json(err)
      }
      const{password,...others}=dd._doc
      res.status(200).json(others)
    })
  }
  catch(err){
    res.status(500).json(err)
  }
})

// Verifying The Deceased Donation Request
router.put("/verifydeceaseddonation/:donorid",async(req,res)=>{
  try{
    DeceasedDonation.find({ donorDetails:req.params.donorid, donationStatus:"Pending" }, function(err,listdd){
      if(err){
        res.status(401).json(err)
      }
      var listd=[]
      listdd.forEach((i)=>{
        DeceasedDonation.findByIdAndUpdate(i._id,{ donationStatus:"Verified"},{ new:true },function(err,dd){
          if(err){
            res.status(401).json(err)
          }
          const{password,...others}=dd.donorDetails._doc
          dd.donorDetails=others
          listd.push(dd)
          if(listd.length===listdd.length){
            f(listd)
          }
        }).populate("donorDetails")
      })
      async function f(listd){
        res.status(200).json(listd);
      }
    })
    // const d=await DeceasedDonation.findById(req.params.deceasedid)
    // if(d.donationStatus==="Verified"){
    //   res.status(400).json("The Requested Donation Is Already Verified");
    // }
    // else if(d.donationStatus==="Pending"){
    //   DeceasedDonation.findByIdAndUpdate(req.params.deceasedid,{donationStatus:'Verified'}, {new: true},function(err,dd){
    //     if(err){
    //       req.status(400).json(err)
    //     }
    //     const { password, ...others } = dd.donorDetails._doc;
    //     dd.donorDetails=others
    //     res.status(200).json(dd._doc);
    //   }).populate("donorDetails")
    // }
  }
  catch(err){
    res.status(500).json(err)
  }
});

// Getting All Verified Deceased Donation
router.get("/getverifieddeceaseddonations", async (req, res) => {
  try{
    DeceasedDonation.find({donationStatus:"Verified"}).populate("donorDetails").exec((err,deceaseddonations)=>{
      if(err){
        res.status(400).json(err);
      }
      var listdeceaseddonations=[]
      deceaseddonations.forEach((i)=>{
        const { password, ...others } = i.donorDetails._doc;
        i.donorDetails=others
        listdeceaseddonations.push(i)
        if(listdeceaseddonations.length===deceaseddonations.length){
          f(listdeceaseddonations)
        }
      })
      async function f(listdeceaseddonations){
        res.status(200).json(listdeceaseddonations)
      }
    })
  }
  catch(err){
    res.status(500).json(err)
  }
});

// Confirming The Death Of The Donor And If the Permission From Family Is Obtained Uploading Medical Details 
router.put("/confirmdeathanduploaddetails/:donorid",async(req,res)=>{
  try{
    if(!req.body.familyPermission){
      res.status(401).json("Get Family Permission Before Confirming");
    }
    else{

      const donor=await Donor.findById(req.params.donorid)
      if(donor.deathDate){
        res.status(401).json("The Medical Details Regarding The Death Have Already Been Filled")
      }
      else{
        Donor.findByIdAndUpdate(donor._id, req.body , {new:true} , function(err,don){
          if(err){
            res.status(401).json(err)
          }
          DeceasedDonation.find({ donorDetails:donor._id, donationStatus:"Verified" },function(err, listdd){
            if(err){
              res.status(401).json(err)
            }
            var listd=[]
            listdd.forEach((i)=>{
              if(i.donationStatus==="Confirmed"){
                res.status(401).json("The Deceased Donations Associated With This Donor Have Already Been Confirmed")
              }
              else{
                DeceasedDonation.findByIdAndUpdate(i._id,{ donationStatus:'Confirmed' },{ new:true },function(err,dd){
                  if(err){
                    res.status(401).json(err)
                  }
                  const { password, ...others } = dd.donorDetails._doc;
                  dd.donorDetails=others
                  listd.push(dd)
                  if(listd.length===listdd.length){
                    f(listd)
                  }
                }).populate("donorDetails")
              }
            })
            async function f(listd){
              res.status(200).json(listd)
            }
          })
        })
        
      }
      // const d=await DeceasedDonation.findById(req.params.deceasedid)
      // if(d.donationStatus==="Confirmed"){
      //   res.status(401).json("The Requested Donation Is Already Confirmed");
      // }
      // else if(d.donationStatus==="Verified"){
      //   Donor.findByIdAndUpdate(d.donorDetails, req.body, {new:true},function(err,dono){
      //     if(err){
      //       res.status(401).json(err)
      //     }
      //     DeceasedDonation.findByIdAndUpdate(req.params.deceasedid,{ donationStatus:"Confirmed" }, {new: true},function(err,dd){
      //       if(err){
      //         res.status(401).json(err)
      //       }
      //       const { password, ...others } = dd.donorDetails._doc;
      //       dd.donorDetails=others
      //       res.status(200).json(dd._doc);
      //       }).populate("donorDetails")
      //   })
      // }
      // else{
      //   res.status(401).json("The Requested Donation Not Yet Verified");
      // }
    }
  }
  catch(err){
    res.status(500).json(err)
  }
});

// Getting All Confirmed Deceased Donation
router.get("/getconfirmeddeceaseddonations", async (req, res) => {
  try{
    DeceasedDonation.find({donationStatus:"Confirmed"}).populate("donorDetails").exec((err,deceaseddonations)=>{
      if(err){
        res.status(400).json(err);
      }
      var listdeceaseddonations=[]
      deceaseddonations.forEach((i)=>{
        const { password, ...others } = i.donorDetails._doc;
        i.donorDetails=others
        listdeceaseddonations.push(i)
      })
      res.status(200).json(listdeceaseddonations)
    })
  }
  catch(err){
    res.status(500).json(err)
  }
});

// Conducting The Transplantation And Entering Transplant Hospital Details
router.put("/completetransplantation/:donorid/:hospitalid",async(req,res)=>{
  try{
    const a={ transplantHospitalDetails:req.params.hospitalid }
    const n={...req.body,...a}
    Donor.findByIdAndUpdate(req.params.donorid, n , {new:true}, function(err, donor){
      if(err){
        res.status(401).json(err)
      }
      DeceasedDonation.find({ donorDetails:req.params.donorid, donationStatus:"Confirmed" }, function(err,dd){
        if(err){
          res.status(401).json(err);
        }
        var listd=[]
        dd.forEach((i)=>{
          DeceasedDonation.findByIdAndUpdate(i._id,{ donationStatus:"Completed" },{new:true},function(err,d){
            if(err){
              res.status(401).json(err)
            }
            listd.push(d)
            if(listd.length===dd.length){
              f(listd)
            }
          }).populate({
            path : 'donorDetails',
            populate : {
              path : 'transplantHospitalDetails'
            }
          })
        })
        async function f(listd){
          res.status(200).json(listd)
        }
      })
    })

    // const d=await DeceasedDonation.findById(req.params.deceasedid)
    // if(d.donationStatus==="Completed"){
    //   res.status(401).json("The Requested Donation Is Already Completed");
    // }
    // else if(d.donationStatus==="Confirmed"){
    //   const a={ transplantHospitalDetails:req.params.hospitalid }
    //   const n={...req.body,...a}
    //   Donor.findByIdAndUpdate(d.donorDetails, n , {new:true},function(err,dono){
    //     if(err){
    //       res.status(401).json(err)
    //     }
    //     DeceasedDonation.findByIdAndUpdate(req.params.deceasedid, { donationStatus:"Completed" } , {new: true}, function(err,dd){
    //       if(err){
    //         res.status(401).json(err)
    //       }
    //       const{password,...donorothers}=dd.donorDetails._doc
    //       dd.donorDetails=donorothers
    //       res.status(200).json(dd._doc)
    //     }).populate("donorDetails")
    //   })
    // }
    // else{
    //   res.status(401).json("The Requested Donation Is Not Confirmed, Hence Cannot Be Completed");
    // }
  }
  catch(err){
    res.status(500).json(err)
  }
});

// Getting All Completed Deceased Donation
router.get("/getcompleteddeceaseddonations", async (req, res) => {
  try{
    DeceasedDonation.find({donationStatus:"Completed"}).populate({
      path : 'donorDetails',
      populate : {
        path : 'transplantHospitalDetails'
      }
    }).exec(function (err, resp) {
      if(err){
        res.status(401).json(err)
      }
      res.status(200).json(resp)
    })
  }
  catch(err){
    res.status(500).json(err)
  }
});

//-------------------------------------------------------------------------------------------------------
//                                              Living Donation

// Getting All Donors Who Have Applied/Requested For A Living Donation
router.get("/getpendinglivingdonations", async (req, res) => {
  try{
    LivingDonation.find({donationStatus:"Pending"}).populate("donorDetails").exec((err,livingdonations)=>{
      if(err){
        res.status(400).json(err);
      }
      var listlivingdonations=[]
      livingdonations.forEach((i)=>{
        const { password, ...others } = i.donorDetails._doc;
        i.donorDetails=others
        listlivingdonations.push(i)
      })
      res.status(200).json(listlivingdonations)
    })
  }
  catch(err){
    res.status(500).json(err)
  }
});

//  Cancel The Living Donation Request
router.put("/cancellivingdonation/:donationid",async(req,res)=>{
  try{
    LivingDonation.findByIdAndUpdate(req.params.donationid,{ donationStatus:"Cancelled", cancelReason:req.body.cancelReason },{ new:true },function(err,ld){
      if(err){
        res.status(401).json(err)
      }
      const{password,...others}=ld._doc
      res.status(200).json(others)
    })
  }
  catch(err){
    res.status(500).json(err)
  }
})

// Confirming With The Donor About The Operation/Transplantation
router.get("/confirmoperation/:livingid",async(req,res)=>{
  try{
    const l=await LivingDonation.findById(req.params.livingid)
    if(l.donationStatus==="Confirmed"){
      res.status(400).json("The Requested Living Donation Is Already Confirmed");
    }
    else if(l.donationStatus==="Pending"){
      LivingDonation.findByIdAndUpdate(req.params.livingid , { donationStatus:"Confirmed" } , {new: true},function(err,ld){
      if(err){
        req.status(400).json(err)
      }
      const { password, ...others } = ld.donorDetails._doc;
      ld.donorDetails=others
      res.status(200).json(ld._doc);
      }).populate("donorDetails")
    }
    else if(l.donationStatus==="Cancelled"){
      res.status(400).json("The Requested Living Donation Has Been Cancelled");
    }
    else if(l.donationStatus==="Completed"){
      res.status(400).json("The Requested Living Donation Has Been Completed");
    }
    else{
      res.status(400).json("The Requested Living Donation Cannot Be Confirmed");
    }
  }
  catch(err){
    res.status(500).json(err)
  }
});

// Getting All Confirmed Living Donation
router.get("/getconfirmedlivingdonations", async (req, res) => {
  try{
    LivingDonation.find({donationStatus:"Confirmed"}).populate("donorDetails").exec((err,livingdonations)=>{
      if(err){
        res.status(400).json(err);
      }
      var listlivingdonations=[]
      livingdonations.forEach((i)=>{
        const { password, ...others } = i.donorDetails._doc;
        i.donorDetails=others
        listlivingdonations.push(i)
      })
      res.status(200).json(listlivingdonations)
    })
  }
  catch(err){
    res.status(500).json(err)
  }
});

// Conducting The Transplantation And Entering Transplant Hospital Details
router.put("/completelivingtransplantation/:livingid/:hospitalid",async(req,res)=>{
  try{
    const l=await LivingDonation.findById(req.params.livingid)
    if(l.donationStatus==="Completed"){
      res.status(401).json("The Requested Donation Is Already Completed");
    }
    else if(l.donationStatus==="Confirmed"){
      LivingDonation.findByIdAndUpdate(req.params.livingid, { medicaldetails:req.body.medicaldetails, operationDate:req.body.operationDate, transplantHospitalDetails:req.params.hospitalid, donationStatus:"Completed" } , {new: true}, function(err,ld){
          if(err){
            res.status(401).json(err)
          }
          const{password,...donorothers}=ld.donorDetails._doc
          ld.donorDetails=donorothers
          if(ld.transplantHospitalDetails){
            const{password,...HospitalDetailsothers}=ld.transplantHospitalDetails._doc
            ld.transplantHospitalDetails=HospitalDetailsothers
          }
          res.status(200).json(ld._doc)
        }).populate("donorDetails").populate("transplantHospitalDetails")
    }
    else{
      res.status(401).json("The Requested Donation Is Not Confirmed, Hence Cannot Be Completed");
    }
  }
  catch(err){
    res.status(500).json(err)
  }
});

// Getting All Completed Living Donation
router.get("/getcompletedlivingdonations", async (req, res) => {
  try{
    LivingDonation.find({donationStatus:"Completed"}).populate("donorDetails").populate("transplantHospitalDetails").populate("receivingPatientDetails").exec((err,livingdonations)=>{
      if(err){
        res.status(400).json(err);
      }
      var listlivingdonations=[]
      livingdonations.forEach((i)=>{
        const { password, ...others } = i.donorDetails._doc;
        i.donorDetails=others
        if(i.transplantHospitalDetails){
          const { password, ...others } = i.transplantHospitalDetails._doc;
          i.transplantHospitalDetails=others
        }
        if(i.receivingPatientDetails){
          const { password, ...others } = i.receivingPatientDetails._doc;
          i.receivingPatientDetails=others
        }
        listlivingdonations.push(i)
      })
      res.status(200).json(listlivingdonations)
    })
  }
  catch(err){
    res.status(500).json(err)
  }
});


// Get ALl The Completed Donations
router.get("/getcompleteddonations",async(req,res)=>{
  try{
    Patient.find({requestStatus:{$in:["Confirmed","Completed"]}},'_id').exec((err,patids)=>{
      if(err){
        res.status(401).json(err)
      }
      DeceasedDonation.find({donationStatus:"Completed", receivingPatientDetails:{$nin:patids}},function(err,dd){
        if(err){
          res.status(401).json(err)
        }
        LivingDonation.find({donationStatus:"Completed", receivingPatientDetails:{$nin:patids}},function(err,ld){
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


// Get All Living Donations(Pending, Confirmed) And Deceased Donations(Pending, Verified, Confirmed)
router.get("/getlddonations",async(req,res)=>{
  try{
    LivingDonation.find({donationStatus:{$in:["Pending","Confirmed"]}},function(err,ld){
      if(err){
        res.status(401).json(err)
      }
      DeceasedDonation.find({donationStatus:{$in:["Pending","Verified","Confirmed"]}},function(err,dd){
        if(err){
          res.status(401).json(err)
        }
        dd.forEach((i)=>{
          ld.push(i)
        })
        res.status(200).json(ld)
      }).populate("donorDetails")
    }).populate("donorDetails")
  }
  catch(err){
    res.status(500).json(err)
  }
})


//-------------------------------------------------------------------------------------------------------
//                                          Patients

// Get all The Patient Requests From All The Hospitals
// router.get("/getallpatientrequests",async(req,res)=>{
//   try{
//     Patient.find({ requestStatus:{$in:["Requested","Confirmed"]} },function(err,listpat){
//       if(err){
//         res.status(401).json(err)
//       }
//       var listp=[]
//       listpat.forEach((i)=>{
//         const{password,...others}=i.patientHospitalDetails._doc
//         i.patientHospitalDetails=others
//         listp.push(i)
//         if(listp.length===listpat.length){
//           f(listp)
//         }
//       })
//       async function f(listp){
//         res.status(200).json(listp)
//       }
//     }).populate("patientHospitalDetails").populate("")
//   }
//   catch(err){
//     res.status(500).json(err)
//   }
// })

//GET ALL PATIENT REUESTS EXCEPT COMPLETED AND CONFIRMED
router.get("/getallpatientrequests",async(req,res)=>{
  try{
    Patient.find({ requestStatus:'Requested' },function(err,listpat){
      if(err){
        res.status(401).json(err)
      }
      var listp=[]
      listpat.forEach((i)=>{
        const{password,...others}=i.patientHospitalDetails._doc
        i.patientHospitalDetails=others
        listp.push(i)
        if(listp.length===listpat.length){
          f(listp)
        }
      })
      async function f(listp){
        res.status(200).json(listp)
      }
    }).populate("patientHospitalDetails")
  }
  catch(err){
    res.status(500).json(err)
  }
})

// Cancel The Patient Request
router.put("/cancelpatientrequest/:patientid",async(req,res)=>{
  try{
    Patient.findByIdAndUpdate(req.params.patientid,{ requestStatus:"Cancelled", cancelReason:req.body.cancelReason },{ new:true },function(err,pat){
      if(err){
        res.status(401).json(err)
      }
      res.status(200).json(pat)
    })
  }
  catch(err){
    res.status(500).json(err)
  }
})

// Confirm Patient Request
router.get("/confirmpatientrequest/:patientid/:donationid",async(req,res)=>{
  try{
    const d=await DeceasedDonation.findById(req.params.donationid)
    const l=await LivingDonation.findById(req.params.donationid)
    const p=await Patient.findById(req.params.patientid)
    if(p.requestStatus==="Requested"){
      if(l){
        if(l.donationStatus==="Completed"){
          if(l.donationOrgan===p.requiredOrgan){
            Patient.findByIdAndUpdate(req.params.patientid,{requestStatus:"Confirmed"},{new:true},function(err,pat){
              if(err){
                console.log(err)
                res.status(401).json(err)
              }
              LivingDonation.findOneAndUpdate({_id:req.params.donationid , donationStatus:"Completed", donationOrgan:pat.requiredOrgan },{receivingPatientDetails:req.params.patientid},{new:true},function(err,ld){
                if(err){
                  console.log(err)
                  res.status(401).json(err)
                }
                res.status(200).json(ld)
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
            })
          }
          else{
            res.status(401).json({message:"The Organs Do Not Match"})
          }
        }
        else{
          res.status(401).json({message:"The Transplantation Being Referred To Is Not Yet Completed"})
        }
      }
      else if(d){
        if(d.donationStatus==="Completed"){
          if(d.donationOrgan===p.requiredOrgan){
            Patient.findByIdAndUpdate(req.params.patientid,{requestStatus:"Confirmed"},{new:true},function(err,pat){
              if(err){
                res.status(401).json(err)
              }
              DeceasedDonation.findOneAndUpdate({_id:req.params.donationid , donationStatus:"Completed", donationOrgan:pat.requiredOrgan },{receivingPatientDetails:req.params.patientid},{new:true},function(err,dd){
                if(err){
                  res.status(401).json(err)
                }
                res.status(200).json(dd)
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
          else{
            res.status(401).json({message:"The Organs Do Not Match"})
          }
        }
        else{
          res.status(401).json({message:"The Transplantation Being Referred To Is Not Yet Completed"})
        }
      }
      else{
        res.status(401).json({message:"Donation Invalid"})
      }
    }
    else{
      res.status(401).json({message:"The Request Of The Specified Patient Cannot Be Confirmed"})
    }
  }
  catch(err){
    res.status(500).json(err)
  }
})

// Get ALl Confirmed Patient Requests
router.get("/getallconfirmedpatientrequests",async(req,res)=>{
  try{
    Patient.find({requestStatus:"Confirmed"},'_id').exec((err,patids)=>{
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

// Complete A Patient Transplantation
router.put("/completepatienttransplanation/:patientid",async(req,res)=>{
  try{
    const p= await Patient.findById(req.params.patientid)
    if(p.requestStatus==="Confirmed"){
      const a={
        requestStatus:"Completed",
        transplantationDate:req.body.transplantationDate
      }
      console.log(a)
      Patient.findByIdAndUpdate(req.params.patientid, a ,{ new:true },function(err,pat){
        if(err){
          res.status(401).json(err)
        }
        if(pat){
          LivingDonation.find({donationStatus:"Completed", receivingPatientDetails:req.params.patientid},function(err,ld){
            if(err){
              res.status(401).json(err)
            }
            if(ld){
              res.status(200).json(ld)
            }
            else{
              DeceasedDonation.find({donationStatus:"Completed", receivingPatientDetails:req.params.patientid},function(err,dd){
                if(err){
                  res.status(401).json(err)
                }
                res.status(200).json(dd)
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
            }
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
        }
        else{
          res.status(401).json("The Details Of The patient request is Not Updated")
        }
      })
    }
    else{
      res.status(401).json("The Requested Patient Is Not Confirmed and Hence Cannot Proceed")
    }
  }
  catch(err){
    console.log(err)
    res.status(500).json(err)
  }
})

//  Get All Completed Patient Requests
router.get("/getallcompletedpatientrequests",async(req,res)=>{
  try{
    Patient.find({requestStatus:"Completed"},'_id').exec((err,patids)=>{
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

//-------------------------------------------------------------------------------------------------------
module.exports = router;