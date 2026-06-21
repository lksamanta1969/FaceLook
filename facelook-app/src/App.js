import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import ProfilePage from "./pages/ProfilePage";
import React, { useState } from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleLogin() {
    if (email === "" || password === "") {
      alert("Please enter Email and Password");
      return;
    }

    setIsLoggedIn(true);
  }

  if (!isLoggedIn) {
    return (
      <div
        style={{
          width: "350px",
          margin: "100px auto",
          padding: "30px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        <h2>FaceLook Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "15px",
          }}
        />

        <input
  type={showPassword ? "text" : "password"}
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  style={{
    width: "100%",
    padding: "10px",
    marginBottom: "10px"
  }}
/>

<button
  type="button"
  onClick={() => setShowPassword(!showPassword)}
  style={{
    marginBottom: "20px"
  }}
>
  {showPassword ? "🙈 Hide Password" : "👁 Show Password"}
</button>

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "10px",
          }}
        >
          Login
        </button>
      </div>
    );
  }

return (
  <BrowserRouter>

    <Routes>

      <Route
        path="/"
        element={<Navigate to="/home" />}
      />

      <Route
        path="/home"
        element={
          <HomePage
            onLogout={() => setIsLoggedIn(false)}
          />
        }
      />

      <Route
        path="/profile"
        element={<ProfilePage />}
      />

    </Routes>

  </BrowserRouter>
); 
}