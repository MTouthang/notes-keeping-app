import React from 'react'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import Button from '@mui/material/Button';
// import Avatar from '@mui/material/Avatar';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {
  return (
    <header className='header'>
        <h1><TipsAndUpdatesIcon/> Keeper</h1>   
        <div className='nav-search'>
        <input type="text" placeholder='Search note title ...' />
        <IconButton aria-label="search" title="search note">
          <SearchIcon/>
        </IconButton>
        </div>
        <div className='nav-log'>
          <Button variant="contained" color="success" startIcon={<AccountCircleIcon/>} > Login</Button>
          <Button variant="contained" color="success" startIcon={<AccountCircleIcon/>} > Signup</Button>
          {/* <Button variant="contained" color='error'  startIcon={<Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: 24, height: 24 }} />}> logout</Button> */}
        </div>

    </header>
  )
}

export default Header