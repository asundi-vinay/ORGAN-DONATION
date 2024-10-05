import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import classes from '../../Components/Login/Login.module.css'
import DonationCard from './DonationCard'
import axios from 'axios'

export default function DonationRequest() {

  // var data = [
  //   {name: 'h1', regno: '1',address: 'a', phone: '12344', email: 'a@gmail.com'},
  //   {name: 'h2', regno: '2',address: 'b', phone: '43422', email: 'b@gmail.com'},
  //   {name: 'h3', regno: '3',address: 'c', phone: '532124', email: 'c@gmail.com'},
  //   {name: 'h4', regno: '4',address: 'd', phone: '4456454', email: 'd@gmail.com'},
  //   {name: 'h5', regno: '5',address: 'e', phone: '2342', email: 'e@gmail.com'},
  // ]

  // /getcompleteddonations


  const path=process.env.REACT_APP_PATH;
  const data2=[]
  const [data,setData]=useState([])


useEffect(()=>{
  async function fetch(){
    const res=await axios.get(`${path}admin/getlddonations`)
    // console.log(res.data)
      res.data.forEach((i)=>{
      data2.push({
        _id:i._id,
        donorid:i.donorDetails._id,
        name:i.donorDetails.name+"",
        phone:i.donorDetails.phone,
        email:i.donorDetails.email+"",
        donationtype: i.donationType+"",
        organ:i.donationOrgan+"",
        donationStatus:i.donationStatus+""
      })
    })

    setData(data2)
    // console.log(data)
  }
  fetch()
})


  return (
    <>
        <NavBar/>
        <div className={`${classes.bg1} py-8 pb-[2rem] min-h-[75.5vh] `}>
          <div className='flex flex-wrap gap-x-2 gap-y-2 mb-4 ml-[8%]'>
          <div className='flex'><p className='w-[2rem] h-[2rem] bg-red-500'>&nbsp;</p>&nbsp;- Requested</div>
          <div className='flex'><p className='w-[2rem] h-[2rem] bg-yellow-500'>&nbsp;</p>&nbsp;- Verified</div>
          <div className='flex'><p className='w-[2rem] h-[2rem] bg-green-500'>&nbsp;</p>&nbsp;- Confirmed</div>
        </div>
        <div className='flex justify-around flex-wrap'>
            {data.map((e,index) => <DonationCard key={index} det={e}/>)}
            {data.length===0 && <p><b>No Donations</b></p>}
        </div>
        </div>
    </>
  )
}

