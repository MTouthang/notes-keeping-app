import React, {useState} from 'react'
import "./authStyle.css"
import Button from '@mui/material/Button';
import axios from 'axios';



const Signup = ({exitSignUp, showLogin}) => {

  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState()

 


  const signUpSubmit = async(e) => {
    e.preventDefault()

    if(password !== confirmPassword){
      alert("Password not matched")
    } else {
      try {
        const userData = {
          userName: userName,
          email: email,
          password: password
        }

       const res = await axios.post("/auth/user/signup", userData)

       if (res.data.success){
        exitSignUp(false)
        showLogin(true)
        window.location.reload()
       }

      } catch (error) {
        console.log(error)
        alert(error.response.data.message)
      }
      
    }
  }



  return (
    <>
    
     <div className='user-modal'>
     <div className='s-container'>
       <h2> Signup and Login </h2>
       <p> Kindly signup to save your notes !</p>
       <input type="text" name='userName' value={userName} placeholder='Enter your Username...' onChange={(e)=>setUserName(e.target.value)} />
       <input type="email" name='email' value={email} placeholder='Enter your email...' onChange={(e) => setEmail(e.target.value)} />
       <input type="text" name="password" value={password} placeholder='Enter password...' onChange={(e) => setPassword(e.target.value)}/>
       <input type="text" name="confirmPassword" value={confirmPassword} placeholder='confirm password...' onChange={(e) => setConfirmPassword(e.target.value)}/>
       <Button variant='contained' onClick={signUpSubmit}> Signup </Button>
     </div>
   </div>
    
    </>
  )
}

export default Signup