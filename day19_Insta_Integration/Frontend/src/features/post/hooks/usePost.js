    import { PostContext } from "../post.context";
    import { useContext, useEffect } from "react";
    import { createPost, getFeed, likePost, unLikePost } from "../services/post.api";

    export const usePost = () =>{

        const context =useContext(PostContext)

        const {post,feed,setFeed,loading,setLoading} = context

        const handleGetFeed = async ()=>{
            setLoading(true)
            const data =await getFeed()
            setFeed(data.posts)
            setLoading(false)
        }

        const handleCreatePost = async(imageFile,caption)=>{
            setLoading(true)
            const data =await createPost(imageFile,caption)
            setFeed([data.post,...feed])
            setLoading(false)
        }

        const handleLike = async(post)=>{
            await likePost(post)
            await handleGetFeed()
        }
        
        const handleUnLike = async(post)=>{
            await unLikePost(post)
            await handleGetFeed()
        }

        useEffect(()=>{
            handleGetFeed()
        },[])

        return {loading,post,feed,handleGetFeed,handleCreatePost,handleLike,handleUnLike}
    }


