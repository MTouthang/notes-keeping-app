import React, {useState} from 'react'
import { Button } from '@mui/material'
import axios from 'axios'
import { toast } from 'react-toastify'
import { toastOptions } from '../../toastOption'
import { apiEndPoint } from '../../api'



const Login = ({loginSuccess, setToggle, setShowLogout}) => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const loginSubmit = async(e) => {
    e.preventDefault()

    // login 
    try {
      const data = {
        email : email,
        password: password
      }
      const res = await axios.post(`${apiEndPoint}/auth/user/login`, data)
      if(res.data.success){
        toast.success("Login successful", toastOptions)
        loginSuccess(false)
        setToggle(false)
        setShowLogout(true)
        // TODO: reload page 
        // setTimeout (() =>{
        //   window.location.reload()
        // }, 1000)
       
      
      }

    } catch (error) {
      toast.error(error.response.data.message, toastOptions)
    }

  }
  
  //TODO: login page shown after signup - 

  return  (
    <div className='user-modal'>
      <div className='s-container'>
        <h2> Login </h2>
        <p> Kindly Login to see and add notes!</p>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter your Email...' />
        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password...' />
        <Button variant='contained' onClick={loginSubmit}> Login </Button>
      </div>
    </div>
  )
}

export default Login