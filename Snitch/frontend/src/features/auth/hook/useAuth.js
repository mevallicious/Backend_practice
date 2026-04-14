import { setError,setLoading,setUser } from "../store/auth.slice";
import { registerUser,loginUser } from "../service/auth.api";
import { useDispatch } from "react-redux";

export const useAuth = () => {
    const dispatch = useDispatch();
    
    async function handleRegister({email,contact,password,fullname,isSeller=false}){
        
            dispatch(setLoading(true))
            const response = await registerUser({email,contact,password,fullname,isSeller})
            dispatch(setUser(response.data))
            dispatch(setLoading(false))
        
    }

    async function handleLogin({email,password}){
        dispatch(setLoading(true))
        const response = await loginUser({email,password})
        dispatch(setUser(response.data))
        dispatch(setLoading(false))
    }

    return {handleRegister, handleLogin}
}