import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const PostContext =createContext()

export const PostContextProvider =({children})=>{
    const [feed, setFeed] = useState(null)
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(false)

    return (
        <PostContext.Provider value={{feed,setFeed,setLoading,loading,post,setPost}}>
            {children}
        </PostContext.Provider>
    )
}

