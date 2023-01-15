import React, { useContext } from 'react'
import { notesContext } from '../context/notesContext'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';



const Note = ({id, note}) => {

  const {noteDelete} = useContext(notesContext)
  const handleDelete = () => {
   
    noteDelete(id)
  }
  return (
  
    <div className='note'>
      <IconButton title='Edit note'><EditIcon /></IconButton>
      <h1> {note.title}</h1>
      <p> {note.content}</p>
      <IconButton onClick={handleDelete} title="delete note"><DeleteIcon/></IconButton>
    </div>
 
  )
}

export default Note