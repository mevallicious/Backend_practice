import { SongContext } from "../song.context";
import { getSongs } from "../services/song.api";
import { useContext } from "react";

export const useSong = ()=>{
    const context = useContext(SongContext)
    
    const {song,setSong,loading,setLoading} =context

    async function handleGetSongs({mood}){
        setLoading(true)
        const data = await getSongs({mood})
        setSong(data.song)
        setLoading(false)
    }

    return {loading,song,handleGetSongs}
}