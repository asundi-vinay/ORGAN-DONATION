import React from 'react'
import {
  Routes,
  Route,
//   Navigate,
//   useLocation
} from "react-router-dom";
import Account from '../Components/Donor/Account';
import Deceased from '../Components/Donor/Deceased';
import Home from '../Components/Donor/Home';
import Living from '../Components/Donor/Living';
import Print from '../Components/Donor/Print';
// import classes from '../Components/Login/Login.module.css'

export default function Donor(){
  return (
    <div className={`text-center m-2`}>
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/account" element={<Account/>} />
        <Route path="/livingdonation" element={<Living/>} />
        <Route path="/deceaseddonation" element={<Deceased/>} />
        <Route path="/print" element={<Print/>} />

        {/* /donor/livingdonation */}
    </Routes>
    </div>
  )
}
