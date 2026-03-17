import axios from "axios"

const api = axios.create({
    baseURL:"http://localhost:3000",
    withCredentials:true
})

export async function registerUser({username,email,password}){
    const response = await api.post("/api/auth/register",{
        username,email,password
    })
    return response.data
}

export async function loginUser({username,email,password}){
    const response = await api.post("/api/auth/login",{
        username,email,password
    })
    return response.data
}

export async function getUser(){
    const response = await api.get("/api/auth/get-me")
    return response.data
}

export async function verifyUser(){
    const response = await api.get("/api/auth/verify-email")
    return response.data
}


