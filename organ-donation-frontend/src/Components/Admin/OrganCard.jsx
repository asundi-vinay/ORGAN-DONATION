import React, { useRef, useState } from 'react'
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import { useEffect } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';


export default function OrganCard({det}) {
  const [load, setLoad] = useState(false)
  const [value1, setValue1] = useState(null);
const path=process.env.REACT_APP_PATH;

const navigate=useNavigate();
const [err,setErr]=useState(true)
const [load1,setLoad1]=useState(false);
const [load2,setLoad2]=useState(false);
const [date,setDate]=useState(null);
const [displayBasic, setDisplayBasic] = useState(false);
const [displayBasic1, setDisplayBasic1] = useState(false);
const [displayBasic2, setDisplayBasic2] = useState(false);


const data2=[]
const [organlist,setOrganList]=useState([]);
const [organ,setOrgan]=useState([])


  const toast = useRef(null);
  // console.log(det)
  const showError = (message) => {
    toast.current.show({severity:'error', summary: 'Error Message', detail:message, life: 3000});
  }

  const accept = async() => {
    if(value1===""){
      showError("Please Enter the Reason") 
      setLoad1(false)
      return
    }
    try{
      setLoad1(true)
      // console.log({cancelReason:value1})
      const res=await axios.put(`${path}admin/cancelpatientrequest/${det._id}`,{cancelReason:value1})
      if(res.status===200){
        navigate(-1)
      }
    }
    catch(err){
      setLoad1(false)
    err && showError(err.response.data.message) 
    }
    };

    const dialogFuncMap = {
      'displayBasic': setDisplayBasic,
      'displayBasic1':setDisplayBasic1,
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


const accept1 = async(e) => {
    try{
      setLoad(true)
      const res=await axios.get(`${path}admin/confirmpatientrequest/${det._id}/${organ.code}`)
      if(res.status===200){
        navigate(-1)
      }
    }
    catch(err){
      setLoad1(false)
      console.log(err)
      err && showError(err.response.data.message)
    }
  }

  const accept2 = async(e) => {
    try{
      setLoad2(true)
      if(date===null){
        showError("Please Enter the date")
        setLoad2(false)
        return
      }
      const obj={ transplantationDate:date}
      const res=await axios.put(`${path}admin/completepatienttransplanation/${det.pid}`,obj)
      if(res.status===200){
        navigate(-1)
      }
    }
    catch(err){
      setLoad2(false)
      console.log(err)
      err && showError(err.response.data.message)
    }
  }


  useEffect(()=>{
    async function fetch(){
      const res=await axios.get(`${path}admin/getcompleteddonations`)
      // console.log(res.data)
        res.data.forEach((i)=>{
        const j=res.data.indexOf(i)+1;
        data2.push({
          name:i.donationOrgan+" "+`(${i.donorDetails.name+""})`,
          code:i._id,
        })
        setOrganList(data2)
      })
      // console.log(data)
    }
    fetch()
  })


    const onClick = (name) => {
      dialogFuncMap[`${name}`](true);
  }

  const onHide = (name) => {
      dialogFuncMap[`${name}`](false);
  }


  

  useEffect(()=>{
    det.regno && setErr(false)
  })


  // async function handleSubmit(e){
 
  // }


    const footer = (
        <span className='flex justify-around flex-wrap mb-[.5rem] pb-[.5rem]'>
            {det.Status==="Requested" && (<Button label="Accept"  onClick={() => onClick('displayBasic1')} loading={load} icon="pi pi-check" />)}
            {det.Status==="Requested" && (<Button label="Decline" onClick={() => onClick('displayBasic')} loading={load1} icon="pi pi-times" className="p-button-secondary " />)}
            {det.Status==="Confirmed" && (<Button label="Accept"  onClick={() => onClick('displayBasic2')} loading={load2} icon="pi pi-check" />)}
        </span>
    );

  return (
    <>
      <Toast ref={toast} position="bottom-right" />
        <Card title={det.hname} subTitle={'Patient Name:'+' '+det.pname} style={{ width: '25em', marginBottom: '2rem' ,border:`5px solid ${det.Status==='Requested' && 'red'|| det.Status==='Confirmed' && 'green'}`}} footer={footer} >
          <p className="m-0" style={{lineHeight: '1.5'}}>{'Hospital Phone: ' + det.hphone } <br/> {'Hospital Email: ' + det.hemail } <br/><br/> {'Patient Phone: ' + det.pphone } <br/> {'Patient Email: ' + det.pemail } <br/> {'Medical Condition: ' + det.medcondition } <br/> { 'Organ Required: ' + det.organ} <br/> {det.Status==='Confirmed' && ('Donor Name: '+det.dname)} <br/> {det.Status==='Confirmed' && ('Donor Phone: '+det.dphone)}</p>
        </Card>

        <Dialog header="Reason for Rejection" visible={displayBasic}  modal style={{ width: '30vw' }} footer={renderFooter('displayBasic')} onHide={() => onHide('displayBasic')}
                    draggable={false} resizable={false}>
                     <InputText className='w-[20rem]' required onChange={(event)=>{setValue1(event.currentTarget.value)}}/>
        </Dialog>

        <Dialog header="Select Organ" visible={displayBasic1}  modal style={{ width: '30vw' }} footer={renderFooter1('displayBasic1')} onHide={() => onHide('displayBasic1')}
                    draggable={false} resizable={false}>
                     <Dropdown value={organ} className='w-[14.6rem]' required options={organlist} onChange={e=>setOrgan(e.value)} optionLabel="name" placeholder="Select a Organ " />
        </Dialog>

        <Dialog header="Select Transplantation Data" visible={displayBasic2}  modal style={{ width: '30vw' }} footer={renderFooter2('displayBasic2')} onHide={() => onHide('displayBasic2')}
                    draggable={false} resizable={false}>
 <Calendar id="minmax" className='w-[14.5rem]' value={date} onChange={(e) => setDate(e.value)} minDate={new Date('1900')} maxDate={new Date()} placeholder="Select a date" readOnlyInput />        </Dialog>
  </>
  )
  }