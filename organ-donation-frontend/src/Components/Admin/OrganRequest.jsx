import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import classes from '../../Components/Login/Login.module.css'
import OrganCard from './OrganCard'
import axios from 'axios'

export default function OrganRequest() {

    // var data = [
    // {donId:1, hname: 'h1', pname: '1', hphone: '12344', hemail: 'a@gmail.com', pphone: '12344', pemail: 'a@gmail.com', organ:'heart', medcondition: 'donno'},
    // {donId:2, hname: 'h2', pname: '2', hphone: '43422', hemail: 'b@gmail.com', pphone: '12344', pemail: 'a@gmail.com', organ:'kidney', medcondition: 'donno'},
    // {donId:3, hname: 'h3', pname: '3', hphone: '532124', hemail: 'c@gmail.com', pphone: '12344', pemail: 'a@gmail.com', organ:'eye', medcondition: 'donno'},
    // {donId:4, hname: 'h4', pname: '4', hphone: '4456454', hemail: 'd@gmail.com', pphone: '12344', pemail: 'a@gmail.com', organ:'kidney', medcondition: 'donno'},
    // {donId:5, hname: 'h5', pname: '5', hphone: '2342', hemail: 'e@gmail.com', pphone: '12344', pemail: 'a@gmail.com', organ:'eye', medcondition: 'donno'},
    // ]


    const path=process.env.REACT_APP_PATH;
    const data2=[]

    const [data,setData]=useState([])
  
  
  useEffect(()=>{
    async function fetch(){
      const res=await axios.get(`${path}admin/getallpatientrequests`)
      console.log(res.data)
        res.data.forEach((i)=>{
        data2.push({
          _id:i._id,
          pname:i.name+"",
          hphone:i.patientHospitalDetails.phone,
          hname:i.patientHospitalDetails.name,
          hemail:i.patientHospitalDetails.email+"",
          pphone: i.phone+"",
          pemail:i.email+"",
          medcondition:i.medicalCondition+"",
          organ:i.requiredOrgan+"",
          Status:i.requestStatus+""
        })
      })
        const res1=await axios.get(`${path}admin/getallconfirmedpatientrequests`)
        console.log(res1.data)
          res1.data.forEach((i)=>{
          data2.push({
            _id:i._id,
            pid:i.receivingPatientDetails._id,
            pname:i.receivingPatientDetails.name+"",
            hphone:i.transplantHospitalDetails.phone,
            hname:i.transplantHospitalDetails.name,
            hemail:i.transplantHospitalDetails.email+"",
            pphone: i.receivingPatientDetails.phone+"",
            pemail:i.receivingPatientDetails.email+"",
            medcondition:i.receivingPatientDetails.medicalCondition+"",
            organ:i.receivingPatientDetails.requiredOrgan+"",
            Status:i.receivingPatientDetails.requestStatus+"",
            dname:i.donorDetails.name+"",
            dphone:i.donorDetails.phone+""
          })
      })
      setData(data2)
    }
    fetch()
  })

  return (
    <>
        <NavBar/>
        <div className={`${classes.bg1} py-8 pb-[2rem] min-h-[75.5vh] `}>
        <div className='flex flex-wrap gap-x-2 gap-y-2 mb-4 ml-[8%]'>
          <div className='flex'><p className='w-[2rem] h-[2rem] bg-red-500'>&nbsp;</p>&nbsp;- Requested</div>
          <div className='flex'><p className='w-[2rem] h-[2rem] bg-green-500'>&nbsp;</p>&nbsp;- Confirmed</div>
        </div>
        <div className='flex justify-around flex-wrap'>
          {data.map((e,index) => <OrganCard  det={e} key={index}/>)}
          {data.length===0 && <p><b>No Organs</b></p>}
        </div>
        </div>
    </>
  )
}
