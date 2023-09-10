import React from 'react'
import "./Btn.css"
import 'bootstrap/dist/css/bootstrap.min.css';

const Btn = (props) => {
    const {text}= props
  return (
    <div>
      <button className='button'>{text}</button>
    </div>
  )
}

export default Btn
