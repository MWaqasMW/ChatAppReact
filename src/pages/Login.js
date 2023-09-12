import {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.scss';
import logo from "../images/logo-chatapp.png";
import GoogleBtn from '../componets/GoogleBtn'
import Btn  from '../componets/Btn';
import { NavLink , useNavigate } from 'react-router-dom';
import {  signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth ,db} from '../config/firebase';
import Swal from 'sweetalert2/src/sweetalert2.js'
import { setDoc,doc } from 'firebase/firestore';


const Login = () => {

  const [err, seterr]=useState([false])

const navigate = useNavigate();

  let handleLogin=(e)=>{
    e.preventDefault()
    const email =e.target[0].value
    const password =e.target[1].value
    console.log(email,password)
    
    signInWithEmailAndPassword(auth, email, password)
    .then(async(userCredential) => {
     
      const user = userCredential.user;
      console.log("user",user)

 await setDoc(doc(db, "user", user.uid),{})
      navigate('/profile')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error",error);
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
        email:user.email,
        photoURL:user.photoURL,
        uid:user.uid
      });
      await setDoc(doc(db, "userChats", user.uid),{})
      navigate("/profile")
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorMessage,email,credential)
seterr([true])
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
        <p>Login to chat from your friends and enjoy.</p>
      </div>
 

<form onSubmit={handleLogin}>
      <div className="mb-2 row">
        <div className="col-sm-12">
          <input type="text" className="form-control" id="inputEmail" placeholder='UserEmail' />
        </div>
      </div>
      <div className="mb-2 row">

        <div className="col-sm-12">
          <input type="password" className="form-control p-2" id="inputPassword" placeholder='UserPassword' />
        </div>
      </div>

      <Btn text={"Login"}/>
  </form> 
      <div className='lines'>
        <div className='Or-line m-2'></div>
        <div >
          OR
        </div>
        <div className='Or-line m-2'></div>
      </div>

      <GoogleBtn onClick={handleLoginGoogle} />
<div className='login-text'>Don't Have an account?<NavLink to={"/Register"}>Sign Up</NavLink>  </div>
    </div>
  </div>
  )
}

export default Login
