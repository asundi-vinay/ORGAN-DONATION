import React,{useEffect, useRef, useState} from 'react'
import classes from '../../Components/Login/Login.module.css'
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import NavBar from './NavBar';
import { InputMask } from 'primereact/inputmask';
import { InputTextarea } from 'primereact/inputtextarea';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';


export default function Account() {
  const [uname, setUname] = useState("");
  const [mail, setMail] = useState("");
  const [passwd, setPasswd] = useState('');
  const [cpasswd, setCPasswd] = useState('');
  const [load, setLoad] = useState(false)
  const [passErr, setPassErr] = useState(false)
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState('');
  const [regno, setRegno] = useState('');
  const [cancel,setCancel]=useState('');
  const [err,setErr]=useState(false)

  const navigate=useNavigate();
  let rejection=false;
  

  const toast = useRef(null);

  const passHandler = (e) =>{
    passwd !== cpasswd && setPassErr(true)
    passwd === cpasswd && setPassErr(false)
}

const showError = (message) => {
  toast.current.show({severity:'error', summary: 'Error Message', detail:message, life: 3000});
}


const path=process.env.REACT_APP_PATH;
const user=JSON.parse(localStorage.getItem('user'))


async function handleSubmit(e){
  e.preventDefault()
  setLoad(true)
  try{
    if(passwd===''){
      const newobj={ name:uname, email:mail, phone, address, hospitalregnum:regno}
      // console.log(newobj)
      const res=await axios.put(`${path}hospital/entrydetails/${user && user._id}`,newobj) 
      if(res.status===200){
              navigate("/hospital")
      }
  }
  else{
    const newobj={ name:uname, email:mail, phone, address, hospitalregnum:regno,password:passwd}
    // console.log(newobj)
    const res=await axios.put(`${path}hospital/entrydetails/${user && user._id}`,newobj) 
      if(res.status===200){
              navigate("/hospital")
      }
  }
  }
  catch(err){
    console.log(err)
    setLoad(false)
    err && showError(err.response.data.message)

  }
}

async function handleSubmit1(e){
  e.preventDefault()
  setLoad(true)
  try{
    if(passwd===''){
      const newobj={ name:uname, email:mail, phone, address, hospitalregnum:regno,verificationstatus:"Pending"}
      // console.log(newobj)
      const res=await axios.put(`${path}hospital/entrydetails/${user && user._id}`,newobj) 
      if(res.status===200){
              navigate("/hospital")
      }
  }
  else{
    const newobj={ name:uname, email:mail, phone, address, hospitalregnum:regno,password:passwd,verificationstatus:"Pending"}
    // console.log(newobj)
    const res=await axios.put(`${path}hospital/entrydetails/${user && user._id}`,newobj) 
      if(res.status===200){
              navigate("/hospital")
      }
  }
  }
  catch(err){
    console.log(err)
    setLoad(false)
    err && showError(err.response.data.message)

  }
}

useEffect(()=>{
    async function fetch(){
      try{
        const res=await axios.get(`${path}hospital/getdetails/${user._id}`)
        // console.log(res.data)
        res.data && setUname(res.data.name)
        res.data && setMail(res.data.email)
        res.data && setAddress(res.data.address)
        res.data && setPhone(res.data.phone)
        res.data && setRegno(res.data.hospitalregnum)    
        res.data && (res.data.verificationstatus==="Pending" || res.data.verificationstatus==="Rejected") && setErr(true)
        res.data.verificationstatus==='Rejected'? (rejection=true (setCancel(res.data.cancelReason))) : rejection=false
      }
      catch(err){
        console.log(err)
      }
    }
    fetch()
  },[path])




  return (
    <>
    <NavBar/>
    <Toast ref={toast} position="bottom-right" />
        <div className={`${classes.bg1} py-8 pb-[5rem]`}>
            <form autoComplete='off' className='w-[23rem] pb-5 md:w-[46rem] mx-auto rounded-lg ' onSubmit={!rejection ? handleSubmit1 :handleSubmit} style={{backdropFilter: 'blur(2px)', background: 'rgba(156, 152, 152, 0.45)'}}>
                <p className='text-[2rem] text-center font-serif cursor-default'>Account Details</p>
                <div className='text-center mx-auto w-[18rem]'>
                {!err && (<p className='cursor-default font-serif text-[1.5rem] text-green-900'>Verified ✅</p>)}
                  {err && (<p className='cursor-default font-serif text-[1.5rem] text-red-900'>Not Verified ❌</p>)}
                  {!rejection && (<p className='cursor-default font-serif text-[1.5rem] text-red-900'>{cancel}</p>)}
                </div>
                <div className='text-left mx-auto w-[18rem]'>
                    <p className='cursor-default'>Name:</p>
                    <InputText id="username" pattern="^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$" autoFocus required className='w-[14.6rem]' placeholder='Eg. Peter' value={uname} onChange={(e) => setUname(e.target.value)} />
                </div>

                <div className='text-left mx-auto w-[18rem]'>
                    <p className='cursor-default'>Registration ID:</p>
                    <InputText id="username"  required className='w-[14.6rem]' pattern='^\d+$' placeholder='Eg. 1234567890123' value={regno} onChange={(e) => setRegno(e.target.value)} />
                </div>

                {/* <div className='text-left mx-auto w-[18rem]'>
                    <p className='cursor-default'>Gender:</p>                    
                    <Dropdown value={gender} className='w-[14.6rem]' required options={genderList} onChange={e=>setGender(e.value)} optionLabel="name" placeholder="Select a Gender " />
                </div> */}
                <div className="text-left mx-auto w-[18rem]">
                     <p className='cursor-default'>Phone:</p>
                        <InputMask id="phone" className='w-[14.6rem]' mask="9999999999" value={phone} placeholder="9999999999" onChange={(e) => setPhone(e.value)}></InputMask>
                    </div>

                    <div className="text-left mx-auto w-[18rem]">
                     <p className='cursor-default'>Address:</p>
                     <InputTextarea value={address} onChange={(e) => setAddress(e.target.value)} rows={5} cols={26} autoResize placeholder='Bangalore India'/>
                    </div>

                    {/* <div className='text-left mx-auto w-[18rem]'>
                    <p className='cursor-default'>Relative Name:</p>
                    <InputText id="username"  pattern="^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$"  required className='w-[14.6rem]' placeholder='Eg. Peter' value={rname} onChange={(e) => setRname(e.target.value)} />
                </div> */}

                {/* <div className='text-left mx-auto w-[18rem]'>
                    <p className='cursor-default'>Relationship:</p>
                    <InputText id="username" pattern="^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$" required className='w-[14.6rem]' placeholder='Eg. Father' value={relation} onChange={(e) => setRelation(e.target.value)} />
                </div> */}

        
                {/* <div className="text-left mx-auto w-[18rem]">
                     <p className='cursor-default'>Relative Phone:</p>
                        <InputMask id="phone" className='w-[14.6rem]' mask="9999999999" value={rphone} placeholder="9999999999" onChange={(e) => setRphone(e.value)}></InputMask>
                    </div> */}
                    
                <div className='text-left mx-auto w-[18rem]'>
                    <p className='cursor-default'>Email:</p>
                    <InputText type='email' pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$' required className='w-[14.6rem]' placeholder='Eg. Peter@gmail.com' value={mail} onChange={(e) => setMail(e.target.value)} />
                </div>
                <div className='text-left mx-auto w-[18rem]'>
                    <p className='cursor-default'>Password:</p>                    
                    <Password value={passwd} className={passErr ? 'p-invalid block' : ''} placeholder="***********" onChange={(e) => setPasswd(e.target.value)} toggleMask tooltip={'At least one uppercase,\n lowercase, numeric,\n minimum 8 characters'} tooltipOptions={{position: 'top'}}/>
                </div>
                <div className='text-left mx-auto w-[18rem]'>
                    <p className='cursor-default'>Confirm Password:</p>                    
                    <Password value={cpasswd} className={passErr ? 'p-invalid block' : ''} placeholder="***********" onChange={(e) => setCPasswd(e.target.value)} onKeyUp={passHandler} toggleMask />
                    {passErr && <p className='cursor-default text-[red]'>Password does not match!</p>}
                </div>
                <div className={`mt-2 ${load && ('cursor-wait')} w-[fit-content] mx-auto`}>
                    <Button label="Update" loading={load} className={`p-button-raised p-button-success mt-2`} />
                </div>
            </form>
        </div>
    </>
  )
}

