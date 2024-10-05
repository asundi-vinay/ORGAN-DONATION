const router = require("express").Router();
const bcrypt = require("bcrypt");
const Donor = require("../models/Donor");
const Hospital = require("../models/Hospital");
const Admin = require("../models/Admin");


router.post("/login", async (req, res) => {
  try {
    const user = await Hospital.findOne({ email: req.body.email });
    if(!user){
      const patient=await Donor.findOne({ email: req.body.email })
      if(!patient){
        const admin=await Admin.findOne({ email: req.body.email })
            if(!admin){
                    res.status(400).json({message:"Wrong credentials!"});
            }
            else{
                const validated = await bcrypt.compare(req.body.password, admin.password);
                if(!validated){
                        res.status(400).json({message:"Wrong credentials!"});
                    }
                else{
                        const { password, ...others } = admin._doc;
                        res.status(200).json(others);
                    }
      }
      }
      else{
           const validated = await bcrypt.compare(req.body.password, patient.password);
          if(!validated){
              res.status(400).json({message:"Wrong credentials!"});
          }
          else{
              const { password, ...others } = patient._doc;
              res.status(200).json(others);
          }
      }    
  }
  else{
      const validated = await bcrypt.compare(req.body.password, user.password);
      if(!validated){
          res.status(400).json({message:"Wrong credentials!"});
      }
      else{
          const { password, ...others } = user._doc;
          res.status(200).json(others);
      }
  
  }

  } catch (err) {
    res.status(500).json(err);
  }
});
  
module.exports = router;