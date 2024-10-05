import React, { useRef, useState } from 'react'
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import { useEffect } from 'react';
import { Dialog } from 'primereact/dialog';
import { Checkbox } from 'primereact/checkbox';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';


export default function DonationCard({det}) {
  const [load, setLoad] = useState(false)
  const [date, setDate] = useState(null);
  const [value1, setValue1] = useState('Wrong Credentials');
  const [value2, setValue2] = useState(null);
  const [value3, setValue3] = useState(null);
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [hospital, setHospital] = useState([]);
  const [medicaldetails,setMedicalDetails]=useState('');
  const [date1,setDate1]=useState(null)


const path=process.env.REACT_APP_PATH;

const navigate=useNavigate();
const [err,setErr]=useState(true)
const [load1,setLoad1]=useState(false);
const [load2,setLoad2]=useState(false);
const [load3,setLoad3]=useState(false);

const data2=[];

const [displayBasic, setDisplayBasic] = useState(false);
const [displayBasic1, setDisplayBasic1] = useState(false);
const [displayBasic2, setDisplayBasic2] = useState(false);

const [genderlist,setGenderlist]=useState([]);



  const toast = useRef(null);
  const showError = (message) => {
    toast.current.show({severity:'error', summary: 'Error Message', detail:message, life: 3000});
  }


  useEffect(()=>{
    async function fetch(){
      const res=await axios.get(`${path}admin/getverifiedhospitals`)
      // console.log(res.data)
        res.data.forEach((i)=>{
        const j=res.data.indexOf(i)+1;
        data2.push({
          name:i.name+"",
          code:i._id,
        })
        setGenderlist(data2)
      })
      // console.log(data)
    }
    fetch()
  })

    const dialogFuncMap = {
      'displayBasic': setDisplayBasic,
      'displayBasic1': setDisplayBasic1,
      'displayBasic2':setDisplayBasic2
    }

    const renderFooter = (name) => {
      return (
          <div>
              <Button label="No" icon="pi pi-times" onClick={() => onHide(name)} className="p-button-text" />
              <Button label="Yes" icon="pi pi-check" onClick={() =>{ accept(); onHide(name)}} autoFocus />
          </div>
      );
  }

  const renderFooter1 = (name) => {
      return (
          <div>
              <Button label="Reject" icon="pi pi-times" onClick={() => onHide(name)} className="p-button-text" />
              <Button label="Accept" icon="pi pi-check" onClick={() =>{ accept1(); onHide(name)}} autoFocus />
          </div>
      );
  }

  const renderFooter2 = (name) => {
    return (
        <div>
            <Button label="Reject" icon="pi pi-times" onClick={() => onHide(name)} className="p-button-text" />
            <Button label="Accept" icon="pi pi-check" onClick={() =>{ accept2(); onHide(name)}} autoFocus />
        </div>
    );
}

const accept = async() => {
  try{
    if(value1===''){
        showError("Please Enter the Reason") 
        setLoad1(false)
        return

    }
    setLoad1(true)
    if(det.donationtype==="Living"){
      const res=await axios.put(`${path}admin/cancellivingdonation/${det._id}`,{cancelReason:value1})
      if(res.status===200){
        navigate(-1)
      }
    }
    else{
      const res=await axios.put(`${path}admin/canceldeceaseddonation/${det._id}`,{cancelReason:value1})
      if(res.status===200){
        navigate(-1)
      }
    }
    // console.log({cancelReason:value1})
  }
  catch(err){
    setLoad1(false)
  err && showError(err.response.data.message) 
  }
  };


  const accept1 = async() => {
    try{
      if(checked1 && checked ){
        showError("Please Select any One") 
        setLoad2(false)
        return
      }
      if(value2===null && value3===null && date===null){
        showError("Please Enter the details") 
        setLoad2(false)
        return
      }
      setLoad2(true)
      const obj={causeOfDeath:value2,medicaldetails:value3,deathDate:date,familyPermission:checked ? true : false}
      // console.log(obj)
        const res=await axios.put(`${path}admin/confirmdeathanduploaddetails/${det.donorid}`,obj)
        if(res.status===200){
          navigate(-1)
    }
  }
    catch(err){
      setLoad2(false)
    err && showError(err.response.data.message) 
    }
    };


    const accept2 = async() => {
      try{
        // setLoad3(true)
        if(det.donationtype==="Living"){
          if(medicaldetails==="" && date1===null){
            showError("Please Enter the details") 
            setLoad3(false)
            return
          }
          const obj={medicaldetails,operationDate:date1}
          // console.log({obj,id:hospital.code})
          const res=await axios.put(`${path}admin/completelivingtransplantation/${det._id}/${hospital.code}`,obj)
          if(res.status===200){
            navigate(-1)
          }
        }
        else{
          if(date1===null){
            showError("Please Enter the details") 
            setLoad3(false)
            return
          }
          const obj={operationDate:date1}
          // console.log({obj})
          const res=await axios.put(`${path}admin/completetransplantation/${det.donorid}/${hospital.code}`,obj)
          if(res.status===200){
            navigate(-1)
          }
        }
        // console.log({cancelReason:value1})
      }
      catch(err){
        setLoad3(false)
      err && showError(err.response.data.message) 
      }
      };



    const onClick = (name) => {
      dialogFuncMap[`${name}`](true);
  }

  const onHide = (name) => {
      dialogFuncMap[`${name}`](false);
  }


  

  useEffect(()=>{
    det.regno && setErr(false)
  })



  async function handleSubmit(e){
    e.preventDefault()
    try{
      setLoad(true)
      if(det.donationtype==="Living"){
        const res=await axios.get(`${path}admin/confirmoperation/${det._id}`)
        if(res.status===200){
          navigate(-1)
        }
      }
      else{
        const res=await axios.put(`${path}admin/verifydeceaseddonation/${det.donorid}`)
        if(res.status===200){
          navigate(-1)
        }
      }
    }
    catch(err){
      setLoad(false)
    err && showError(err.response.data.message)
    }
  }


    const footer = (
        <span className='flex justify-around flex-wrap mb-[.5rem] pb-[.5rem]'>
            {det.donationStatus==='Pending' && (<Button label="Accept" onClick={handleSubmit} loading={load} icon="pi pi-check" />)}
            {det.donationStatus==='Pending' && (<Button label="Decline" onClick={() => onClick('displayBasic')} loading={load1} icon="pi pi-times" className="p-button-secondary " />)}
            {det.donationStatus==='Verified' && (<Button label="Accept" onClick={() =>onClick('displayBasic1') } loading={load2} icon="pi pi-check" />)}
            {det.donationStatus==='Verified' && (<Button label="Decline" onClick={() => onClick('displayBasic')} loading={load1} icon="pi pi-times" className="p-button-secondary " />)}
            {(det.donationStatus==='Confirmed') && (<Button label="Accept" onClick={() =>onClick('displayBasic2') } loading={load3} icon="pi pi-check" />)}


        </span>
    );

  return (
    <>
      <Toast ref={toast} position="bottom-right" />
    <Card title={det.organ} subTitle={det.donationtype} style={{ width: '25em', marginBottom: '2rem' ,border:`5px solid ${det.donationStatus==='Pending' && 'red'|| det.donationStatus==='Verified' && 'yellow'||det.donationStatus==='Confirmed' && 'green'}`}}footer={footer} >
          <p className="m-0" style={{lineHeight: '1.5'}}>{'Name: ' + det.name } <br/>{'Phone: ' + det.phone } <br/> {'Email: ' + det.email } </p>
    </Card>

    
    <Dialog header="Reason for Rejection" visible={displayBasic}  modal style={{ width: '30vw' }} footer={renderFooter('displayBasic')} onHide={() => onHide('displayBasic')}
                    draggable={false} resizable={false}>
                     <InputText className='w-[20rem]' required onChange={(event)=>{setValue1(event.currentTarget.value)}}/>
        </Dialog>

        <Dialog header="Confirm Death" visible={displayBasic1}  modal style={{ width: '30vw' }} footer={renderFooter1('displayBasic1')} onHide={() => onHide('displayBasic1')}
                    draggable={false} resizable={false}>
                     <div className="text-left mx-auto w-[18rem]">
                     <p className='cursor-default'>Cause of Death</p>
                     <InputText className='w-[15rem]' required onChange={(event)=>{setValue2(event.currentTarget.value)}}/>
                     </div>
                     <div className="text-left mx-auto w-[18rem]">
                     <p className='cursor-default'>Medical Details</p>
                     <InputText className='w-[20rem]' required onChange={(event)=>{setValue3(event.currentTarget.value)}}/>
                     </div>
                     <div className="text-left mx-auto w-[18rem]">
                     <p className='cursor-default'>Date of Expiry</p>
                     <Calendar id="minmax" className='w-[14.5rem]' value={date} onChange={(e) => setDate(e.value)} minDate={new Date('1900')} maxDate={new Date()} placeholder="Select a date" readOnlyInput />
                     </div>
                     <div className="text-left mx-auto w-[18rem]">
                     <p className='cursor-default'>Family Permission</p>
                    <div className="field-radiobutton">
                      <Checkbox inputId="binary" checked={checked} onChange={e => setChecked(e.checked)} />
                        <label htmlFor="city1">True</label>
                    </div>
                    <div className="field-radiobutton">
                    <Checkbox inputId="binary" checked={checked1} onChange={e => setChecked1(e.checked)} />
                        <label htmlFor="city2">False</label>
                    </div>
                    </div>
        </Dialog>

        <Dialog header="Complete Donation" visible={displayBasic2}  modal style={{ width: '30vw' }} footer={renderFooter2('displayBasic2')} onHide={() => onHide('displayBasic2')}
                    draggable={false} resizable={false}>
                        {det.donationtype==='Living' && (<div className="text-left mx-auto w-[18rem]">
                     <p className='cursor-default'>Medical Details</p>
                     <InputText className='w-[20rem]' required onChange={(event)=>{setMedicalDetails(event.currentTarget.value)}}/>
                     </div>)}
                     <div className="text-left mx-auto w-[18rem]">
                     <p className='cursor-default'>Date of Operation</p>
                     <Calendar id="minmax" className='w-[14.5rem]' value={date1} onChange={(e) => setDate1(e.value)} minDate={new Date('1900')} maxDate={new Date()} placeholder="Select a date" readOnlyInput />
                     </div>
                     <div className='text-left mx-auto w-[18rem]'>
                    <p className='cursor-default'>Select a Hospital:</p>                    
                    <Dropdown value={hospital} className='w-[14.6rem]' required options={genderlist} onChange={e=>setHospital(e.value)} optionLabel="name" placeholder="Select a Hospital " />
                </div>
        </Dialog>
  </>
  )
}
