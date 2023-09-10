import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth,db } from "../config/firebase";
import { doc, getDoc,collection, query, where, onSnapshot } from "firebase/firestore";




export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState([""]);
    const [userData, setUserData] = useState(null);
const [allUser,setAllUser] = useState([''])

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);


try{

    const q = query(collection(db, "user"), where("uid", "!=", user.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const users = [];
        querySnapshot.forEach((doc) => {
            users.push(doc.data());
        });
        setAllUser(users)
    });
    
    
}catch(err){
console.log(err)
}
            
            if (user) {
                try {

                    const docRef = doc(db, "user", user.uid);
                    const docSnapshot = await getDoc(docRef);
                    
                    if (docSnapshot.exists()) {
                        setUserData(docSnapshot.data());
                    } else {
                        setUserData(null);
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            } else {
                setUserData(null);
            }
        });
        
        return () => {
            unsub();
        };
    }, []);
    
    return (
        <AuthContext.Provider value={{ currentUser, userData,allUser }}>
            {children}
        </AuthContext.Provider>
    );
};
