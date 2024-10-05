import React from 'react'
import {
  Routes,
  Route,
//   useLocation
} from "react-router-dom";
import DonationRequest from '../Components/Admin/DonationRequest';
// import Account from '../Components/Admin/Account';
import Home from '../Components/Admin/Home';
import OrganRequest from '../Components/Admin/OrganRequest';
import VerifyHospital from '../Components/Admin/VerifyHospital';
// import classes from '../Components/Login/Login.module.css'

export default function Admin(){
  return (
    <div className={`text-center m-2`}>
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/verifyhospitals" element={<VerifyHospital/>} />
        <Route path="/organrequest" element={<OrganRequest/>} />
        <Route path="/donationrequest" element={<DonationRequest/>} />
    </Routes>
    </div>
  )
}