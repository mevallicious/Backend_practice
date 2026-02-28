    import { useEffect } from "react"
    import Post from "../components/Post"
    import { usePost } from "../hooks/usePost"
    import Navbar from "../../shared/components/Navbar"

    const Feed = () => {

        const {feed,handleGetFeed,loading,handleLike,handleUnLike} = usePost()

        useEffect(()=>{
            handleGetFeed()
        // eslint-disable-next-line react-hooks/exhaustive-deps
        },[])

        if(loading || !feed){
            return  <main>
                        <h1>Loading...</h1>
                    </main>
        }

        console.log(feed)

        return (
            <main className='feedPage'>
                <Navbar/>
                <div className='feed'>
                    <div className="posts">
                        {feed.map(post=>{
                            return <Post user={post.user} post={post} handleLike={handleLike} loading={loading} handleUnLike={handleUnLike} />
                        })}
                    </div>
                </div>
            </main>
        )
    }

    export default Feed