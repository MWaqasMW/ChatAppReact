import React, { useContext,useState,createContext,useEffect } from 'react'
import { AuthContext } from '../../contextapi/Authcontext';
import imgLogo from "../../images/userIcon.jpg"
import { doc, updateDoc,getDoc, Timestamp,setDoc,collection, query, where, onSnapshot} from "firebase/firestore";
import { db } from '../../config/firebase';
import { useUserInfo } from '../../contextapi/UserInfoContext';





function UserList() {

  const { setUserInfo } = useUserInfo();
  const { allUser, userData} = useContext(AuthContext)
  const [userInfo, getUserInfo] =useState({})
  // const {data , setData}=useState({userData})


  useEffect(() => {
    if (userInfo ) {
      setUserInfo(userInfo);
    }
  }, [userInfo]);
  
  const handleSelect = async({user}) => {
    
    const {uid, displayName,photoURL} = user
    const combinedId = userData.uid > uid ? userData.uid + uid : uid + userData.uid
    console.log(userData.uid);
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
        
        
        
        const docRef = doc(db, "userChats", combinedId);
        
  
  await setDoc(docRef, {
    chatId: combinedId,
    UserInfo: {
      uid: userData.uid,
          photoURL: userData.photoURL?userData.photoURL:`https://firebasestorage.googleapis.com/v0/b/chatapponreact.appspot.com/o/images%2F%5Bobject%20File%5D?alt=media&token=7fd853ab-4a9e-4d71-b17c-91ebeb34d836`,
          displayName: userData.displayName
        },
        SelectUserInfo: {
          uid,
          displayName,
          photoURL:photoURL?photoURL:`https://firebasestorage.googleapis.com/v0/b/chatapponreact.appspot.com/o/images%2F%5Bobject%20File%5D?alt=media&token=7fd853ab-4a9e-4d71-b17c-91ebeb34d836`,

        }
      })
      console.log("document Update")
      
      
    }
    //   else {
      //     console.log("No such document!");
      //  }
      
      catch(err){
        console.log(err)
      }
      
    };


    // if (loading) {
    //   return <div>Loading...</div>; // You can display a loading indicator
    // }

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






