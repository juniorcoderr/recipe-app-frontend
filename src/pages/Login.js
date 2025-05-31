import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

export default function Login({ setIsLoggedIn }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (!form.username.trim() || !form.password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await API.post("/auth/login", {
        username: form.username.trim(),
        password: form.password,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        setIsLoggedIn && setIsLoggedIn(true);
        navigate("/");
      } else {
        setError("Login failed - no token received");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.response?.data?.msg || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const formStyle = {
    maxWidth: "400px",
    margin: "2rem auto",
    padding: "2rem",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem",
    margin: "0.5rem 0",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
  };

  const buttonStyle = {
    width: "100%",
    padding: "0.75rem",
    backgroundColor: loading ? "#6c757d" : "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: loading ? "not-allowed" : "pointer",
    marginTop: "1rem",
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>Login</h2>

      {error && (
        <div
          style={{
            color: "#dc3545",
            backgroundColor: "#f8d7da",
            padding: "0.75rem",
            borderRadius: "4px",
            marginBottom: "1rem",
            border: "1px solid #f5c6cb",
          }}
        >
          {error}
        </div>
      )}

      <input
        value={form.username}
        placeholder="Username"
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        style={inputStyle}
        disabled={loading}
      />

      <input
        value={form.password}
        type="password"
        placeholder="Password (min 6 characters)"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        style={inputStyle}
        disabled={loading}
      />

      <button type="submit" disabled={loading} style={buttonStyle}>
        {loading ? "Logging in..." : "Login"}
      </button>

      <p style={{ textAlign: "center", marginTop: "1rem" }}>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </form>
  );
}
