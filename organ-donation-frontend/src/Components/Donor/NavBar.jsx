import React,{useState} from 'react'
import Logo from '../../assets/logo.png'
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import {useNavigate} from 'react-router-dom';
import { TabMenu } from 'primereact/tabmenu';
import { Icon } from '@iconify/react';


export default function NavBar() {
    const navigate=useNavigate();
    const user=JSON.parse(localStorage.getItem('user'))

    const [activeIndex, setActiveIndex] = useState(0);

    const items = [
        {label: 'Donor', icon: <Icon icon="bxs:donate-heart" fontSize="35px" />},
        {label: 'Deceased Donation', icon: <Icon icon="emojione-monotone:coffin" fontSize="30px"/>},
        {label: 'Living Donation', icon: <Icon icon="mdi:cards-heart" fontSize="30px"/>},
        {label: 'Account', icon: 'pi pi-fw pi-user'},
        {label: 'Logout', icon: 'pi pi-fw pi-key'},
    ];

    async function Navigatto(e){
        // console.log(e.index)
        const item=items[e.index].label
        if(item==='Donor'){
            navigate('/donor')
        }
        if(item==='Living Donation'){
         navigate('/donor/livingdonation')
        }
        else if(item==='Deceased Donation'){
            navigate('/donor/deceaseddonation')
           }
        else if(item==='Logout'){
            localStorage.removeItem("user");
            navigate('/');
        }
        else if(item==='Account'){
            navigate('/donor/account')
        }
    }
    // console.log(activeIndex)
  return (
    <>
        <div className='w-[100%] bg-[#A2DFD0] py-1'>
            <div className='flex w-[99.8%] py-3 px-2' style={{borderRadius: '20px',boxSizing: 'border-box', background: 'linear-gradient(90.94deg, rgba(255, 255, 255, 0.5) 0.9%, rgba(232, 223, 223, 0.224051) 55.58%, rgba(207, 207, 207, 0) 99.99%)',border: 'solid rgba(162, 223, 208, 0.35)',boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)'}}>
                <img src={Logo} alt='logo' className='rounded-lg pl-2'/>
                {/* <nav className='cursor-pointer relative left-[-2.4%] md:left-[62%] mt-[2.2em]'> */}
                    {/* <div className='flex w-[16rem] justify-around text-[1.1rem] text-[#FFFFFF] font-serif'> */}

                    <TabMenu className='absolute inset-y-[8%] right-10' activeIndex={activeIndex} model={items}  onTabChange={(e) => {setActiveIndex(e.index);Navigatto(e)}} />
                        {/* <li>
                            <Link style={{"textDecoration":"none"}} to="/donor">
                            HOME
                            </Link>
                        </li>
                        <li>
                            <Link onClick={()=>{localStorage.removeItem("user");navigate('/')}} style={{"textDecoration":"none"}}  to="/register">
                            LOGOUT
                            </Link>
                        </li>                    
                        <li>
                            <Link style={{"textDecoration":"none"}}  to="/donor/account">
                                ACCOUNT
                            </Link>
                        </li> */}
                    {/* </div> */}
                {/* </nav> */}
            </div>
        </div>
    </>
  )
}