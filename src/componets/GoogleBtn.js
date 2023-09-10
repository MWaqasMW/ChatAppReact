import React from 'react'
import googleLogo from '../images/logo-google.png'
import  './GoogleBtn .css'
const GoogleBtn = (props) => {
  return (
    <div>

      <button className='googleBtn' onClick={props.onClick}><img src={googleLogo} alt='logo.png' width={"20px"}/>Continue with Google</button>
    </div>
  )
}

export default GoogleBtn 
