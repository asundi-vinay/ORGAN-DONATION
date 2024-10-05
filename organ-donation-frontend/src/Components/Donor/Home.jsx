import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import classes from '../../Components/Login/Login.module.css'
import 'primereact/resources/primereact.css';
import NavBar from './NavBar';
import { useEffect } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

export default function Home() {

  const navigate=useNavigate();

    const user=JSON.parse(localStorage.getItem('user'))


    const [products, setProducts] = useState([]);

    var rows = []

    if( products!==null || products!==undefined ){
      products.forEach( i => {
        i.card = (i.status==="Completed"? <Button className="p-button-link underline" onClick={(e)=>{navigate('/donor/print',{state:{data:i}})}}>Download Card</Button>:"Not Applicable")
        rows.push(i)
      })
    }

    const columns = [
      {field: 'Slno', header: 'Slno'},
      {field: 'appliedDate', header: 'Applied Date'},
      {field: 'Organ', header: 'Organ'},
      {field: 'donationType', header: 'Donation Type'},
      {field: 'status', header: 'Status'},
      {field: 'card', header: 'Get Card'}
  ];

  const dynamicColumns = columns.map((col,i) => {
    return <Column key={col.field} field={col.field} header={col.header} />;
  });

  const path=process.env.REACT_APP_PATH;
    const data2=[]


  useEffect(()=>{
    async function fetch(){
      const res=await axios.get(`${path}donor/getdonations/${user._id}`)
      console.log(res.data)
        res.data.forEach((i)=>{
        const j=res.data.indexOf(i)+1;
        data2.push({
          Slno:j,
          status:i.donationStatus+"",
          appliedDate:new Date(i.createdAt).toString().split("GMT")[0],
          Organ:i.donationOrgan+"",
          donationType:i.donationType+""
        })
        setProducts(data2)
      })
      // console.log(data)
    }
    fetch()
  })
  return (
    <>
        <NavBar/>
        <div className={`${classes.bg1} py-8 pb-[2rem] min-h-[75.5vh]`}>
            <p className='mb-3 pb-3 text-2xl antialiased underline underline-offset-4'>Welcome {user.name}</p>
            <div className="mx-auto w-[80%]">
                <DataTable value={rows} responsiveLayout="scroll">
                    {dynamicColumns}
                </DataTable>
            </div>
        </div>
    </>
  )
}
