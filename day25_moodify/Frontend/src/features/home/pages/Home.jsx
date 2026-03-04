import React from 'react'
import FaceExpression from '../../expression/pages/FaceExpression'
import Player from '../components/Player'
import { useSong } from '../hooks/useSong'


const Home = () => {

    const {handleGetSongs} = useSong()

  return (
    <>
        <FaceExpression onClick={(expression)=>{handleGetSongs({mood:expression})}}/>
        <Player/>
    </>
  )
}

export default Home