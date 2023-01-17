import React, {useState} from 'react'
import { Button } from '@mui/material'
import axios from 'axios'

const Exit = () => {
  const [toggle, setToggle] = useState(true)

  const exit = () => {
    toggle ? setToggle(false) : setToggle(true)
  }

  const exitedReload = async () => {
    
    const res = await axios.get("/auth/user/logout")

    if(res.data.success){
     window.location.reload()
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