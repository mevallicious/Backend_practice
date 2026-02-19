import React from 'react'
import "../styles/form.scss"
import { useState } from 'react'
import { Link } from "react-router";
import axios from "axios";

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    async function handleSubmit(e){
        e.preventDefault()

        axios.post("http://localhost:3000/api/auth/login",{
            username,
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
                <h1>Login</h1>
                <input 
                    value={username}
                    onInput={(e)=>{setUsername(e.target.value)}}
                    type="text" 
                    placeholder='enter name'/>
                <input  
                    value={password}
                    onInput={(e)=>{setPassword(e.target.value)}}
                    type="password" 
                    placeholder='enter name' />
                <button>Login</button>
            </form>
                <p>Already have and account? <Link to={"/register"}>Register</Link></p>
        </div>
    </main>
  )
}

export default Login