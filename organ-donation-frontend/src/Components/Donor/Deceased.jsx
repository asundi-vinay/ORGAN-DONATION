import React,{useState,useRef, useEffect} from 'react'
import classes from '../../Components/Login/Login.module.css'
import { MultiSelect } from 'primereact/multiselect';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import NavBar from './NavBar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Deceased() {

    const [organ,setOrgan]=useState([]);
    const [err,setErr]=useState(false);
    const [checked, setChecked] = useState(false);
    const [displayMaximizable, setDisplayMaximizable] = useState(false);
    const [load,setLoad]=useState(false)
    const toast = useRef(null);
    const navigate=useNavigate();

    const organList = [
        { name: 'Heart', code: 'Heart' },
        { name: 'Eyes', code: 'Eye' },
        { name: 'Kidney', code: 'Kidney' },
      ];

      const user=JSON.parse(localStorage.getItem('user'))
      const path=process.env.REACT_APP_PATH;

      const dialogFuncMap = {
        'displayMaximizable': setDisplayMaximizable,
    }

      const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }
    const showError = (message) => {
        toast.current.show({severity:'error', summary: 'Error Message', detail:message, life: 3000});
    }

    const renderFooter = (name) => {
        return (
            <div>
                <Button label="Ok" icon="pi pi-times" onClick={() => onHide(name)} className="p-button-text" />
            </div>
        );
    }

    useEffect(()=>{
        async function fetch(){
          try{
            const res=await axios.get(`${path}donor/getdetails/${user._id}`)
            if(!("relationship" in res.data) && !("relativename" in res.data) && !("relativephone" in res.data) ){
                showError("Please fill the details in account page")
                setErr(true)
            }            
          }
          catch(err){
            console.log(err)
            setLoad(false)
            err && showError(err.response.data.message)
          }
        }
        fetch()
      },[path])

    async function handleSubmit(e){
        e.preventDefault()
        const result = organ.map(a => a.name);
        // console.log(result)
        // setLoad(true)
        try{
            if(!err){
            //  organ.forEach((e)=>{ delete e.code})
             const res= await axios.post(`${path}donor/deceaseddonationrequest/${user._id}`,{donationOrgans:result})
             if(res.status===200){
                navigate('/donor')
             }
            }

        }
        catch(err){
            console.log(err)
            setLoad(false)
            err && showError(err.response.data.message)
        }

    }


  return (
    <>
    <Toast ref={toast} position="bottom-right" />
    <NavBar/>
        <div className={`${classes.bg1} py-8 pb-[18.6rem]`}>
        <form autoComplete='off' className='w-[23rem] pb-5 md:w-[46rem] mx-auto my-auto rounded-lg ' onSubmit={handleSubmit} style={{backdropFilter: 'blur(2px)', background: 'rgba(156, 152, 152, 0.45)'}}>
                <p className='text-[2rem] text-center font-serif cursor-default'>Deceased Donation </p>
                <div className='text-left mx-auto w-[18rem]'>
                    <p className='cursor-default'>Organ:</p>
                    <MultiSelect value={organ} options={organList} onChange={(e) => setOrgan(e.value)} optionLabel="name" placeholder="Select Organs" required display="chip" />
                </div>
                <div className="text-left mx-auto w-[20rem] mt-[1rem]">
                    <Checkbox inputId="binary" required checked={checked} onChange={e => setChecked(e.checked)} />
                    <label  htmlFor="binary"> I Agree to <span className='underline decoration-sky-500' style={{"cursor":"pointer"}} onClick={()=>{setDisplayMaximizable(true)}}>Terms & Conditions</span></label>
                </div>
                <div className=" mx-auto mt-[1rem]">
                    <Button label="Submit" loading={load}  className={`p-button-raised items-center p-button-success mt-2`} />
                </div>
        </form>
                <Dialog header="Terms & Conditions" visible={displayMaximizable} maximizable modal style={{ width: '50vw' }} footer={renderFooter('displayMaximizable')} onHide={() => onHide('displayMaximizable')}>
                    <p className="m-0"><p><strong>The various forms outlined in the rules are as follows:</strong></p>
                    <p>Form 1: Near-relative consent<br/> Form 2: Spouse consent<br/> Form 3: Other than near-relative donor consent<br/> Form 4: Psychiatrist evaluation of the donor<br/> Form 5: HLA DNA profiling report<br/> Form 7: Self consent for deceased donation<br/> Form 8: Consent for organ donation from family (also applicable for minors)<br/> Form 9: Consent for organ donation from unclaimed bodies<br/> Form 10: Brain death declaration form<br/> Form 11: Joint transplant application by donor / recipient<br/> Form 12: Registration of hospital for organ transplantation<br/> Form 13: Registration of hospital for organ retrieval<br/> Form 16: Grant of registration<br/> Form 17: Renewal of registration<br/> Form 18: Decision by hospital authorization committee<br/> Form 19: Decision by district authorization committee<br/> Form 20: Verification of Domicile for non near-relative<br/> Form 21: Letter from Embassy</p></p>
                </Dialog>
        </div>
    </>
  )
}
