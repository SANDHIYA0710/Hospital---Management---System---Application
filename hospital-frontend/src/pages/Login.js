import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { loginUser } from "../api/api";
import "../styles.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      console.log("Sending:", email, password);

      const res = await loginUser(email, password);

      console.log("Response:", res.data);

      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("userId", res.data.user_id);

      navigate("/doctors");
    } catch (err) {
      console.error(err);
      setError("Invalid credentials ❌");
    }
  };

  return (
    <div className="login-container">
      
      {/* 🔥 Overlay Card */}
      <div className="login-card">
        <h2>🏥 MEDWIN</h2>
        <p>We care of you</p>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin}>Login</button>

        {/* 🔴 ERROR MESSAGE */}
        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
      </div>

    </div>
  );
}

export default Login;
