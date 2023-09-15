import React, { useContext } from 'react'
import { useUserInfo } from '../../contextapi/UserInfoContext';
import { AuthContext } from '../../contextapi/Authcontext';
import imgLogo from '../../images/profile-icon.png'
import { useChats } from '../../contextapi/Chatscontext';
const Message = () => {
const {userData} = useContext(AuthContext)
const { userInfo } = useUserInfo();
const { chats } = useChats();








const keys = Object.keys(userInfo);
let User;
if (keys.length === 0) {
  User= false;

} else {
  User= userInfo;
  
}
  return (
    <div className='messages '>
      <div className='message '>
        <div className='msgDetail'>
          <img src={(User && User[0].SelectUserInfo.photoURL) ||imgLogo} alt='logo' />    <div className='time'>Just now</div>
        </div>
        <div className='msgContent'>
          <p>Hello world</p>
          <img src=''/>
        </div>
      </div>

  
      <div className='message owner'>
        <div className='msgDetail'>
        <img src={imgLogo} alt='logp' />    <div className='time'>Just now</div>
        </div>
        <div className='msgContent'>
          <p>Hello world</p>
        </div>
    </div>
    </div>
  )
}

export default Message
