import React,{useState} from 'react'
import FormGroup from '../components/FormGroup'
import "../styles/register.scss"
import {Link} from "react-router"
import { useAuth } from '../Hooks/useAuth'
import { useNavigate } from "react-router";


const Register = () => {

    const {loading,handleRegister} = useAuth()

    const navigate =useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")

    async function handleSubmit(e){
        e.preventDefault()

        await handleRegister({ email, password, username });
            navigate("/"); 
    }

  return (
    <div className="register-page">
        <div className="form-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <FormGroup
                    value={username}
                    onChange={(e)=>{setUsername(e.target.value)}}
                    label="Username"    
                    placeholder="Enter your username" />
                <FormGroup 
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                    label="Email"
                    placeholder="Enter your email" />
                <FormGroup 
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                    label="Password" 
                    placeholder="Enter your password" />
                <button className='button' type='submit'>Register</button>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </form>
        </div>
    </div>
  )
}

export default Register