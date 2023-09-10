// import React, { useContext } from 'react'
// import { AuthContext } from '../../contextapi/Authcontext';
// import imgLogo from "../../images/userIcon.jpg"





// function UserList() {
//   const { allUser, currentUser, userData } = useContext(AuthContext)


//   const handleSelect = (SelectedId) => {

//     console.log("SelectedId",SelectedId)
//     console.log("userData.uid",userData.uid)
//     const combinedId = userData.uid > SelectedId ? userData.uid + SelectedId : SelectedId + userData.uid
//     console.log("combinedId",combinedId)
//   }
//   console.log(allUser)

//   // displayName ? displayName : (userData && userData.displayName)
//   return (
//     <div>
//       {allUser.map((user, index) => (
//         <div key={index} className='UserChat' onClick={() => handleSelect(user.uid)}>
//           <img src={user.photoURL ? user.photoURL : imgLogo} alt='Userimg' className='UsersImg' />
//           <div className='UserDetail'>
//             <span className='name'>{user.displayName}</span>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default UserList


import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contextapi/Authcontext';
import imgLogo from '../../images/userIcon.jpg';

function UserList() {
  const { allUser, currentUser, userData } = useContext(AuthContext);
  const [selectedUser, setSelectedUser] = useState(null);

  console.log(allUser)
  const handleSelect = (User) => {
  setSelectedUser(User);
  };

  return (
    <div>
      {allUser.map((user, index) => (
        <div key={index} className='UserChat' onClick={() => handleSelect(user)}>
          <img src={user.photoURL ? user.photoURL : imgLogo} alt='Userimg' className='UsersImg' />
          <div className='UserDetail'>
            <span className='name'>{user.displayName}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserList;



