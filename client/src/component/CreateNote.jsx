import React, {useContext, useState} from 'react'
import { notesContext } from '../context/notesContext'
import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';
import { Zoom } from '@mui/material';
import axios from 'axios';
import { toastOptions } from '../toastOption';
import { toast } from 'react-toastify';
import { apiEndPoint } from '../api';
import { getToken } from '../appCookie';


const CreateNote = () => {
  
  const [isExpanded, setExpanded] = useState(false)

  /** constant to track of title and content*/
  const {addNote, userInfo} = useContext(notesContext)
  
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
      toast.error("Both field are required!", toastOptions)
    } else {
      try {
        const res = await axios.post(`${apiEndPoint}/user/note`, note , {
          headers: {
            'Authorization': `Bearer ${getToken()}`}
        })
        if(res.data.success){
          toast.success("note added", toastOptions)
        }
      } catch (error) {
        toast("note added but not save. Login to save", toastOptions)
 
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
    !userInfo && toast("Login or SignUp to save your note!", toastOptions)
    
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