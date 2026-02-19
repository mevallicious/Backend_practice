import React from 'react'
import "../styles/form.scss"
import { useState } from 'react'
import { Link } from "react-router";
import axios from "axios";

const Register = () => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleSubmit(e){
        e.preventDefault()

        axios.post("http://localhost:3000/api/auth/register",{
            username,
            email,
            password
        },{
            withCredentials:true
        })
        .then(res=>{
            console.log(res.data)
        })
    }

  return (
    <main>
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                <input 
                    value={username}
                    onInput={(e)=>setUsername(e.target.value)}
                    type="text" 
                    placeholder='enter username' />
                <input 
                    value={email} 
                    onInput={(e)=>{setEmail(e.target.value)}}
                    type="email" 
                    placeholder='enter email' />
                <input 
                    value={password}
                    onInput={(e)=>setPassword(e.target.value)}
                    type="password" 
                    placeholder='enter password' />
                <button>Register</button>
            </form>
            <p>Already have and account? <Link to={"/login"}>Login</Link></p>
        </div>
    </main>
  )
}

export default Register