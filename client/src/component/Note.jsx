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



const Note = ({id, note}) => {

  const {noteDelete, userInfo} = useContext(notesContext)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  

  
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

 

  
  return (
  
    <div className='note'>
      {
        
      }
      <div className='note-date'>{new Date(note.updatedAt).toLocaleString()}</div>
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
      
    </div>
 
  )
}

export default Note