import React from 'react'
import { Link} from "react-router-dom";
import Logo from '../../assets/logo.png'



export default function NavLogin() {
  return (
    <>
        <div className='w-[100%] bg-[#A2DFD0] py-1'>
            <div className='flex w-[99.8%] py-3 px-2' style={{borderRadius: '20px',boxSizing: 'border-box', background: 'linear-gradient(90.94deg, rgba(255, 255, 255, 0.5) 0.9%, rgba(232, 223, 223, 0.224051) 55.58%, rgba(207, 207, 207, 0) 99.99%)',border: 'solid rgba(162, 223, 208, 0.35)',boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)'}}>
                <img src={Logo} alt='logo' className='rounded-lg pl-2'/>
                <nav className='cursor-pointer relative left-[-2.4%] md:left-[62%] mt-[2.2em]'>
                    <ul className='flex w-[16rem] justify-around text-[1.1rem] text-[#FFFFFF] font-serif'>
                        <li>
                            <Link style={{"textDecoration":"none"}} to="/">
                            HOME
                            </Link>
                        </li>
                        <li >
                            <Link style={{"textDecoration":"none"}}  to="/login">
                                 LOGIN
                            </Link>
                        </li>
                        <li>
                            <Link style={{"textDecoration":"none"}}  to="/register">
                              REGISTER
                            </Link>
                        </li>
                       
                    </ul>
                </nav>
            </div>
        </div>
    </>
  )
}
