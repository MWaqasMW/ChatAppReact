// import React from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import {FaEllipsis} from 'react-icons/fa6'
// import {BsFillCameraVideoFill} from 'react-icons/bs'
// import {AiOutlineArrowLeft} from 'react-icons/ai'
// import Message from './Message';
// import Input from './Input';
// const Chat = () => {


//   return (
//     <div className='chat'> 
//     <div className='chatTop '>
//       <div className='d-flex align-items-center gap-2'>
//   <span className='d-none'><AiOutlineArrowLeft/></span><img  src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMvHFhNnMfyhZrz8vkkVA1XkaJojTp7OUw4QYA4enWgg&s' alt=''/>
//         <span> Waqas</span>
//       </div> 
//    <div className='d-flex gap-3'>
//     <span><BsFillCameraVideoFill/></span>
//     <span>< FaEllipsis/></span>
//    </div>
//     </div>
// <Message/>
// <Input/>

//     </div> 
//   )
// }

// export default Chat

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaEllipsis } from 'react-icons/fa6';
import { BsFillCameraVideoFill } from 'react-icons/bs';
import { AiOutlineArrowLeft } from 'react-icons/ai';


import Message from './Message';
import Input from './Input';

const Chat = ({ selectedUser ,handleSelect }) => {
  console.log(selectedUser,handleSelect)
  return (
    <div className='chat'>
      <div className='chatTop'>
        <div className='d-flex align-items-center gap-2'>
          <span className='d-none'><AiOutlineArrowLeft /></span>
          <img src={selectedUser ? selectedUser.photoURL : ''} alt='img' />
          <span>{selectedUser ? selectedUser.displayName : ''}</span>
        </div>
        <div className='d-flex gap-3'>
          <span><BsFillCameraVideoFill /></span>
          <span><FaEllipsis /></span>
        </div>
      </div>
      <Message />
      <Input />
    </div>
  );
}

export default Chat;



