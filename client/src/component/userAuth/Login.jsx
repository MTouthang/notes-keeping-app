import React, {useState} from 'react'
import { Button } from '@mui/material'
import axios from 'axios'




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

      const res = await axios.post("/auth/user/login", data)
      
      
      if(res.data.success){
        
        loginSuccess(false)
        setToggle(false)
        setShowLogout(true)
     
      
      }

    } catch (error) {
      alert(error.response.data.message)
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