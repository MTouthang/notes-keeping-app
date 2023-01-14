import React, { useContext } from 'react'
import { notesContext } from '../context/notesContext'
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';


const Note = ({id, note}) => {

  const {noteDelete} = useContext(notesContext)
  const handleDelete = () => {
   
    noteDelete(id)
  }
  return (
  <>
      <div className='note'>
      <h1> {note.title}</h1>
      <p> {note.content}</p>
      <Button onClick={handleDelete}><DeleteIcon/></Button>
    </div>
  </>
    
  )
}

export default Note