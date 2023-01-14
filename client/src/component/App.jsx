import React, { useState } from 'react'
import Footer from './Footer'
import Header from "./Header"
import Note from "./Note"

import CreateNote  from './CreateNote'
import { notesContext } from '../context/notesContext'

const App = () => {
  
  const [notes, setNotes] = useState([])
  /** note add function -- */
  function addNote(note){
    setNotes(prevNotes => {
      return [
        ...prevNotes,
        note
      ]
    })
  }

  /** note delete */
  function noteDelete(id){
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) =>{
        return index !==id
      })
    })
  }
  return (
    <>
     <Header/> 
     <notesContext.Provider value={{notes, setNotes, addNote,noteDelete }}>
        <CreateNote/>
        {
      notes.map((note, index) => {
        return (
          <Note id={index} key={index} note={note}
          />
        )
      })
     }
     </notesContext.Provider>
    
    
     <Footer/>
    </>
   
  )
}

export default App