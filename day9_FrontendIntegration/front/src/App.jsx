import React, { useEffect, useState } from 'react'
import axios from "axios"

const App = () => {

  const [notes, setNotes] = useState([
    {
        title:"test 1",
        description:"desc 1"
    }
])


const fetchNotes=()=>{
  axios.get("http://localhost:3000/api/notes")
  .then((res)=>{
    setNotes(res.data.notes)
  }) 
}


  function submitHandler(e){
      e.preventDefault()

      const {title,description} = e.target.elements
      console.log("submitted")
      console.log(title.value,description.value)

      axios.post("http://localhost:3000/api/notes",{
        title:title.value,
        description:description.value
      })
      .then((res)=>{
        console.log(res.data)

        fetchNotes()
      })
  }

  function deleteHandlerNotes(noteId){
    axios.delete(`http://localhost:3000/api/notes/${noteId}`)
    .then((res)=>{
      console.log(res.data)
      fetchNotes()
    })
  }

  useEffect(()=>{
    fetchNotes()
  },[])

  return (
    <div>

      <form className='note-create-form' onSubmit={submitHandler}>
        <input name='title'
         type="text" placeholder='enter title' />
        <input name='description' type="textarea" placeholder='enter description' />
        <button>Create</button>
      </form>

      <div className="notes">
        {notes.map((note,idx)=>{
          return  <div key={idx} className="note">
                    <h1>{note.title}</h1>
                    <p>{note.description}</p>
                    <button onClick={()=>{deleteHandlerNotes(note._id)}}>Delete</button>
                  </div>
        })}
      </div>
    </div>
  )
}

export default App