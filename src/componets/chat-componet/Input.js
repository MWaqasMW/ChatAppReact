import React, { useContext, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiOutlinePaperClip } from "react-icons/ai"
import { BsFillSendFill } from "react-icons/bs"
import { useUserInfo } from '../../contextapi/UserInfoContext';
import { doc, updateDoc, arrayUnion, arrayRemove, Timestamp} from "firebase/firestore";
import { ref,uploadBytesResumable,getDownloadURL } from 'firebase/storage';
import { storage } from '../../config/firebase';
import Swal from 'sweetalert2';
import { db } from '../../config/firebase';
import { v4 as uuid } from 'uuid';
import { AuthContext } from '../../contextapi/Authcontext';
const Input = () => {

  const { userInfo } = useUserInfo();
  const { currentUser, userData } = useContext(AuthContext)

  const [text, setText]=useState([""]);
  const[img, setImg]=useState(null)
  const keys = Object.keys(userInfo);
  let User;
  if (keys.length === 0) {
    User= false;

  } else {
    User= userInfo;
    
  }

  const handleSend=async()=>{
    
    if(img){
  const storageRef = ref(storage, uuid())
  
    const uploadTask = uploadBytesResumable(storageRef, img);


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
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Sorry... Something went wrong!',
        })
        
        console.log(error);
      },
      () => {
        try{
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            
            console.log('File available at', downloadURL);
            await updateDoc(doc(db, "chats", User[0].chatId? User[0].chatId: userData.uid), {
              messages:arrayUnion({
                id:uuid(),
                img:downloadURL,
                senderId:userData.uid,
                date:Timestamp.now()

              })
            });
            console.log("uppload")
          })
        }catch(err){
          console.log(err)
        }
        
        
      })
      
  }else{
    await updateDoc(doc(db, "chats", userInfo[0].chatId), {
      messages:arrayUnion({
        id:uuid(),
        text:text,
        senderId:userData.uid,
        date:Timestamp.now()
      })
    });
    console.log("send")

  }


  }
  
  
  return (
    <div className='msgInputs'>

      <label htmlFor="file"><span className='fs-4 ' role="button"><AiOutlinePaperClip />
      </span></label><input type='file' className='d-none' id="file" onChange={e=>setImg(e.target.files[0])} />
      <input type='text' onChange={e=>setText(e.target.value)} placeholder='Write Something...' />
      <div className='sendOpt'>
        <span><button onClick={handleSend} ><BsFillSendFill /></button></span>
      </div>
    </div>
  )
}

export default Input
