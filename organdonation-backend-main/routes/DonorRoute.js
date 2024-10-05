const router = require("express").Router();
const bcrypt = require("bcrypt");
const Userid = require("../models/Userid");
const Donor = require("../models/Donor");
const DeceasedDonation = require("../models/DeceasedDonation");
const LivingDonation = require("../models/LivingDonation");

// Donor account registration Route
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
      const newDonor = new Donor({
        name: req.body.name,
        email: req.body.email,
        password: hashedPass,
        userid: newuserid.autoid,
        role: "Donor",
      });
      const donor = await newDonor.save();
      res.status(200).json(donor);
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

// router.put("/entrydetails/:donorid", async (req, res) => {
//   try {
//     Donor.findByIdAndUpdate(req.params.donorid,req.body, {new: true},function(err,dnr){
//       const { password, ...others } = dnr._doc;
//       res.status(200).json(others);
//     })
//   } 
//   catch (err) {
//     res.status(500).json(err);
//   }
// });


// Donor Details Entry
router.put("/entrydetails/:donorid", async (req, res) => {
  try {
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      }
      const updatedUser = await Donor.findByIdAndUpdate(
        req.params.donorid,
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

// Getting Particular Donor Details
router.get("/getdetails/:donorid", async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.donorid);
    const { password, ...others } = donor._doc;
    res.status(200).json(others);
  } 
  catch (err) {
    res.status(500).json(err);
  }
});



// Donor Applying For A Deceased Donation
router.post("/deceaseddonationrequest/:donorid", async (req, res) => {
  try {
    const a=await DeceasedDonation.find({donorDetails:req.params.donorid,donationStatus:{ $ne: "Cancelled" }})
    if(a.length===0){
      var listd=[]
      for (const i of req.body.donationOrgans) {
          const ddon = new DeceasedDonation({ donationOrgan:i , donationStatus:"Pending", donorDetails:req.params.donorid , donationType:"Deceased"})
          const dd= await ddon.save();
          listd.push(dd)
      }
      res.status(200).json(listd)
    }
    else{
      res.status(400).json({message:"The Specified Donor Has Already Requested For A Deceased Donation, Another Request Cannot Be Made For The Same Donor"})
    }
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

// Donor Applying For A Living Donation
router.post("/livingdonationrequest/:donorid", async (req, res) => {
  try {
    var listd=[]
    for (const i of req.body.donationOrgans) {
      if(i!=="Heart"){
        const ldon = new LivingDonation({ donationOrgan:i , donationStatus:"Pending", donorDetails:req.params.donorid, donationType:"Living" })
        const ld= await ldon.save();
        listd.push(ld)
      }
      else{
        res.status(500).json({message:"Living Donor Cannot Donate Heart"})
      }
    }
    res.status(200).json(listd)
  } 
  catch (err) {
    res.status(500).json(err);
  }
});

// Getting all The Donation applications of a particular Donor
router.get("/getdonations/:donorid", async (req, res) => {
  try {
    async function f(ddon){
      res.status(200).json(ddon)
    }
    DeceasedDonation.find({donorDetails:req.params.donorid}).exec((err,ddon)=>{
      if(err){
        res.status(401).json(err)
      }
      LivingDonation.find({donorDetails:req.params.donorid}).exec((err,ldon)=>{
        if(err){
          res.status(401).json(err)
        }
        ldon.forEach((j)=>{
          ddon.push(j)
        })
        f(ddon)
      })
    })
  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;