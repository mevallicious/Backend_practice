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
    console.log("submitted")
    axios.delete(`http://localhost:3000/api/notes/${noteId}`)
    .then((res)=>{
      console.log(res.data)
      fetchNotes()
    })
  }

  function handleUpdateNote(noteId) {
  const newDescription = prompt("Enter new description");
    console.log("submitted")
  axios.patch(`http://localhost:3000/api/notes/${noteId}` ,
    { description: newDescription }
  )
  .then((res) => {
    console.log(res.data);
    fetchNotes();
  });
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
                      <div className="button-div">
                        <button className='delete-btn' onClick={()=>{deleteHandlerNotes(note._id)}}>Delete</button>
                        <button className='update-btn' onClick={()=>{handleUpdateNote(note._id)}}>Update</button>
                      </div>
                  </div>
        })}
      </div>
    </div>
  )
}

export default App