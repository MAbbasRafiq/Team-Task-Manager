import React, { useState } from "react";
import { register } from "../api/authApi";

export default function Register({ onRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setError("");
    try {
      await register(username, password);
      setSuccess(true);
      setTimeout(() => onRegister(), 1000); // auto-login
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed. Username may already be taken."
      );
    }
  };

  return (
    <form
      className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm mx-auto mt-12"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {success && <div className="text-green-500 mb-2">Registered! Logging in…</div>}
      <input
        className="w-full mb-2 p-2 border rounded"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />
      <input
        className="w-full mb-2 p-2 border rounded"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-3"
        type="submit"
      >
        Register
      </button>
    </form>
  );
}
