import React, { useState, useContext } from 'react'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import Signup from './userAuth/Signup';
import Login from './userAuth/Login';
import CloseIcon from '@mui/icons-material/Close';
import Exit from './userAuth/Exit';
import { notesContext } from '../context/notesContext';


const Header = ({userNa}) => {



  const [clickLogin, setClickLogin] = useState(false)
  const [clickSignUp, setClickSignUp] = useState(false)
  // closing user login and signup modal
  const [exitClick, setExitClick] = useState(false)
  // signup and signin button show/hide
  const [toggle, setToggle] = useState(true)
  // logout button hide/show
  const [showLogout, setShowLogout] = useState(false)

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

    // search features
    const {searchFunction} = useContext(notesContext)
    const [searchItem, setSearchItem] = useState("")
  // search note by title
  const search = async (item) => {

    // try {
    //   const res = await axios.get(`/user/note?title=${item}`)
    //   console.log(res)
    //   if(res.data.success){
    //     console.log(res.data.note)
    //      setSearchNote(res.data.note)
    //   }
    // } catch (error) {
   
    //   // TODO: display smothly
    //   console.log("note items note able to search")

    // }
    searchFunction(item)
    
    setSearchItem("")
    
  }

  

  return (
    <>
      <header className='header'>
         <h1><TipsAndUpdatesIcon/> Keeper</h1>   
        <div className='nav-search'>
          <input type="text" value={searchItem} onChange={(e) =>setSearchItem(e.target.value)} placeholder='Search note title ...' />
            {
              searchItem && 
                <IconButton aria-label="search" title="search note" onClick={() => search(searchItem)}>
                  <SearchIcon/>
                </IconButton>
              
            }
            
        </div>
        <div className='nav-log'>
          {
          userNa && 
            <>
              { toggle && <Button variant="contained" color="success" startIcon={<AccountCircleIcon/>} onClick={loginModal}>Login</Button>}

              {toggle && <Button variant="contained" color="success" startIcon={<AccountCircleIcon/>} onClick={signUpModal}> SignUp</Button>
              } 
            </> 
          }
          {
             (!userNa || showLogout) &&  <Button variant="contained" color='error'  startIcon={<Avatar sx={{ width: 26, height: 26 }} title={"profile"}>{}</Avatar>} onClick={logoutToggle}> logout</Button>
          }
        </div>
    </header>
    {
      clickLogin && 
      <div>
         <div className='exit' onClick={() => setClickLogin(false)}>
            <CloseIcon />
          </div>
       <Login loginSuccess={setClickLogin} setToggle = {setToggle} setShowLogout= {setShowLogout}/>
      
      </div>
    }
    {
      clickSignUp && 
      <div>
          <div className='exit' onClick={() => setClickSignUp(false)}>
          <CloseIcon />
          </div>
        <Signup exitSignUp = {setClickSignUp} showLogin={setClickLogin}/>
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