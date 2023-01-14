import React, {useContext, useState} from 'react'
import { notesContext } from '../context/notesContext'
import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';
import { Zoom } from '@mui/material';


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
    // setNote({
    //     ...note,
    //     [name]: value
    // } )

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      }
    })
   
  }
  
 /** Pass the new note back to the app */
  const submitNote = (event) => {
    event.preventDefault()
    addNote(note)
    setNote({
      title:"",
      content: ""
    })
  }

  const expand = () =>{
    setExpanded(true)
  }

  return (
    <div>
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
            <Fab  onClick={submitNote}><AddIcon/></Fab>
            </Zoom>
           
            </form>
    </div>
  )
}

export default CreateNote