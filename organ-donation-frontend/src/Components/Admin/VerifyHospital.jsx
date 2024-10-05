import React, { useEffect, useState } from 'react'
import HospitalCard from './HospitalCard'
import NavBar from './NavBar'
import classes from '../../Components/Login/Login.module.css'
import axios from 'axios'


export default function VerifyHospital() {

  // var data = [
  //   {name: 'h1', regno: '1',address: 'a', phone: '12344', email: 'a@gmail.com'},
  //   {name: 'h2', regno: '2',address: 'b', phone: '43422', email: 'b@gmail.com'},
  //   {name: 'h3', regno: '3',address: 'c', phone: '532124', email: 'c@gmail.com'},
  //   {name: 'h4', regno: '4',address: 'd', phone: '4456454', email: 'd@gmail.com'},
  //   {name: 'h5', regno: '5',address: 'e', phone: '2342', email: 'e@gmail.com'},
  // ]

  const path=process.env.REACT_APP_PATH;
  const data2=[]
  const [data,setData]=useState([])


useEffect(()=>{
  async function fetch(){
    const res=await axios.get(`${path}admin/getunverifiedhospitals`)
    // console.log(res.data)
      res.data.forEach((i)=>{
      data2.push({
        _id:i._id,
        name:(i.hospitalregnum===undefined || i.hospitalregnum===null )? i.name+"(Account Incomplete)":i.name,
        address:(i.address!==undefined) ? i.address:"Not Applicable",
        email:i.email+"",
        phone:(i.phone!==undefined) ? i.phone:"Not Applicable",
        regno:(i.hospitalregnum!==undefined)?i.hospitalregnum:""
      })
      setData(data2)
    })
    // console.log(data)
  }
  fetch()
})

  return (
    <>
        <NavBar/>
        <div className={`${classes.bg1} py-8 pb-[2rem] min-h-[75.5vh] flex justify-around flex-wrap`}>
          {data.map((e) => <HospitalCard key={e.regno} det={e}/>)}
          {data.length===0 && <p><b>No Hospitals</b></p>}
        </div>
    </>
  )
}
