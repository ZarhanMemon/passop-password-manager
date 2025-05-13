import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from './storeApi/useAuth.js';
import { useEffect } from 'react';

import SignupPage from "./components/SignupPage.jsx"
import LoginPage from "./components/LoginPage.jsx"
import HomePage from './components/HomePage.jsx';

function App() {
  const { authUser, authCheck, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to="/user" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/user" />}
        />
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/signup" />}
        />
      </Routes>

      <Toaster />
    </>
  );
}

export default App;
