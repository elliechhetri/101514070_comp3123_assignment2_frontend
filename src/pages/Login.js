import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      nav("/employees");
    } catch (e) {
      setError("Invalid credentials");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "8%" }}>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      /><br/><br/>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      /><br/><br/>
      <button onClick={handleLogin}>Login</button><br/><br/>
      <button onClick={() => nav("/signup")}>Go to Signup</button>
    </div>
  );
}
