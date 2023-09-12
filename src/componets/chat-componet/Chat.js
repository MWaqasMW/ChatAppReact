import React, { useContext, useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {FaEllipsis} from 'react-icons/fa6'
import {BsFillCameraVideoFill} from 'react-icons/bs'
import {AiOutlineArrowLeft} from 'react-icons/ai'
import Message from './Message';
import Input from './Input';
import { useUserInfo } from '../../contextapi/UserInfoContext';
import imgLogo from '../../images/userIcon.jpg'
import { AuthContext } from '../../contextapi/Authcontext';
const Chat=()=>{
  
  const { userInfo } = useUserInfo();
  const keys = Object.keys(userInfo);
  let User;
  if (keys.length === 0) {
    User= false;

  } else {
    User= userInfo;
    
  }

  
  
  
  
  

    console.log(User)
  return (
    <div className='chat'> 
    <div className='chatTop '>
      <div className='d-flex align-items-center gap-2'>
  <span className='d-none'><AiOutlineArrowLeft/></span><img  src={(User && User[0].SelectUserInfo.photoURL) ||imgLogo} alt=''/>
        <span>{(User && User[0].SelectUserInfo.displayName) || "unknown"}</span>
      </div> 
   <div className='d-flex gap-3'>
    <span><BsFillCameraVideoFill/></span>
    <span>< FaEllipsis/></span>
   </div>
    </div>
<Message/>
<Input/>

    </div> 
  )
}

export default Chat
