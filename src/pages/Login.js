import { useState } from "react";
import api from "../api/axios";
import "../styles/login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await api.post("/admin/login", { email, password });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/";
    } catch {
      alert("Invalid Login");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Admin Login 01</h2>
        <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button onClick={login}>Login</button>
      </div>
    </div>
  );
}
