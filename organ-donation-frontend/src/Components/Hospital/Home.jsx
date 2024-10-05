import React,{useEffect, useState} from 'react'
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import NavBar from './NavBar';
import classes from '../../Components/Login/Login.module.css'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import axios from 'axios';


export default function Home() {
    const user=JSON.parse(localStorage.getItem('user'))

    const [products, setProducts] = useState([]);
    const [products1, setProducts1] = useState([]);
    const [products2, setProducts2] = useState([]);
    const [products3, setProducts3] = useState([]);




      const path=process.env.REACT_APP_PATH;
      const data1=[];
      const data2=[];
      const data3=[];
      const data4=[];

  
  
    useEffect(()=>{
      async function fetch(){
        const res=await axios.get(`${path}hospital/getnonconfirmedpatientrequests/${user._id}`)
        // console.log(res.data)
          res.data.forEach((i)=>{
          const j=res.data.indexOf(i)+1;
          data1.push({
            Slno:j,
            name:i.name+"",
            email:i.email+"",
            gender:i.gender+"",
            address:i.address+"",
            phone:i.phone,
            blood:i.bloodgroup+"",
            DOB:i.DOB.split('T')[0]+"",
            organ:i.requiredOrgan+"",
          })
          setProducts(data1)
        })
      }
      async function fetch1(){
        const res=await axios.get(`${path}hospital/getconfirmedpatientrequests/${user._id}`)
        console.log(res.data)
          res.data.forEach((i)=>{
          const j=res.data.indexOf(i)+1;
          data2.push({
            Slno:j,
            name:i.receivingPatientDetails.name+"",
            email:i.receivingPatientDetails.email+"",
            phone:i.receivingPatientDetails.phone,
            donationtype:i.donationType+"",
            organ:i.donationOrgan+"",
            dstatus:i.donationStatus+""
          })
          setProducts1(data2)
        })
      }
      async function fetch2(){
        const res=await axios.get(`${path}hospital/getcompletedpatientrequests/${user._id}`)
        // console.log(res.data)
          res.data.forEach((i)=>{
          const j=res.data.indexOf(i)+1;
          data3.push({
          Slno:j,
          name:i.receivingPatientDetails.name+"",
          email:i.receivingPatientDetails.email+"",
          phone:i.receivingPatientDetails.phone,
          donationtype:i.donationType+"",
          organ:i.donationOrgan+"",
          operationdate:i.operationDate.split('T')[0]
          })
          setProducts2(data3)
        })
      }

      async function fetch3(){
        const res=await axios.get(`${path}hospital/getcancelledpatientrequests/${user._id}`)
        console.log(res.data)
          res.data.forEach((i)=>{
          const j=res.data.indexOf(i)+1;
          data4.push({
          Slno:j,
          name:i.name+"",
          email:i.email+"",
          phone:i.phone,
          requiredorgan:i.requiredOrgan+"",
          cancelReason:i.cancelReason+""
          })
          setProducts3(data4)
        })
      }
      fetch()
      fetch1()
      fetch2()
      fetch3()

    })
      
  
      const columns = [
        {field: 'Slno', header: 'Slno'},
        {field: 'name', header: 'Name'},
        {field: 'DOB', header: 'Date of Birth'},
        {field: 'blood', header: 'Blood Group'},
        {field: 'address', header: 'Address'},
        {field: 'email', header: 'Email'},
        {field: 'phone', header: 'Phone'},
        {field: 'organ', header: 'Organ'},

    ];

    const columns1 = [
      {field: 'Slno', header: 'Slno'},
      {field: 'name', header: 'Receiver Name'},
      {field: 'phone', header: 'Receiver Phone'},
      {field: 'email', header: 'Receiver Email'},
      {field: 'organ', header: 'Organ'},
      {field: 'donationtype', header: 'Donation Type'},
      {field: 'dstatus', header: 'Donation Status'},

  ];

  const columns2 = [
    {field: 'Slno', header: 'Slno'},
    {field: 'name', header: 'Receiver Name'},
    {field: 'phone', header: 'Receiver Phone'},
    {field: 'email', header: 'Receiver Email'},
    {field: 'donationtype', header: 'Donation Type'},
    {field: 'organ', header: 'Organ'},
    {field:"operationdate", header:"Receiver Operation Date"}

];

const columns3 = [
  {field: 'Slno', header: 'Slno'},
  {field: 'name', header: 'Receiver Name'},
  {field: 'phone', header: 'Receiver Phone'},
  {field: 'email', header: 'Receiver Email'},
  {field: 'requiredorgan', header: 'Requested Organ'},
  {field:"cancelReason", header:"Cancel Reason"}

];

    const dynamicColumns = columns.map((col,i) => {
        return <Column key={col.field} field={col.field} header={col.header} />;
      });

      const dynamicColumns1 = columns1.map((col,i) => {
        return <Column key={col.field} field={col.field} header={col.header} />;
      });
      const dynamicColumns2 = columns2.map((col,i) => {
        return <Column key={col.field} field={col.field} header={col.header} />;
      });

      const dynamicColumns3 = columns3.map((col,i) => {
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
                <p className='mb-3 pb-3 text-2xl antialiased '>Requested Organs List</p>
                <DataTable value={products} paginator responsiveLayout="scroll"
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={5} rowsPerPageOptions={[5,10,15,20,25,30]}
                    paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}>
                    {dynamicColumns}
                </DataTable>
            </div>
            <div className="mx-auto w-[80%]">
                <p className='mb-2 mt-3 pb-3 text-2xl antialiased '>Confirmed Organs List</p>
                <DataTable value={products1} paginator responsiveLayout="scroll"
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={5} rowsPerPageOptions={[5,10,15,20,25,30]}
                    paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}>
                    {dynamicColumns1}
                </DataTable>
            </div>
            <div className="mx-auto w-[80%]">
                <p className='mb-2 mt-3 pb-3 text-2xl antialiased '>Completed Organs List</p>
                <DataTable value={products2} paginator responsiveLayout="scroll"
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={5} rowsPerPageOptions={[5,10,15,20,25,30]}
                    paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}>
                    {dynamicColumns2}
                </DataTable>
            </div>

            <div className="mx-auto w-[80%]">
                <p className='mb-2 mt-3 pb-3 text-2xl antialiased '>Cancelled Organs List</p>
                <DataTable value={products3} paginator responsiveLayout="scroll"
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={5} rowsPerPageOptions={[5,10,15,20,25,30]}
                    paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}>
                    {dynamicColumns3}
                </DataTable>
            </div>
          </div>
      </>
    )
}
