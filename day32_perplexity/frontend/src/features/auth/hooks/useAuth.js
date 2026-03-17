import { useDispatch } from "react-redux";
import { loginUser,registerUser,getUser } from "../services/auth.api";
import { setUser,setLoading,setError } from "../auth.slice";

export function useAuth(){

    const dispatch = useDispatch()

    async function handleRegister({email,username,password}){
        try{
            dispatch(setLoading(true))
            const data= await registerUser({email,username,password})
        }catch(error){
            dispatch(setError(error.response?.data?.message || "Registration Failed"))
        }finally{
            dispatch(setLoading(false))
        }
    }

    async function handleLogin({email,username,password}){
        try{
            dispatch(setLoading(true))
            const data= await loginUser({email,username,password})
            dispatch(setUser(data))
        }catch(error){
            dispatch(setError(error.response?.data?.message || "Registration Failed"))
        }finally{
            dispatch(setLoading(false))
        }
    }

    async function handleGetMe(){
        try{
            dispatch(setLoading(true))
            const data= await getUser()
            dispatch(setUser(data.user))
        }catch(error){
            dispatch(setError(error.response?.data?.message || "Registration Failed"))
        }finally{
            dispatch(setLoading(false))
        }
    }

    return{
        handleRegister,
        handleLogin,
        handleGetMe
    }
}

