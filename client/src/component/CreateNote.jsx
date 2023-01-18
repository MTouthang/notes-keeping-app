import React, {useContext, useState} from 'react'
import { notesContext } from '../context/notesContext'
import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';
import { Zoom } from '@mui/material';
import axios from 'axios';


const CreateNote = () => {
  
  const [isExpanded, setExpanded] = useState(false)

  /** constant to track of title and content*/
  const {addNote} = useContext(notesContext)
  const [note, setNote] = useState({
    title: "",  
    content: ""
  })

  // handling the change value of title and content
  const handleChange = (event) => {
    const {name, value} = event.target

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      }
    })
   
  }
  
 /** Pass the new note back to the app */
  const submitNote = async(event) => {
    event.preventDefault()

    const {title, content} = note

    if(!title && !content) {
      alert('Both field are required!')
    } else {
      try {
        const res = await axios.post("/user/note", note)
        if(res.data.success){
          //TODO: note added 
          console.log("note added ")
        }
      } catch (error) {
        // TODO: log the error
        console.log("Note not save to database login to save it")
        alert("Note not save to database login to save it")
      }
  
      addNote(note)
      setNote({
        title:"",
        content: ""
      })
    }

   
  }

  const expand = () =>{
    setExpanded(true)
  }

  return (
    <div className='note-form'>
         <form className='create-note'>
            {isExpanded && (
              <input 
              type="text" 
              onChange={handleChange}
              name="title"
              value={note.title}
             
              placeholder='Title' />
            )}
                
            <textarea 
            type="text"
            name="content" 
            value={note.content}
            onClick={expand}
            onChange={handleChange}
            placeholder='Take a note...' 
            rows= {isExpanded ? 3: 1}/>
            <Zoom in={isExpanded}>
              <Fab  onClick={submitNote} title="add note"><AddIcon/></Fab>
            </Zoom>
           
          </form>
    </div>
  )
}

export default CreateNote