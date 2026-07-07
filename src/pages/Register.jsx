import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api.js";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { email, password });
      setMessage("Registered successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Register</button>

        {message && <p className="message">{message}</p>}

        <p>
          Already have an account? <Link to="/">Login here</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
