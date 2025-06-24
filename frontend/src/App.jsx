import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import { getMe } from "./api/authApi";

export default function App() {
  const [view, setView] = useState("login");
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    getMe()
      .then(() => {
        setAuthed(true);
        setView("dashboard");
      })
      .catch(() => {
        setAuthed(false);
        setView("login");
      });
  }, []);

  const handleLogin = () => {
    setAuthed(true);
    setView("dashboard");
  };

  const handleLogout = () => {
    setAuthed(false);
    setView("login");
  };

  const handleGoToRegister = () => setView("register");
  const handleGoToLogin = () => setView("login");

  return (
    <div className="min-h-screen bg-blue-50">
      {authed && view === "dashboard" ? (
        <Dashboard onLogout={handleLogout} />
      ) : view === "login" ? (
        <>
          <Login onLogin={handleLogin} />
          <div className="text-center mt-2">
            <button className="text-blue-600 underline" onClick={handleGoToRegister}>
              Don't have an account? Register
            </button>
          </div>
        </>
      ) : (
        <>
          <Register onRegister={handleLogin} />
          <div className="text-center mt-2">
            <button className="text-blue-600 underline" onClick={handleGoToLogin}>
              Already have an account? Login
            </button>
          </div>
        </>
      )}
    </div>
  );
}
