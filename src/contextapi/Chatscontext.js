// UserInfoContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, orderBy, doc } from "firebase/firestore";
import { db } from '../config/firebase';
const ChatsContext = createContext();


export const ChatsProvider = ({ children }) => {

    const [chats, setChats] = useState({});

useEffect(()=>{

    const q = query(collection(db, "chats"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const allChats = [];
      querySnapshot.forEach((doc) => {
        allChats.push(doc.data());
    });
    setChats(allChats)
});

},[])






    return (
        <ChatsContext.Provider value={{ chats}}>
            {children}
        </ChatsContext.Provider>
    );
};

export const useChats = () => {
    return useContext(ChatsContext);
};
