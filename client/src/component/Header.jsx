import React, { useState } from 'react'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import { Link } from 'react-router-dom';
import Signup from './userAuth/Signup';
import Login from './userAuth/Login';
import CloseIcon from '@mui/icons-material/Close';
import Exit from './userAuth/Exit';

const Header = () => {

  const [clickLogin, setClickLogin] = useState(false)
  const [clickSignUp, setClickSignUp] = useState(false)
  const [exitClick, setExitClick] = useState(false)

  const loginModal = () => {
   setClickSignUp(false)
   setClickLogin(true)
  }

  const signUpModal = () => {
    setClickLogin(false)
    setClickSignUp(true)
  }

  const logoutToggle = () =>{
    exitClick ? setExitClick(false) : setExitClick(true)
  }

  return (
    <>
      <header className='header'>
         <h1><TipsAndUpdatesIcon/> Keeper</h1>   
        <div className='nav-search'>
        <input type="text" placeholder='Search note title ...' />
          <IconButton aria-label="search" title="search note">
            <SearchIcon/>
          </IconButton>
        </div>
        <div className='nav-log'>
          <Button variant="contained" color="success" startIcon={<AccountCircleIcon/>} onClick={loginModal}>Login</Button>
          <Button variant="contained" color="success" startIcon={<AccountCircleIcon/>} onClick={signUpModal}> SignUp</Button>
          <Button variant="contained" color='error'  startIcon={<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: 24, height: 24 }} />} onClick={logoutToggle}> logout</Button>
        </div>
    </header>
    {
      clickLogin && 
      <div>
         <div className='exit' onClick={() => setClickLogin(false)}>
            <CloseIcon />
          </div>
        <Login/>
      </div>
    }
    {
      clickSignUp && 
      <div>
          <div className='exit' onClick={() => setClickSignUp(false)}>
          <CloseIcon />
          </div>
        <Signup/>
      </div>
    }
     {
      exitClick && 
      <div>
       <Exit/>
      </div>
    }

    </>
    
  )
}

export default Header