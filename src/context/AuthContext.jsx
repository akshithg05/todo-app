import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useState, useEffect, useContext, createContext } from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [globalUser, setGlobalUser] = useState(null);
  const [globalData, setGlobalData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    setGlobalData(null);
    setGlobalUser(null);
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  const value = {
    globalUser,
    globalData,
    isLoading,
    login,
    signup,
    resetPassword,
    logout,
    setIsLoading,
    setGlobalData,
    setGlobalUser,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // if no user, empty user state and return from listener

      console.log("Current user", user);
      setGlobalUser(user);
      if (!user) {
        console.log("No user found");
        return;
      }

      try {
        setIsLoading(true);

        // create reference for for document (labelled json object), get the doc, snapshot to see if anything there
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        let firebaseData = {};

        if (docSnap?.exists()) {
          console.log("Found user data");
          firebaseData = docSnap?.data();
        }
        setGlobalData(firebaseData);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
      // if user, check user has data in db, if they have, fetch said data and update global state
    }); // clean up function
    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
