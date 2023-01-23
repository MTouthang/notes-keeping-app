import React, {useState, useContext } from 'react'
import { notesContext } from '../context/notesContext'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import axios from 'axios';
import { toast } from 'react-toastify';
import { toastOptions } from '../toastOption';
import { apiEndPoint } from '../api';
import { getToken } from '../appCookie';
import ColorLensIcon from '@mui/icons-material/ColorLens';




const Note = ({id, note}) => {

  const {noteDelete, userInfo} = useContext(notesContext)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [theme, setTheme] = useState(false)

  const [bgColor, setBgColor] = useState("")
  const [ fontColor, setFontColor] = useState("")




  const handleDelete = () => {
      noteDelete(id)
  }

  const update = async(id) => {
      if(userInfo){
        try {
          const res = await axios.put(`${apiEndPoint}/user/note/${id}`, {
            title: title ? title : note.title ,
            content: content ? content : note.content 
          }, {
            headers: {'Authorization': `Bearer ${getToken()}`}
          })
         if(res.data.success){
          toast.success("note updated", toastOptions)
         }
        } catch (error) {
          toast.error("Note not updated", toastOptions)
        }
      } else {
        toast("updated temporary", toastOptions)
      }
      setTitle("")
      setContent("")
  }

  const getTheme = () => {
    theme ? setTheme(false) : setTheme(true)
  }

  const customStyle = {
    color:  fontColor ? fontColor : note.fontColor,
    backgroundColor: bgColor ? bgColor : note.bgColor
  }

  const updateColor = async () => {
    if(userInfo){
      try {
        const res = await axios.put(`${apiEndPoint}/user/note/ui/${id}`, {
          bgColor: bgColor ? bgColor : note.bgColor ,
          fontColor: fontColor ? fontColor : note.fontColor 
        }, {
          headers: {'Authorization': `Bearer ${getToken()}`}
        })
       if(res.data.success){
        toast.success("note color updated", toastOptions)
       }
      } catch (error) {
        toast.error("Note color not updated", toastOptions)
      }
    } else {
      toast("updated temporary", toastOptions)
    }
  }

  return (
    <>
  
    <div className='note' style={customStyle }>
      { userInfo && 
        <div className='date-container'>
          <div className='note-date date1' style={customStyle}>Created at - {new Date(note.createdAt).toLocaleString()}</div>
          <div className='note-date' style={customStyle}>Updated at - {new Date(note.updatedAt).toLocaleString()}</div>
        </div>
      }
      {
        (title || content ) && 

        <IconButton title='Edit not' onClick={() => update(id)} ><CloudDoneIcon /></IconButton>
      }
     
      <h1  className='note-title'
        contentEditable={true}
        suppressContentEditableWarning={true}
        onInput={(e) => setTitle(e.target.innerHTML)} 
       
      > 
      {note.title}</h1>
      <p className="note-content"
         contentEditable={true}
         suppressContentEditableWarning={true}
         onInput={(e) => setContent(e.target.innerHTML)}
      > 
        {note.content}
        </p>
      <IconButton onClick={handleDelete} title="delete note"><DeleteIcon/></IconButton>
      <IconButton onClick={getTheme} title="delete note"><ColorLensIcon/></IconButton>
      {
        theme && 
        <div className='theme-modal'  style={customStyle}>
          <p>Background color -<span>
            <input 
            type="color" 
            value={bgColor} 
            onChange={(e) => setBgColor(e.target.value)}
            /></span> </p>
          <p>Font color - <span>
            <input 
            type="color" 
            value={fontColor}
            onChange={(e) => setFontColor(e.target.value)}
            /></span> </p>
          <IconButton title="update color" onClick={updateColor} ><CloudDoneIcon/></IconButton>
        </div>
      }
      
    </div>
    
    </>
  )
}

export default Note