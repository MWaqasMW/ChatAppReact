import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
import imgLogo from "../images/userIcon.jpg"
import { FcCamera } from "react-icons/fc"
import MessageBtn from "../images/message (1).png"
import LogoutBtn from "../images/log-out.png"
import Edit from "../images/edit.png"
import { NavLink, useNavigate } from 'react-router-dom';
import Btn from '../componets/Btn';
import { useContext,useState } from "react";
import { AuthContext } from "../contextapi/Authcontext"
import { signOut } from "firebase/auth";
import { db, auth, storage } from "../config/firebase"
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
const Profile = () => {


  const [err, seterr] = useState([false])
  const [img, setImg] = useState([""])

  const navigate = useNavigate()
  const { currentUser, userData } = useContext(AuthContext)
  const { displayName, photoURL, email, uid,phoneNumber } = currentUser
  
  
  const handleUpdate = async (e) => {
    e.preventDefault()
    try{
    
    const imageUrl = e.target[0].files[0]
    const userName = e.target[1].value
    const userNumber = e.target[2].value
    console.log(imageUrl)



    if (imageUrl) {
      setImg(imageUrl);

      // Display the selected image in the <img> element
      const imgElement = document.getElementById('previewImage');
      imgElement.src = URL.createObjectURL(imageUrl);

    }



    const storageRef = ref(storage, `images/${imageUrl}`)

    const uploadTask = uploadBytesResumable(storageRef, imageUrl);


    uploadTask.on('state_changed',
      (snapshot) => {

        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {

        console.log(error);
      },
      () => {

        try{
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              console.log('File available at', downloadURL);
            const docRef = doc(db, "user", uid);
            try{
  
              await updateDoc(docRef, {
                displayName: userName,
                phoneNumber: userNumber,
                photoURL: downloadURL,
              })
              Swal.fire({
                icon: 'success',
                title: 'Your Ptofile Updated',
                showConfirmButton: false,
                timer: 1500
              })
            }
            catch(err){
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Sorry... Something went wrong!',
                footer: "your Google account not to be update locally"
              })
            }
        
          });
        }catch(error){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Sorry... Something went wrong!',
            footer: error
          })
        }
      }
        );
      }
      
      
    catch(err){
      console.log(err)
    }
}


  const [inputValue, setInputValue] = useState([displayName ? displayName : (userData && userData.displayName)]);
  const [number , setNumber] = useState([[phoneNumber ? phoneNumber : (userData && userData.phoneNumber)]])



  const handleChange = (e) => {
    setInputValue(e.target.value);
  };



  const handleChangeNum=(e)=>{
    setNumber(e.target.value)
  }



















  const handleConfrim = () => {
    Swal && Swal.fire({
      title: 'Are you sure?',
      text: "You will be Logout",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout'
    }).then((result) => {
      if (result.isConfirmed) {

        signOut(auth)
          .then(() => {

          }).catch((error) => {
          })
          .then(() => {
            navigate("/")
          })
          .catch((error) => {
            Swal.fire(
              'Error',
              'An error Operation Failed: ' + error.message,
              'error'
            );
          });
      } else {
        // Swal will be dissmiss 
      }
    });

  }


  return (

    <div className='profile'>

      <div className="card">
        <div className="edit">
          <img data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo" src={Edit} alt='edit' />
        </div>
        <div className='cardTop'>
          <img className="card__img" src={photoURL ? photoURL : (userData && userData.photoURL) ? userData.photoURL : imgLogo} alt='img' width={"120px"} />

        </div>
        <div className="card__title">{displayName ? displayName : (userData && userData.displayName)}</div>
        <div className="card__subtitle">{email }</div>
        <div className="card__subtitle">{phoneNumber ? phoneNumber : (userData && userData.phoneNumber) }</div>
        <div className="btnSec">
          <NavLink to={"/home"}><img src={MessageBtn} alt='messageLogo' /></NavLink>
          <div className='vertical'></div>
          <img src={LogoutBtn} alt='LogoutBtn' onClick={handleConfrim} />
        </div>
      </div>












      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog mainModal">
          <div className="modal-content  card  ">
            <button type="button" className="btn-close outline-none edit" data-bs-dismiss="modal" aria-label="Close"></button>
            <form onSubmit={handleUpdate} className='card'>
              <div className='cardTop'>
                <img className="card__img" id='previewImage' src={imgLogo} alt='img' width={"120px"} />
                <label htmlFor='file' ><FcCamera /></label>
                <input type='file' className='d-none' id="file" />
              </div>

              <div className="mt-4">
                <input type="text" onChange={handleChange} value={inputValue} className="form-control" id="recipient-name" placeholder='UserName' />
              </div>
              <div className="mt-4 row">
                <div className="col-sm-12">

                  <input type="number" onChange={handleChangeNum}  value={number}  className="form-control p-2" id="inputNumber" placeholder='UserNumber' />
                </div>
              </div>
              <div className="modal-footer mt-4  ">
                <Btn text={"Update"} />
              </div>
            </form>

          </div>
        </div>
      </div>



    </div>
  )
}
export default Profile


