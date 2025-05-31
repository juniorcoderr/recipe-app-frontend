import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

export default function AddRecipe() {
  const [form, setForm] = useState({
    title: "",
    ingredients: "",
    instructions: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (
      !form.title.trim() ||
      !form.ingredients.trim() ||
      !form.instructions.trim()
    ) {
      setError("Please fill in all fields");
      return;
    }

    if (form.title.trim().length < 3) {
      setError("Recipe title must be at least 3 characters");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await API.post("/api/add", {
        title: form.title.trim(),
        ingredients: form.ingredients.trim(),
        instructions: form.instructions.trim(),
      });

      setSuccess("Recipe added successfully!");
      setForm({ title: "", ingredients: "", instructions: "" });

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Add recipe error:", error);
      if (error.response?.status === 401) {
        setError("Please log in to add recipes");
        localStorage.removeItem("token");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(
          error.response?.data?.msg || "Failed to add recipe. Please try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const formStyle = {
    maxWidth: "600px",
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

  const textareaStyle = {
    ...inputStyle,
    minHeight: "100px",
    resize: "vertical",
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
      <h2 style={{ textAlign: "center", marginBottom: "1.5rem" }}>
        Add New Recipe
      </h2>

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

      {success && (
        <div
          style={{
            color: "#155724",
            backgroundColor: "#d4edda",
            padding: "0.75rem",
            borderRadius: "4px",
            marginBottom: "1rem",
            border: "1px solid #c3e6cb",
          }}
        >
          {success}
        </div>
      )}

      <input
        value={form.title}
        placeholder="Recipe Title (min 3 characters)"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        style={inputStyle}
        disabled={loading}
      />

      <textarea
        value={form.ingredients}
        placeholder="Ingredients (e.g., 2 cups flour, 1 egg, 1/2 cup milk...)"
        onChange={(e) => setForm({ ...form, ingredients: e.target.value })}
        style={textareaStyle}
        disabled={loading}
      />

      <textarea
        value={form.instructions}
        placeholder="Cooking Instructions (step by step...)"
        onChange={(e) => setForm({ ...form, instructions: e.target.value })}
        style={textareaStyle}
        disabled={loading}
      />

      <button type="submit" disabled={loading} style={buttonStyle}>
        {loading ? "Adding Recipe..." : "Add Recipe"}
      </button>
    </form>
  );
}
