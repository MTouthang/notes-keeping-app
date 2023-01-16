import React from 'react'
import { Button } from '@mui/material'

const Login = () => {
  return  (
    <div className='user-modal'>
      <div className='s-container'>
        <h2> Login </h2>
        <p> Kindly Login to see and add notes!</p>
        <input type="text" placeholder='Enter your Email...' />
        <input type="text" placeholder='Enter Password...' />
        <Button variant='contained'> Login </Button>
      </div>
    </div>
  )
}

export default Login