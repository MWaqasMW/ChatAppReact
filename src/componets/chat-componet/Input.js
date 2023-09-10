import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiOutlinePaperClip } from "react-icons/ai"
import { BsFillSendFill } from "react-icons/bs"
const Input = () => {
  return (
    <div className='msgInputs'>

      <label htmlFor="file"><span className='fs-4 ' role="button"><AiOutlinePaperClip />
      </span></label><input type='file' className='d-none' id="file" />
      <input type='text' placeholder='Write Something...' />
      <div className='sendOpt'>
        <span><button><BsFillSendFill /></button></span>
      </div>
    </div>
  )
}

export default Input
