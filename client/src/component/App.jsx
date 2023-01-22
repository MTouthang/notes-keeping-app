import React, { useState, useEffect } from 'react'
import Header from "./Header"
import Note from "./Note"
import CreateNote  from './CreateNote'
import { notesContext } from '../context/notesContext'
import axios from 'axios'
import { Button } from '@mui/material'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastOptions } from '../toastOption'
import { apiEndPoint } from '../api'



const App = () => {
  const [notes, setNotes] = useState([])
  const [searchNote, setSearchNote] = useState()
  const [userInfo, setUserInfo] = useState()

 
  // user flag
  let userNa = true

  const getAllNotes = async () => {

    try {
      const res = await axios.get(`${apiEndPoint}/user/notes`, {
       headers: {'Authorization': `Bearer ${document.cookie.slice(6)}`}
    });
      
      if(res.data.success){
        setNotes(res.data.notes)
      }
    } catch (error) {
      toast.error(error.response.data.message, toastOptions)
    }
  };

  // get userInfo
  const getUserInfo = async () => {
    try {
      const res = await axios.get(`${apiEndPoint}/auth/user/info`, {
        headers: {
          'Authorization': `Bearer ${document.cookie.slice(6)}`}
      });
    
      if(res.data.success){
       setUserInfo(res.data.data)
     
      }
    } catch (error) {
      toast.error("Login first!", toastOptions)
    }
  };
  if(document.cookie.includes("token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9")){
    userNa = false
  }
  
  
  useEffect(() => {
    if(document.cookie.includes("token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9")){
      // cookie present flag
      
      getUserInfo()
      getAllNotes()
    }
  }, [])

  /** note add function -- */
  function addNote(note){
    setNotes(prevNotes => {
      return [
        ...prevNotes,
        note
      ]
    })
    if(userInfo){
      getAllNotes()
    }
  }

  /** note delete */
  const noteDelete =async (id) => {
    // request to delete note
    if(userInfo){
      try {
        const res = await axios.delete(`${apiEndPoint}/user/note/${id}`,  {
          headers: {
            'Authorization': `Bearer ${document.cookie.slice(6)}`}
        })
        console.log(res.data.message)
        if(res.data.success){
          toast.success("Note deleted", toastOptions)
        }
      } catch (error) {
        toast.error("Note not able to delete", toastOptions)
      }
    } 
 
    setNotes(prevNotes => {
      !userInfo && toast.success("note deleted locally!", toastOptions)
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
   
    if(userInfo){
      getAllNotes()
    }
  }

  // search features
  const searchFunction = async(item) => {
    try {
      const res = await axios.get(`${apiEndPoint}/user/note?title=${item}`, {
        headers: {
          'Authorization': `Bearer ${document.cookie.slice(6)}`}
      })
      if(res.data.success){
      
         setSearchNote(res.data.note)
      }
    } catch (error) {
      toast("Unable to search notes")
    }
  }
 

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        />
      <ToastContainer />

        <notesContext.Provider value={{notes, setNotes, addNote,noteDelete, setSearchNote, searchNote, searchFunction, userInfo }}>
        <Header userNa={userNa} /> 
          { 
            searchNote ? " ":  <CreateNote/>
          }
          <div className='note-list-toggle'> 
            { searchNote && <Button disabled> All search notes! </Button> }
            
            <span className='all-notes-button'>
              {searchNote ? 
                 <Button  onClick={() => window.location.reload()} 
                 > All Notes</Button> : <Button onClick={() => window.location.reload()} disabled
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
                      <Note id={note._id ? note._id : index} key={index} note={note}
                      />
                      </>
                    )
                  })
                ) : 
                (
                  notes.map((note, index) => {
                    return (
                      <Note id={note._id ? note._id : index} key={index} note={note}
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