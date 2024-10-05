import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import classes from '../../Components/Login/Login.module.css'
import 'primereact/resources/primereact.css';
import NavBar from './NavBar';
import { Button } from 'primereact/button';
import axios from 'axios';

export default function Home() {
    const user=JSON.parse(localStorage.getItem('user'))

    const [products, setProducts] = useState([]);
    const [products1, setProducts1] = useState([]);
    const [products2, setProducts2] = useState([]);

    const data2=[];
    const data3=[];
    const data4=[]

    const columns = [
      {field: 'Slno', header: 'Slno'},
      {field: 'Id', header: 'Registration ID'},
      {field: 'name', header: 'Name'},
      {field: 'address', header: 'Address'},
      {field: 'email', header: 'Email'},
      {field: 'phoneno', header: 'Phone'},
  ];

  const columns1 = [
      {field: 'Slno', header: 'Slno'},
      {field: 'organ', header: 'Organ'},
      // {field: 'operationDate', header: 'Operation Date'},
      {field: 'donorname', header: 'Donor Name'},
      {field: 'phoneno', header: 'Donor Phone'},
      {field: 'donationType', header: 'Donation Type'},
      {field: 'hname', header: 'Hospital Name'}

  ];


  const path=process.env.REACT_APP_PATH;
  


useEffect(()=>{
  async function fetch(){
    const res=await axios.get(`${path}admin/getverifiedhospitals`)
    // console.log(res.data)
      res.data.forEach((i,index)=>{
      // const j=res.data.indexOf(i)+1;
      data2.push({
        Slno:index+1,
        name:i.name+"",
        address:i.address+"",
        email:i.email+"",
        phoneno:i.phone+"",
        Id:i.hospitalregnum+""
      })
      setProducts(data2)
    })
  }


  async function fetch1(){
    const res=await axios.get(`${path}admin/getunverifiedhospitals`)
    // console.log(res.data)
      res.data && res.data.forEach((i,index)=>{
      // const j=res.data && res.data.indexOf(i)+1;
      data3.push({
        Slno:index+1,
        name:i.name+"",
        address:i.address!==undefined ? i.address+"":"Not Applicable",
        email:i.email+"",
        phoneno:i.phone !==undefined ? i.phone+"":"Not Applicable",
        Id:i.hospitalregnum !== undefined ? i.hospitalregnum+"":"Not Applicable"
      })
      setProducts1(data3)
    })
  }

  async function fetch2(){
    const res=await axios.get(`${path}admin/getcompleteddonations`)
    console.log(res.data)
      res.data && res.data.forEach((i,index)=>{
      const j=res.data && res.data.indexOf(i)+1;
      data4.push({
        Slno:index+1,
        hname:i.donationType==='Deceased' ? i.donorDetails.transplantHospitalDetails.name+"": i.transplantHospitalDetails.name+"",
        organ:i.donationOrgan+"",
        donationType:i.donationType+"",
        donorname:i.donorDetails.name+"",
        phoneno:i.donorDetails.phone+"",
        // operationDate:i.donationType==='Deceased' ? i.donorDetails.ddoperationDate.split('T')[0]: i.operationDate.split('T')[0],
      })
      setProducts2(data4)
    })
  }
  
  fetch()
  fetch1()
  fetch2()
})

  const dynamicColumns = columns.map((col,i) => {
    return <Column key={col.field} field={col.field} header={col.header} />;
  });

  const dynamicColumns1 = columns1.map((col,i) => {
    return <Column key={col.field} field={col.field} header={col.header} />;
  });

  const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
  const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;

  return (
    <>
        <NavBar/>
        <div className={`${classes.bg1} py-8 pb-[2rem] min-h-[75.5vh]`}>
            <p className='mb-3 pb-3 text-2xl antialiased underline underline-offset-4'>Welcome {user.name}</p>
            <div className="mx-auto w-[80%]">
            <p className='mb-3 pb-3 text-2xl antialiased mt-5'>Available Organs</p>
                <DataTable value={products2} paginator responsiveLayout="scroll"
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={5} rowsPerPageOptions={[5,10,15,20,25,30]}
                    paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}>
                    {dynamicColumns1}
                </DataTable>
            </div>
            <div className="mx-auto w-[80%]">
            <p className='mb-3 mt-2 pb-3 text-2xl antialiased '>Verified Hospitals</p>
                <DataTable value={products} paginator responsiveLayout="scroll"
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={5} rowsPerPageOptions={[5,10,15,20,25,30]}
                    paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}>
                    {dynamicColumns}
                </DataTable>
            </div>
            <div className="mx-auto w-[80%]">
            <p className='mb-3 pb-3 text-2xl antialiased mt-5'>Unverified Hospitals</p>
                <DataTable value={products1} paginator responsiveLayout="scroll"
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={5} rowsPerPageOptions={[5,10,15,20,25,30]}
                    paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}>
                    {dynamicColumns}
                </DataTable>
            </div>

        </div>
    </>
  )
}
