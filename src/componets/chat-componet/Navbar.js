import React,{useContext} from 'react'
import { BiArrowBack } from "react-icons/bi";
import { AuthContext } from '../../contextapi/Authcontext';
import imgLogo from '../../images/profile-icon.png'
import { NavLink } from 'react-router-dom';
const Navbar = () => {
  
  const { currentUser, userData } = useContext(AuthContext)
  const { displayName, photoURL, email, uid,phoneNumber } = currentUser
  return (
    <div className='navbar'>
      <div>
        <img className='UserLogo' src={photoURL ? photoURL : (userData && userData.photoURL) ? userData.photoURL : imgLogo} alt='logo'/>
        <span className='UserName'>{displayName ? displayName : (userData && userData.displayName)}</span>
      </div>
      <div >
     <NavLink to={"/profile"}>  <button className='logoutBtn'><BiArrowBack/></button></NavLink> 
      </div>


    </div>
  )
}

export default Navbar
