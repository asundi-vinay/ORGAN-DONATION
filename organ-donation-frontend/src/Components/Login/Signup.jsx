import React, { useState } from 'react'
import classes from './Login.module.css'
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown'
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import NavLogin from './NavLogin';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import AboutNav from './AboutNav';

export default function Signup() {

    const [uname, setUname] = useState('');
    const [mail, setMail] = useState('');
    const [passwd, setPasswd] = useState('');
    const [cpasswd, setCPasswd] = useState('');
    const [role, setRole] = useState([]);
    const [load, setLoad] = useState(false)
    const [passErr, setPassErr] = useState(false)
    const path=process.env.REACT_APP_PATH;
    const navigate=useNavigate();


    const HandleSubmit = async(e) =>{
        e.preventDefault()
        setLoad(true)
        try{
            if(role.name==='Donor'){
                const newobj={name:uname,password:passwd,email:mail}
                const res=await axios.post(`${path}donor/register`,newobj)
                if(res.status===200){
                    navigate('/login')
                }
            }
            else{
                const newobj={name:uname,password:passwd,email:mail}
                const res=await axios.post(`${path}hospital/register`,newobj)
                if(res.status===200){
                    navigate('/login')
                }
            }
        }
        catch(err){
            setLoad(false)
            alert(err.response.data.message)
        }
        setLoad(false)
    }
    
    const passHandler = (e) =>{
        passwd !== cpasswd && setPassErr(true)
        passwd === cpasswd && setPassErr(false)
    }

    const roleList = [
        { name: 'Donor', code: 'Donor' },
        { name: 'Hospital', code: 'Hospital' },
    ];

  return (
    <>
        <AboutNav/>
        <NavLogin/>
        <div className={`${classes.bg1} py-8 pb-[5rem]`}>
            <form autoComplete='off' className='w-[23rem] pb-5 md:w-[46rem] mx-auto rounded-lg ' onSubmit={HandleSubmit} style={{backdropFilter: 'blur(2px)', background: 'rgba(156, 152, 152, 0.45)'}}>
                <p className='text-[2rem] text-center font-serif cursor-default'>Register</p>
                <div className='text-left mx-auto w-[18rem]'>
                    <p className='cursor-default'>Name:</p>
                    <InputText id="username" pattern="^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$" autoFocus required className='w-[14.6rem]' placeholder='Eg. Peter' value={uname} onChange={(e) => setUname(e.target.value)} />
                </div>
                <div className='text-left mx-auto w-[18rem]'>
                    <p className='cursor-default'>Email:</p>
                    <InputText type='email' pattern='^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$' required className='w-[14.6rem]' placeholder='Eg. Peter@gmail.com' value={mail} onChange={(e) => setMail(e.target.value)} />
                </div>
                <div className='text-left mx-auto w-[18rem]'>
                    <p className='cursor-default'>Password:</p>                    
                    <Password value={passwd} className={passErr ? 'p-invalid block' : ''} required placeholder="***********" onChange={(e) => setPasswd(e.target.value)} toggleMask tooltip={'At least one uppercase,\n lowercase, numeric,\n minimum 8 characters'} tooltipOptions={{position: 'top'}}/>
                </div>
                <div className='text-left mx-auto w-[18rem]'>
                    <p className='cursor-default'>Confirm Password:</p>                    
                    <Password value={cpasswd} className={passErr ? 'p-invalid block' : ''} required placeholder="***********" onChange={(e) => setCPasswd(e.target.value)} onKeyUp={passHandler} toggleMask />
                    {passErr && <p className='cursor-default text-[red]'>Password does not match!</p>}
                </div>
                <div className='text-left mx-auto w-[18rem]'>
                    <p className='cursor-default'>Role:</p>                    
                    <Dropdown value={role} className='w-[14.6rem]' required options={roleList} onChange={e=>setRole(e.value)} optionLabel="name" placeholder="Select a Role " />
                </div>
                <div className={`mt-2 ${load && ('cursor-wait')} w-[fit-content] mx-auto`}>
                    <Button label="Sign-up" loading={load} className={`p-button-raised p-button-success mt-2`} />
                </div>
            </form>
        </div>
    </>
  )
}
