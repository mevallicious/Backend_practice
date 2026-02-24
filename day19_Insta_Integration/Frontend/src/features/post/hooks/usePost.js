import { PostContext } from "../post.context";
import { useContext } from "react";
import { getFeed } from "../services/post.api";

export const usePost = () =>{

    const context =useContext(PostContext)

    const {post,feed,setFeed,loading,setLoading} = context

    const handleGetFeed = async ()=>{
        setLoading(true)

        const data =await getFeed()
        setFeed(data.posts)

        setLoading(false)
    }

    return {loading,post,feed,handleGetFeed}
}