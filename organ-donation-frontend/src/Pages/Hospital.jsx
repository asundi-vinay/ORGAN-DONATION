import React from 'react'
import {
  Routes,
  Route,
  // Navigate,
//   useLocation
} from "react-router-dom";
import Account from '../Components/Hospital/Account';
import Home from '../Components/Hospital/Home';
import RequestOrgan from '../Components/Hospital/RequestOrgan';
// import classes from '../Components/Login/Login.module.css'

export default function Hospital(){
  return (
    <div className={`text-center m-2`}>
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/account" element={<Account/>} />
        <Route path="/requestorgan" element={<RequestOrgan/>} />
    </Routes>
    </div>
  )
}