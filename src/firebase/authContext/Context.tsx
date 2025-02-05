import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../FirebaceAuth/index"; // Make sure this is your Firebase configuration file
import { onAuthStateChanged } from "firebase/auth";

// Create the AuthContext
const AuthContext = createContext(null);

// Custom hook to use the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}

// AuthProvider component to wrap your application and provide auth state
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe; // Cleanup on component unmount
  }, []);

  const initializeUser = (user) => {
    if (user) {
      setCurrentUser({ ...user });
      setIsLogin(true);
    } else {
      setCurrentUser(null);
      setIsLogin(false);
    }
    setIsLoading(false);
  };

  const value = {
    currentUser,
    isLogin,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}
