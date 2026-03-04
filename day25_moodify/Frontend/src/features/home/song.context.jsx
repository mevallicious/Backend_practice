/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from "react";

export const SongContext = createContext()

export const SongContextProvider = ({children})=>{
    const [song, setSong] = useState(
        { 
            "songUrl": "https://ik.imagekit.io/wc7ak3mbr/cohort-2/moodify/songs/Lutt_Le_Gaya_-_PagalNew_SO3vs9_g5.mp3",
            "posterUrl": "https://ik.imagekit.io/wc7ak3mbr/cohort-2/moodify/posters/Lutt_Le_Gaya_-_PagalNew_qe2aMIVq9.jpeg",
            "title": "Lutt Le Gaya - PagalNew",
            "mood": "surprised",
        })
    const [loading, setLoading] = useState(false)

    return (
        <SongContext.Provider value={{song,setSong,loading,setLoading}}>
            {children}
        </SongContext.Provider>
    )
}