import React from 'react'
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import classes from '../../Components/Login/Login.module.css'
import AboutNav from '../Login/AboutNav';
import NavLogin from '../Login/NavLogin';

export default function ContactUs() {
  return (
    <>
        <AboutNav/>
        <NavLogin/>
        <div className={`${classes.bg} py-8 pb-[5rem] h-[25.8rem]`}>
            <div className='w-[24rem] pb-[2rem] md:w-[46rem] mx-auto rounded-lg h-[contain]' style={{backdropFilter: 'blur(2px)', background: 'rgba(156, 152, 152, 0.45)'}}>
                <p className='text-[2rem] text-center font-serif cursor-default underline decoration-1 leading-6 pt-4'>CONTACT US</p>
                <p className='text-[1.3rem] text-center font-serif cursor-default'>Questions about organ donation</p>
                <ol className='mx-[3rem]'>
                    <li className='cursor-default'> WRITE US AN EMAIL :</li>
                    <a className='pl-5' href="mailto:organdonation123@gmail.com">organdonation123@gmail.com</a>
                    <li className='cursor-default'> CALL US : </li>
                    <a className='pl-5' href="tel:+91 999956999">999956999</a>
                </ol>
            </div>
        </div>
    </>
  )
}
