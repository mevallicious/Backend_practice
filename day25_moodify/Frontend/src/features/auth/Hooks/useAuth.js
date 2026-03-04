import { useContext } from "react";
import { register,login,getMe,logout } from "../services/auth.api";
import { AuthContext } from "../auth.context";
import { useEffect } from "react";


export const useAuth = ()=>{
    const context=useContext(AuthContext)

    const {user,setUser,loading,setLoading} = context

    async function handleRegister({email,password,username}){
        setLoading(true)
        const data = await register({email,password,username})
        setUser(data.user)
        setLoading(false)
    }
    async function handleLogin({email,password,username}){
        setLoading(true)
        const data = await login({email,password,username})
        setUser(data.user)
        setLoading(false)
    }
    async function handleGetUser(){
        setLoading(true)
        const data = await getMe()
        setUser(data.user)
        setLoading(false)
    }
    async function handleLogout(){
        setLoading(true)
        await logout()
        setUser(null)
        setLoading(false)
    }

    useEffect(()=>{
        handleGetUser() //hydration kardega 
    },[])

    return {handleGetUser,handleLogin,handleLogout,handleRegister,user,loading}
}