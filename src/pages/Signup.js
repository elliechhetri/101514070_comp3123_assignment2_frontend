import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handleSignup = async () => {
    setError("");
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }
    try {
      await api.post("/auth/signup", { name, email, password });
      alert("Signup successful");
      nav("/login");
    } catch (e) {
      const msg =
        e.response?.data?.message ||
        e.message ||
        "Signup failed — email may be taken";
      setError(msg);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "8%" }}>
      <h2>Signup</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      /><br/><br/>
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
      <button onClick={handleSignup}>Signup</button><br/><br/>
      <button onClick={() => nav("/login")}>Go to Login</button>
    </div>
  );
}
