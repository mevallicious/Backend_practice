import React, { useRef, useState } from 'react'
import "../styles/createpost.scss"
import { usePost } from '../hooks/usePost'
import { useNavigate } from "react-router";

const CreatePost = () => {

    const [caption, setCaption] = useState("")

    const postImageInputFieldRef = useRef(null)

    const {loading,handleCreatePost} =usePost()

    const navigate =useNavigate()
    
    const handleSubmit = async (e)=>{
        e.preventDefault()

        const file =postImageInputFieldRef.current.files[0]  // 1 input file ke andar multifile select ho sakti hai so we are using only the first file
    
        await handleCreatePost(file,caption)

        navigate("/")
    }

    if(loading){
        return <main>
            <h1>creating post...</h1>
        </main>
    }

  return (
    <main className='create-post-page'>
        <div className='form-container'>
            <h1>Create Post</h1>
            <form onSubmit={handleSubmit}>
                <label className='post-image-label' htmlFor="postImage">Select Image</label>
                <input ref={postImageInputFieldRef} type="file" hidden name='postImage' id='postImage' />
                <input 
                    value={caption}
                    onInput={(e)=>{
                        setCaption(e.target.value)
                    }}
                    type="text" 
                    placeholder='Enter Caption' id='caption' />
                <button className='button primary-button'>Create Post</button>
            </form>
        </div>
    </main>
  )
}

export default CreatePost