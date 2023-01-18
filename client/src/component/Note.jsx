import React, {useState, useContext } from 'react'
import { notesContext } from '../context/notesContext'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import axios from 'axios';



const Note = ({id, note}) => {

  const {noteDelete} = useContext(notesContext)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  
  const handleDelete = () => {
    noteDelete(id)
  }

  const update = async(id) => {
   
      try {
        const res = await axios.put(`/user/note/${id}`, {
          title: title ? title : note.title ,
          content: content ? content : note.content 
        })
       if(res.data.success){
        //TODO: 3 alert change
        alert("updated successfully")
       }
      } catch (error) {
        console.log(error)
      }
      setTitle("")
      setContent("")
  }

  
  return (
  
    <div className='note'>
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
      <p
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