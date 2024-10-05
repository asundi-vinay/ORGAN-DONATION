import React from 'react'
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import classes from '../../Components/Login/Login.module.css'
import AboutNav from '../Login/AboutNav';
import NavLogin from '../Login/NavLogin';

export default function Home() {
  return (
    <>
        <AboutNav/>
        <NavLogin/>
        <div className={`${classes.bg} py-8 pb-[5rem]`}>
            <div className='w-[24rem] pb-[2rem] md:w-[46rem] mx-auto rounded-lg h-[contain]' style={{backdropFilter: 'blur(2px)', background: 'rgba(156, 152, 152, 0.45)'}}>
                <p className='text-[2rem] text-center font-serif cursor-default mt-[.8rem]'>HOME</p>
                <p className='text-[2rem] text-left font-serif cursor-default ml-[3rem] mt-[1rem]'>
                Let your Heart <br/>
                Beat for Others<br/>
                Your Heart has more than one life<br/>
                Pledge for Organ Donation<br/>
                </p>
            </div>
        </div>
    </>
  )
}
