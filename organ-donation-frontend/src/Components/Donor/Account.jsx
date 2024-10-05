import React,{useEffect, useRef, useState} from 'react'
import classes from '../../Components/Login/Login.module.css'
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown'
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
  const [rname, setRname] = useState("");
  const [relation, setRelation] = useState("");

  const [mail, setMail] = useState("");
  const [passwd, setPasswd] = useState('');
  const [cpasswd, setCPasswd] = useState('');
  const [gender,setGender]=useState({});
  const [load, setLoad] = useState(false)
  const [passErr, setPassErr] = useState(false)
  const [phone, setPhone] = useState(null);
  const [rphone, setRphone] = useState(null);
  const [address, setAddress] = useState('');
  const [blood, setBlood] = useState('');

  const navigate=useNavigate();
  

  
  const passHandler = (e) =>{
    passwd !== cpasswd && setPassErr(true)
    passwd === cpasswd && setPassErr(false)
  }
  
  const toast = useRef(null);
const showError = (message) => {
  toast.current.show({severity:'error', summary: 'Error Message', detail:message, life: 3000});
}

const genderList = [
  { name: 'Male', code: 'Male' },
  { name: 'Female', code: 'Female' },
  { name: 'Others', code: 'Others' },
];

const path=process.env.REACT_APP_PATH;
const user=JSON.parse(localStorage.getItem('user'))



async function handleSubmit(e){
  e.preventDefault()
  setLoad(true)
  try{
    if(passwd===''){
      const newobj={ name:uname, email:mail, phone, relationship:relation,relativename:rname, gender:gender.name, address ,bloodgroup:blood,relativephone:rphone}
      console.log(newobj)
      const res=await axios.put(`${path}donor/entrydetails/${user && user._id}`,newobj) 
      if(res.status===200){
              navigate("/donor")
      }
  }
  else{
    const newobj={ name:uname, email:mail, phone, relationship:relation,relativename:rname,  gender:gender.name, address ,bloodgroup:blood,relativephone:rphone,password:passwd}
    console.log(newobj)
    const res=await axios.put(`${path}donor/entrydetails/${user && user._id}`,newobj) 
      if(res.status===200){
              navigate("/donor")
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
        const res=await axios.get(`${path}donor/getdetails/${user._id}`)
        // console.log(res.data)
        res.data && setUname(res.data.name)
        res.data && setMail(res.data.email)
        res.data && setGender({name:res.data.gender,code:res.data.gender})
        res.data && setAddress(res.data.address)
        res.data && setPhone(res.data.phone)
        res.data && setBlood(res.data.bloodgroup)
        res.data && setRname(res.data.relativename)
        res.data && setRelation(res.data.relationship)
        res.data && setRphone(res.data.relativephone)       
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
            <form autoComplete='off' className='w-[23rem] pb-5 md:w-[46rem] mx-auto rounded-lg ' onSubmit={handleSubmit} style={{backdropFilter: 'blur(2px)', background: 'rgba(156, 152, 152, 0.45)'}}>
                <p className='text-[2rem] text-center font-serif cursor-default'>Account Details</p>
                <div className='text-left mx-auto w-[18rem]'>
                    <p className='cursor-default'>Name:</p>
                    <InputText id="username" pattern="^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$" autoFocus required className='w-[14.6rem]' placeholder='Eg. Peter' value={uname} onChange={(e) => setUname(e.target.value)} />
                </div>
                <div className='text-left mx-auto w-[18rem]'>
                    <p className='cursor-default'>Gender:</p>                    
                    <Dropdown value={gender} className='w-[14.6rem]' required options={genderList} onChange={e=>setGender(e.value)} optionLabel="name" placeholder="Select a Gender " />
                </div>
                <div className="text-left mx-auto w-[18rem]">
                     <p className='cursor-default'>Phone:</p>
                        <InputMask id="phone" className='w-[14.6rem]' mask="9999999999" value={phone} placeholder="9999999999" onChange={(e) => setPhone(e.value)}></InputMask>
                    </div>

                    <div className="text-left mx-auto w-[18rem]">
                     <p className='cursor-default'>Address:</p>
                     <InputTextarea value={address} onChange={(e) => setAddress(e.target.value)} rows={5} cols={26} autoResize placeholder='Bangalore India'/>
                    </div>

                    <div className='text-left mx-auto w-[18rem]'>
                    <p className='cursor-default'>Blood Group:</p>
                    <InputText id="username" pattern="^(A|B|AB|O)[+-]$"  required className='w-[14.6rem]' placeholder='Eg. A+' value={blood} onChange={(e) => setBlood(e.target.value)} />
                </div>

                    <div className='text-left mx-auto w-[18rem]'>
                    <p className='cursor-default'>Relative Name:</p>
                    <InputText id="username"  pattern="^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$"  required className='w-[14.6rem]' placeholder='Eg. Peter' value={rname} onChange={(e) => setRname(e.target.value)} />
                </div>

                <div className='text-left mx-auto w-[18rem]'>
                    <p className='cursor-default'>Relationship:</p>
                    <InputText id="username" pattern="^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$"  required className='w-[14.6rem]' placeholder='Eg. Father' value={relation} onChange={(e) => setRelation(e.target.value)} />
                </div>

        
                <div className="text-left mx-auto w-[18rem]">
                     <p className='cursor-default'>Relative Phone:</p>
                        <InputMask id="phone" className='w-[14.6rem]' mask="9999999999" value={rphone} placeholder="9999999999" onChange={(e) => setRphone(e.value)}></InputMask>
                    </div>
                    
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

