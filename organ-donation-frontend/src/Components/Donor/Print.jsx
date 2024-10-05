import React from 'react'
import Logo from '../../assets/logo.png'
// import  './Living.css'
import { Button } from 'primereact/button';
import { useLocation } from 'react-router';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';

export default function Print() {

  const loc = useLocation()
  console.log(loc)

  return (
    <div id='printsec'>
        <img src={Logo} id='logo' alt='logo' className='rounded-lg pl-2'/>
        <p className='header'>ORGAN DONOR CARD</p>
        <p className='content'>I ....................................... S/o,D/o,W/o ........................................, Age ....... (years),hereby pledge to donate the following Organ[s] from my body for therapeutic purpose. Organ[s] : Heart eye kidney</p>
        <div className='mt-3 ml-[40%]' id='hide'>
                <Button onClick={()=>window.print()}>
                    Print
                </Button>
        </div>
    </div>
  )
}
