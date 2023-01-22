import React, {useState} from 'react'
import { Button } from '@mui/material'
import axios from 'axios'
import { toast } from 'react-toastify'
import { toastOptions } from '../../toastOption'
import { apiEndPoint } from '../../api'
import { clearCookie } from '../../appCookie'

const Exit = () => {
  const [toggle, setToggle] = useState(true)

  const exit = () => {
    toggle ? setToggle(false) : setToggle(true)
  }

  const exitedReload = async () => {
    
    try { 
      const res = await axios.get(`${apiEndPoint}/auth/user/logout`)
      if(res.data.success){
        
        toast.success("Logout successfully", toastOptions)
        clearCookie()
        setTimeout(() => {
          window.location.reload()
        }, 2000);
       
       }
    } catch (error) {
      toast.error("failed to logout")
    }
  }

  return (
   <>
   {toggle && 
    <div className='user-modal'>
    <div className='s-container'>
      <h2> Logout </h2>
      <p> Are you sure you want to logout ?</p>
     <span className='exit-button'>
          <Button variant='contained' color='success' onClick={exitedReload}> Yes </Button>
          <Button variant='contained' color="error" onClick={exit}> No </Button>
      </span> 
    </div>
  </div>
   }
    
   </>
    
  )
}

export default Exit