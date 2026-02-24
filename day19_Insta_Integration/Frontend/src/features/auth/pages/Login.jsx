import React from 'react'
import "../styles/form.scss"
import { useState } from 'react'
import { Link } from "react-router";
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router';

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const {handleLogin,loading} =useAuth()
    const navigate= useNavigate()

    if(loading){
        return(
            <h1>Loading..</h1>
        )
    }

    async function handleSubmit(e){
        e.preventDefault()

        handleLogin(username,password)
        .then(res=>{
            console.log(res)
            navigate("/")
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
                <p>Already have an account? <Link to={"/register"}>Register</Link></p>
        </div>
    </main>
  )
}

export default Login