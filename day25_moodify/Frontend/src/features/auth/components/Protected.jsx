import React from 'react'
import { useAuth } from '../Hooks/useAuth'
import {Navigate} from "react-router"

// this is made for as if agar koi user login ya register hai toh hi access karpaye home page and for that protected component banaaya hai 
//and phir app.routes.jsx main home ko wrap kardo protected se   

const Protected = ({children}) => {

    const {user,loading} =useAuth()


    if(loading){
        return <h1>Loading..</h1>
    }

    if(!loading && !user){
        return <Navigate to="/login" />
    }

    return (
        children
    )
}

export default Protected 