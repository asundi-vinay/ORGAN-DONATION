import React from 'react'
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import classes from '../../Components/Login/Login.module.css'
import AboutNav from '../Login/AboutNav';
import NavLogin from '../Login/NavLogin';

export default function HowMayIhHelpU() {
  return (
    <>
        <AboutNav/>
        <NavLogin/>
        <div className={`${classes.bg1} py-8 pb-[5rem]`}>
            <div className='w-[24rem] pb-[2rem] md:w-[46rem] mx-auto rounded-lg h-[contain]' style={{backdropFilter: 'blur(2px)', background: 'rgba(156, 152, 152, 0.45)'}}>
                <p className='text-[2rem] text-center font-serif cursor-default'>HOW CAN U HELP</p>
                <ol className='mx-[3rem] list-decimal'>
                    <li> Organ donation is the process of surgically removing an organ or tissue from a living or deceased person and transplanting it into another person.</li>
                    <li> Organ transplantation can save and improve the lives of people with organ failure or certain medical conditions.</li>
                    <li> There are several types of organs and tissues that can be donated, including the heart, lungs, liver, kidneys, pancreas, and small intestine. Tissues that can be donated include corneas, bone, skin, and blood vessels.</li>
                    <li> Anyone can potentially be an organ donor, regardless of age or medical history. Some medical conditions or infections may disqualify a person from being a donor, but in general, most people are able to donate.</li>
                    <li> If you are interested in becoming an organ donor, you can register your decision on your driver's license or state ID card, or by signing up on the National Donate Life Registry. You can also discuss your wishes with your family and loved ones to ensure that your donation decision is honored.</li>
                </ol>
            </div>
        </div>
    </>
  )
}
