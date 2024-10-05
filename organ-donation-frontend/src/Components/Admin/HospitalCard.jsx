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
import { InputText } from 'primereact/inputtext';

export default function HospitalCard({det}) {
  const [load, setLoad] = useState(false)
  const [value1, setValue1] = useState('Wrong Credentials');
const path=process.env.REACT_APP_PATH;

const navigate=useNavigate();
const [err,setErr]=useState(true)
const [load1,setLoad1]=useState(false);
const [displayBasic, setDisplayBasic] = useState(false);


  const toast = useRef(null);
  const showError = (message) => {
    toast.current.show({severity:'error', summary: 'Error Message', detail:message, life: 3000});
  }

  const accept = async() => {
    if(value1===''){
      showError("Please Enter the Reason") 
      setLoad1(false)
      return
    }
    try{
      setLoad1(true)
      // console.log({cancelReason:value1})
      const res=await axios.put(`${path}admin/cancelhospitalrequest/${det._id}`,{cancelReason:value1})
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
    }

    const renderFooter = (name) => {
      return (
          <div>
              <Button label="No" icon="pi pi-times" onClick={() => onHide(name)} className="p-button-text" />
              <Button label="Yes" icon="pi pi-check" onClick={() =>{ accept(); onHide(name)}} autoFocus />
          </div>
      );
  }



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
      const res=await axios.get(`${path}admin/verifyhospital/${det._id}`)
      if(res.status===200){
        navigate(-1)
      }
    }
    catch(err){
      setLoad(false)
    err && showError(err.response.data.message)
    }
  }


    const footer = (
        <span className='flex justify-around flex-wrap mb-[.5rem] pb-[.5rem]'>
            <Button label="Accept" disabled={err} onClick={handleSubmit} loading={load} icon="pi pi-check" />
            <Button label="Decline" onClick={() => onClick('displayBasic')} loading={load1} icon="pi pi-times" className="p-button-secondary " />
        </span>
    );

  return (
    <>
      <Toast ref={toast} position="bottom-right" />
    <Card title={det.name} subTitle={det.regno} style={{ width: '25em', marginBottom: '2rem',}} footer={footer} >
          <p className="m-0" style={{lineHeight: '1.5'}}>{'Phone: ' + det.phone } <br/> {'Email: ' + det.email } <br/> { 'Address: ' + det.address}</p>
    </Card>

    <Dialog header="Reason for Rejection" visible={displayBasic}  modal style={{ width: '30vw' }} footer={renderFooter('displayBasic')} onHide={() => onHide('displayBasic')}
                    draggable={false} resizable={false}>
                     <InputText className='w-[20rem]' required onChange={(event)=>{setValue1(event.currentTarget.value)}}/>
        </Dialog>

  </>
  )
}
