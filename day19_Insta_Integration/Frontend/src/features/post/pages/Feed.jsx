import { useEffect } from "react"
import Post from "../components/Post"
import { usePost } from "../hooks/usePost"

const Feed = () => {

    const {feed,handleGetFeed,loading} = usePost()

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
            <div className='feed'>
                <div className="posts">
                    {feed.map(post=>{
                        return <Post user={post.user} post={post    } />
                    })}
                </div>
            </div>
        </main>
    )
}

export default Feed