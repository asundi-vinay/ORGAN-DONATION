import React,{useState}from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Signup from './Components/Login/Signup';
import Login from './Components/Login/Login';
import Donor from './Pages/Donor';
import Hospital from './Pages/Hospital';
import Admin from './Pages/Admin';
import Home from './Components/Generals/Home';
import About from './Components/Generals/About';
import HowMayIhHelpU from './Components/Generals/HowMayIhHelpU';
import ContactUs from './Components/Generals/ContactUs';

function App() {

  const [role,setRole]=useState(JSON.parse(localStorage.getItem("user")) ? JSON.parse(localStorage.getItem("user")).role ? JSON.parse(localStorage.getItem("user")).role:"":"")

  function CallBack(x){
    if(x.role){
      // console.log(x)
      setRole(x.role)
    }
  }
  return (
    <Router>
    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/about" element={<About/>} />
    <Route path="/howmayihelpu" element={<HowMayIhHelpU/>} />
    <Route path="/contactus" element={<ContactUs/>} />
    <Route path="/login" element={<Login OnLogin={CallBack}/>} />
    <Route path="/register" element={<Signup/>} />      
    <Route
          path="/donor/*"
          element={
            role === "Donor" ? <Donor /> : <Navigate to="/login" />
          }
        />
    <Route
          path="/hospital/*"
          element={
            role === "Hospital" ? <Hospital /> : <Navigate to="/login" />
          }
        />
    <Route
          path="/admin/*"
          element={
            role === "Admin" ? <Admin /> : <Navigate to="/login" />
          }
        />
      </Routes>
      </Router>
  );
}

export default App;
