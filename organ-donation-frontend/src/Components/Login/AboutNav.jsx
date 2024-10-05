import React from 'react'
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import {useNavigate} from 'react-router-dom';

export default function AboutNav() {

  const navigate=useNavigate();

  return (
    <div>
        <div className='w-[100%] h-[4.375em] bg-[#32637E]'>.
            <nav className='cursor-pointer absolute top-0 md:left-[63%] mt-[1.25em]'>
                <ul className='flex w-[23.5rem] justify-around text-[1.1rem] text-[#FFFFFF] font-serif'>
                    <li onClick={e=>{navigate('/about')}}>ABOUT</li>
                    <li onClick={e=>{navigate('/howmayihelpu')}}>HOW CAN U HELP</li>
                    <li onClick={e=>{navigate('/contactus')}}>CONTACT US</li>
                </ul>
            </nav>
        </div>
    </div>
  )
}
