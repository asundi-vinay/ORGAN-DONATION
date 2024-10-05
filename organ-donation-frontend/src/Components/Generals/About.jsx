import React from 'react'
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import classes from '../../Components/Login/Login.module.css'
import AboutNav from '../Login/AboutNav';
import NavLogin from '../Login/NavLogin';

export default function About() {
  return (
    <>
        <AboutNav/>
        <NavLogin/>
        <div className={`${classes.bg1} py-8 pb-[5rem]`}>
            <div className='w-[24rem] pb-[2rem] md:w-[46rem] mx-auto rounded-lg h-[contain]' style={{backdropFilter: 'blur(2px)', background: 'rgba(156, 152, 152, 0.45)'}}>
                <p className='text-[2rem] text-center font-serif cursor-default'>ABOUT</p>
                <p className='mx-[3rem]'>
                Organ donation is the act of giving an organ or tissue to someone in need of a transplant. It can save the lives of people who are suffering from organ failure or other life-threatening conditions.<br/>
                There are many organizations that work to promote organ donation and facilitate the process of transplantation. These organizations may be run by government agencies, hospitals, or nonprofit groups. They often provide information and resources for people who are interested in becoming organ donors, as well as for those who are in need of a transplant.<br/>
                If you are considering becoming an organ donor, it is important to understand the process and the potential risks and benefits. You should also consider discussing your wishes with your family and loved ones, as they will be involved in the decision-making process if you are unable to make your own medical decisions.<br/>
                If you are in need of a transplant, it is important to understand the process of finding a suitable donor and the risks and benefits of transplantation. You should also be aware of the importance of following your medical team's instructions and taking good care of yourself to ensure the best possible outcome.<br/>
                Overall, organ donation and transplantation can be a life-saving and life-changing experience for both donors and recipients. By working together and educating ourselves, we can help make organ donation a more common and successful practice.
                </p>
            </div>
        </div>
    </>
  )
}
