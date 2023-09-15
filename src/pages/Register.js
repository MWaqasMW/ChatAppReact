import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';
import logo from "../images/logo-chatapp.png";
import GoogleBtn from '../componets/GoogleBtn'
import Btn from '../componets/Btn';
import { NavLink,useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword,signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth,db } from '../config/firebase';
import { doc, setDoc } from "firebase/firestore"; 
import Swal from 'sweetalert2/src/sweetalert2.js'


const Register = () => {
  const [err, seterr]=useState([false])
  const navigate = useNavigate();
// console.log(navigate)
  const handleSubmint = (e) => {
    e.preventDefault()

   const Uname=e.target[0].value
   const Number=  e.target[1].value
   const email= e.target[2].value
   const password=  e.target[3].value



   createUserWithEmailAndPassword(auth, email, password)
   .then(async(userCredential) => {
     // Signed in 
     const user = userCredential.user;
     await setDoc(doc(db, "user", user.uid), {
        displayName:Uname,
        phoneNumber:Number,
        email:email,
        password:password,
        uid:user.uid
        
      });
      console.log(user.uid)
      navigate('/');
      console.log("added")
      
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error",error)
      seterr([true])
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: error
      })
    });
   
  }
  const handleLoginGoogle=()=>{
    const provider = new GoogleAuthProvider(); // GoogleAuthProvider object



    signInWithPopup(auth, provider)
    .then(async(result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;

      await setDoc(doc(db, "user", user.uid), {
        displayName:user.displayName,
        phoneNumber:user.phoneNumber,
        photoURL:user.photoURL,
        email:user.email,
        uid:user.uid

      });
 await setDoc(doc(db, "user", user.uid),{})
      navigate('/profile');
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorMessage,email,credential)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: error
      })
    });
    
  }






  return (
    <div className='main'>
      <div className='foamContanor'>
        <div className='d-flex'>
          <img src={logo} alt='Logo' width={"150px"} className='logo' />
        </div>
        <div className='text'>
          <p>Sign up to chat from your friends and enjoy.</p>
        </div>
        <GoogleBtn onClick={handleLoginGoogle} />
        <div className='lines'>
          <div className='Or-line m-2'></div>
          <div >
            OR
          </div>
          <div className='Or-line m-2'></div>
        </div>
        <form onSubmit={handleSubmint}>
          <div className="mb-2  row">
            <div className="col-sm-12 ">
              <input type="text" className="form-control p-12" id="inputName" placeholder='UserName' required/>
            </div>
          </div>
          <div className="mb-2 row">
            <div className="col-sm-12">
              <input type="number" className="form-control p-2" id="inputNumber" placeholder='UserNumber' required />
            </div>
          </div>
          <div className="mb-2 row">
            <div className="col-sm-12">
              <input type="text" className="form-control" id="inputEmail" placeholder='UserEmail' required/>
            </div>
          </div>
          <div className="mb-2 row">
            <div className="col-sm-12">
              <input type="password" className="form-control p-2" id="inputPassword" placeholder='UserPassword' required />
            </div>
          </div>
          <div className='textEnd'>By signing up, you agree to our Terms , Privacy Policy and Cookies Policy .</div>
          <Btn text={"Sign Up"} />
        </form>
        <div className='login-text'>Have an account? <NavLink to={"/"}>Login</NavLink></div>
        <span><NavLink to={"/home"}>Chat</NavLink></span>
      </div>
    </div>
  )
}

export default Register
