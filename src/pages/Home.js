import React, { useContext } from 'react'
import Sidebar from '../componets/chat-componet/Sidebar'
import Chat from '../componets/chat-componet/Chat'
import "./style.scss"
const Home = () => {

  return (
    <div className='home'>
      <div className='mainChatContainor'>
       <Sidebar/>
       <Chat/>
      </div>
    </div>
  )
}

export default Home
