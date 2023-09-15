import React, { useContext,useState,createContext,useEffect } from 'react'
import { AuthContext } from '../../contextapi/Authcontext';
import imgLogo from "../../images/userIcon.jpg"
import { doc, updateDoc,getDoc,setDoc,collection, query, where, onSnapshot, serverTimestamp} from "firebase/firestore";
import { db } from '../../config/firebase';
import { useUserInfo } from '../../contextapi/UserInfoContext';





function UserList() {

  const { setUserInfo } = useUserInfo();
  
  const { allUser, userData, currentUser} = useContext(AuthContext)
  const [userInfo, getUserInfo] =useState({})
  // const {data , setData}=useState({userData})


  useEffect(() => {
    if (userInfo ) {
      setUserInfo(userInfo);
    }
  }, [userInfo]);
  
  const handleSelect = async({user}) => {
    const {uid, displayName,photoURL} = user
    console.log(uid,displayName,photoURL)
    const combinedId = userData.uid > uid ? userData.uid + uid : uid + userData.uid
    try{
      
      try{
        const q = query(collection(db, "userChats"),where("chatId", "==",combinedId));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const users = [];
          querySnapshot.forEach((doc) => {
            users.push(doc.data());
            });
            getUserInfo(users)
          });
        }catch(error){
          console.log(error)
        }
        
        
        
        const docRef = doc(db, "userChats", currentUser.uid);
        
        await setDoc(docRef, {
          chatId: combinedId,
            SelectUserInfo: {
            uid,
            displayName,
            photoURL: photoURL || imgLogo
          },
        }
      )
      console.log("document Update")
  
      
    }

      
      catch(err){
        console.log(err)
      }
      
    };



      return (
        <div>
      {allUser.map((user, index) => (
        <div key={index} className='UserChat' onClick={() => handleSelect({user})}>
          <img src={user.photoURL ? user.photoURL : imgLogo} alt='Userimg' className='UsersImg' />
          <div className='UserDetail'>
            <span className='name'>{user.displayName}</span>
          </div>
        </div>
      ))}
    </div>
  );
}


export default UserList






