import React from 'react'
import "./authStyle.css"
import Button from '@mui/material/Button';
const Signup = () => {
  return (
    <div className='sign-up-modal'>
      <div className='s-container'>
        <h2> Signup </h2>
        <p> Kindly signup to save your notes !</p>
       
        <input type="text" placeholder='Enter your Username...' />

      
        <input type="text" placeholder='Enter your email...' />

        <input type="text" placeholder='Enter password...'/>

        <input type="text" placeholder='confirm password...' />
        <Button variant='contained'> Signup </Button>
      </div>
    </div>
  )
}

export default Signup