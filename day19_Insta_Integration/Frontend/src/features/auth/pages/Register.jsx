import "../styles/form.scss"
import { useState } from 'react'
import { Link } from "react-router";
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from "react-router";

const Register = () => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const {handleRegister,loading}=useAuth()

    async function handleSubmit(e){
        e.preventDefault()

        await handleRegister(username,email,password)
        navigate("/")
    }

    if(loading){
        return <main>
            <h1>USER IS BEING REGISTERED</h1>
        </main>
    }

  return (
    <main>
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                <input 
                    required
                    value={username}
                    onInput={(e)=>setUsername(e.target.value)}
                    type="text" 
                    placeholder='enter username' />
                <input 
                    required
                    value={email} 
                    onInput={(e)=>{setEmail(e.target.value)}}
                    type="email" 
                    placeholder='enter email' />
                <input 
                    required
                    value={password}
                    onInput={(e)=>setPassword(e.target.value)}
                    type="password" 
                    placeholder='enter password' />
                <button className='button primary-button'>Register</button>
            </form>
            <p>Already have and account? <Link to={"/login"}>Login</Link></p>
        </div>
    </main>
  )
}

export default Register