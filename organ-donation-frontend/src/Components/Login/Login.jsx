import React, { useState } from 'react'
import classes from './Login.module.css'
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import NavLogin from './NavLogin';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import AboutNav from './AboutNav';

export default function Login({OnLogin}) {

    const [uname, setUname] = useState('');
    const [passwd, setPasswd] = useState('');
    const [load, setLoad] = useState(false)
    const [passErr, setPassErr] = useState(false)
    const path=process.env.REACT_APP_PATH;
    const navigate=useNavigate();

    const HandleSubmit = async(e) =>{
        e.preventDefault()
        setLoad(true)
        try{
            const res=await axios.post(`${path}auth/login`,{"email":uname,"password":passwd}) 
            OnLogin(res.data)
            localStorage.setItem("user",JSON.stringify(res.data))
            if(res.data.role){
                const  a=res.data.role.toLocaleLowerCase()
                navigate(`/${a}`)
            }
        }
        catch(err){
        setPassErr(true)
        setLoad(false)
        }
        // console.log({uname,passwd})
       
    }

  return (
    <>
        <AboutNav/>
        <NavLogin/>
        <div className={`${classes.bg} py-8 pb-[5rem]`}>
            <form autoComplete='off' className='w-[24rem] md:w-[46rem] mx-auto rounded-lg h-[18.8rem]' onSubmit={HandleSubmit} style={{backdropFilter: 'blur(2px)', background: 'rgba(156, 152, 152, 0.45)'}}>
                <p className='text-[2rem] text-center font-serif cursor-default'>LOGIN</p>
                <div className='text-left mx-auto w-[18rem] mt-3'>
                    <p className='cursor-default'>User Name:</p>
                    <InputText id="username" autoFocus required className='w-[14.6rem]' placeholder='Eg. Peter@gmail.com' value={uname} onChange={(e) => setUname(e.target.value)} />
                </div>
                <div className='text-left mx-auto w-[18rem] mt-2'>
                    <p className='cursor-default'>Password:</p>                    
                    <Password value={passwd} required placeholder="***********" onChange={(e) => setPasswd(e.target.value)} toggleMask tooltip={'At least one uppercase,\n lowercase, numeric,\n minimum 8 characters'} tooltipOptions={{position: 'top'}}/>
                    {passErr && <p className='cursor-default text-[red]'>Wrong Credentials. Try again!</p>}
                </div>
                <div className={`mt-2 ${load && ('cursor-wait')} w-[fit-content] mx-auto`}>
                    <Button label="Login" loading={load} className={`p-button-raised p-button-success mt-2`} />
                </div>
            </form>
        </div>
    </>
  )
}
