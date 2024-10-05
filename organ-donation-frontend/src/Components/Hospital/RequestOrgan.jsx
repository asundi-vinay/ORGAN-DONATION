import React,{useEffect, useRef, useState} from 'react'
import classes from '../../Components/Login/Login.module.css'
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
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
import { Calendar } from 'primereact/calendar';


export default function RequestOrgan() {
  const [uname, setUname] = useState("");
  const [mail, setMail] = useState("");
  const [date, setDate] = useState(null);
  const [load, setLoad] = useState(false)
  const [phone, setPhone] = useState(null);
  const [address, setAddress] = useState('');
  const [medcondition, setMedcondition] = useState('');
  const [gender, setGender] = useState([]);
  const [organ, setOrgan] = useState([]);

//   const [err,setErr]=useState(false)
const [blood, setBlood] = useState('');

  const navigate=useNavigate();

  const genderList = [
    {name: 'Male', code: 'Male'},
    {name: 'Female', code: 'Female'},
    {name: 'Others', code: 'Others'},
  ]

  const organList = [
    {name: 'Eyes', code: 'Eyes'},
    {name: 'Kidney', code: 'Kidney'},
    {name: 'Heart', code: 'Heart'},
  ]
  
  const toast = useRef(null);

const showError = (message) => {
  toast.current.show({severity:'error', summary: 'Error Message', detail:message, life: 3000});
}


const path=process.env.REACT_APP_PATH;
const user=JSON.parse(localStorage.getItem('user'))


async function handleSubmit(e){
  e.preventDefault()
  setLoad(true)
  try{
      const newobj={ name:uname, email:mail, phone, gender:gender.name, address,DOB:date, bloodgroup:blood,medicalCondition:medcondition,requiredOrgan:organ.name } 
      const res=await axios.post(`${path}hospital/createpatient/${user && user._id}`,newobj) 
      if(res.status===200){
          navigate("/hospital")
  }
  }
  catch(err){
    console.log(err)
    setLoad(false)
    err && showError(err.response.data.message)
  }
}

  return (
    <>
    <NavBar/>
    <Toast ref={toast} position="bottom-right" />
        <div className={`${classes.bg1} py-8 pb-[5rem]`}>
            <form autoComplete='off' className='w-[23rem] pb-5 md:w-[46rem] mx-auto rounded-lg ' onSubmit={handleSubmit} style={{backdropFilter: 'blur(2px)', background: 'rgba(156, 152, 152, 0.45)'}}>
                <p className='text-[2rem] text-center font-serif cursor-default'>Request Details</p>
                <div className='text-left mx-auto w-[18rem]'>
                    <p className='cursor-default'>Patient Name:</p>
                    <InputText id="username" pattern="^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$" autoFocus required className='w-[14.6rem]' placeholder='Eg. Peter' value={uname} onChange={(e) => setUname(e.target.value)} />
                </div>
                <div className='text-left mx-auto w-[18rem]'>
                    <p className='cursor-default'>Gender:</p>                    
                    <Dropdown value={gender} className='w-[14.6rem]' required options={genderList} onChange={e=>setGender(e.value)} optionLabel="name" placeholder="Select a Gender " />
                </div>
                <div className="text-left mx-auto w-[18rem]">
                     <p className='cursor-default'>Patient Phone:</p>
                        <InputMask id="phone" className='w-[14.6rem]' mask="9999999999" value={phone} placeholder="9999999999" onChange={(e) => setPhone(e.value)}></InputMask>
                    </div>

                    <div className="text-left mx-auto w-[18rem]">
                     <p className='cursor-default'>Patient Address:</p>
                     <InputTextarea value={address} onChange={(e) => setAddress(e.target.value)} rows={5} cols={26} autoResize placeholder='Bangalore India'/>
                    </div>
                <div className='text-left mx-auto w-[18rem]'>
                    <p className='cursor-default'>Patient Email:</p>
                    <InputText type='email' pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$' required className='w-[14.6rem]' placeholder='Eg. Peter@gmail.com' value={mail} onChange={(e) => setMail(e.target.value)} />
                </div>

                <div className='text-left mx-auto w-[18rem]'>
                    <p className='cursor-default'>Patient DOB:</p>                    
                    <Calendar id="minmax" className='w-[14.5rem]' value={date} onChange={(e) => setDate(e.value)} minDate={new Date('1900')} maxDate={new Date()} readOnlyInput />
                </div>

                <div className='text-left mx-auto w-[18rem]'>
                    <p className='cursor-default'>Patient Blood Group:</p>
                    <InputText type='text' pattern="^(A|B|AB|O)[+-]$" required className='w-[14.6rem]' placeholder='Eg. A+' value={blood} onChange={(e) => setBlood(e.target.value)} />
                </div>
                <div className='text-left mx-auto w-[18rem]'>
                    <p className='cursor-default'>Medical Condition:</p>
                    <InputTextarea value={medcondition} onChange={(e) => setMedcondition(e.target.value)} rows={5} cols={26} autoResize placeholder='Kidney Failure'/>
                </div>
                <div className='text-left mx-auto w-[18rem]'>
                    <p className='cursor-default'>Organ Request:</p>                    
                    <Dropdown value={organ} className='w-[14.6rem]' required options={organList} onChange={e=>setOrgan(e.value)} optionLabel="name" placeholder="Select a Organ" />
                </div>
                <div className={`mt-2 ${load && ('cursor-wait')} w-[fit-content] mx-auto`}>
                    <Button label="Request" loading={load} className={`p-button-raised p-button-success mt-2`} />
                </div>
            </form>
        </div>
    </>
  )
}

