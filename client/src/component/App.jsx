import React, { useState, useEffect } from 'react'
import Header from "./Header"
import Note from "./Note"
import CreateNote  from './CreateNote'
import { notesContext } from '../context/notesContext'
import axios from 'axios'
import { Button } from '@mui/material'


const App = () => {
  const [notes, setNotes] = useState([])
  const [searchNote, setSearchNote] = useState()


 
  /** check for cookies and load page */
  let userNa = true
  const getAllNotes = async () => {
    try {
      const res = await axios.get("/user/notes");
    
      if(res.data.success){
        setNotes(res.data.notes)
      }
    } catch (error) {
      //TODO: 1 login first
      alert(error.response.data.message)
    }
  };
  if(document.cookie){
    // cookie present flag
    userNa = false
  }

  
  useEffect(() => {
    getAllNotes()
  }, [])

  /** note add function -- */
  function addNote(note){
    setNotes(prevNotes => {
      return [
        ...prevNotes,
        note
      ]
    })
    getAllNotes()
  }

  /** note delete */
  const noteDelete =async (id) => {
  
    // request to delete note
    try {
      const res = await axios.delete(`/user/note/${id}`)
      console.log(res.data.message)
    } catch (error) {
      //TODO: 2 change alert 
      console.log(error)
    }
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) =>{
        return index !==id
      })
    })

    if(searchNote){
      setSearchNote( prev => {
        return prev.filter((item, index) => {
          
          return item._id !== id
        })
      })
    }
   
   getAllNotes()
  
  }


  // search features
  const searchFunction = async(item) => {
    try {
      const res = await axios.get(`/user/note?title=${item}`)
      if(res.data.success){
        console.log(res.data.note)
         setSearchNote(res.data.note)
      }
    } catch (error) {
   
      // TODO: display smothly
      console.log("note items note able to search")

    }
  }
  

  return (
    <>
    
     
        <notesContext.Provider value={{notes, setNotes, addNote,noteDelete, setSearchNote, searchNote, searchFunction }}>
        <Header userNa={userNa} /> 
          { 
            searchNote ? " ":  <CreateNote/>
          }
          <div className='note-list-toggle'> 
            { searchNote && <Button disabled> All search notes! </Button> }
            
            <span>
              {searchNote ? 
                 <Button onClick={() => window.location.reload()} 
                 >All Notes </Button> : <Button onClick={() => window.location.reload()} disabled
                 >All Notes </Button> 
              }
              {
                (notes && notes.length === 0) && <p> No Notes Available</p>
              }

              {
                (searchNote && searchNote.length === 0) && <p> No matching search notes found!</p>
              }

             
            </span> 
          
          </div>
          
          <div className='n-container'>
    
             {
              searchNote ? 
                (  
                  searchNote.map((note, index) => {
                    return (
                      <>
                      <Note id={note._id} key={index} note={note}
                      />
                      </>
                      
                    )
                  })
                ) : 
                (
                  notes.map((note, index) => {
                    return (
                      <Note id={note._id} key={index} note={note}
                      />
                    )
                  })
                )

              
             }
          </div>
        
      

        </notesContext.Provider>
      
    </>
   
  )
}

export default App