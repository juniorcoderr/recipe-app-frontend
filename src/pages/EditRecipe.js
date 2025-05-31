import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

export default function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    ingredients: "",
    instructions: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLoadingRecipe, setIsLoadingRecipe] = useState(true);

  // Fetch the recipe to edit
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await API.get(`/api/recipes/${id}`);
        setForm({
          title: response.data.title,
          ingredients: response.data.ingredients,
          instructions: response.data.instructions,
        });
        setIsLoadingRecipe(false);
      } catch (err) {
        setError("Failed to fetch the recipe. Please try again.");
        setIsLoadingRecipe(false);
        console.error("Error fetching recipe:", err);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await API.put(`/api/recipes/${id}`, form);
      navigate("/myrecipes");
    } catch (err) {
      setError("Failed to update the recipe. Please try again.");
      console.error("Update error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (isLoadingRecipe) {
    return <div>Loading recipe...</div>;
  }

  const formStyle = {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    backgroundColor: "#f9f9f9",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    border: "1px solid #ddd",
    borderRadius: "4px",
    boxSizing: "border-box",
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: "100px",
    resize: "vertical",
  };

  return (
    <div style={formStyle}>
      <h1>Edit Recipe</h1>
      {error && (
        <div style={{ color: "red", marginBottom: "15px" }}>{error}</div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Ingredients</label>
          <textarea
            name="ingredients"
            value={form.ingredients}
            onChange={handleChange}
            required
            style={textareaStyle}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label>Instructions</label>
          <textarea
            name="instructions"
            value={form.instructions}
            onChange={handleChange}
            required
            style={{ ...textareaStyle, minHeight: "200px" }}
          />
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {loading ? "Updating..." : "Update Recipe"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/myrecipes")}
            style={{
              padding: "10px 20px",
              backgroundColor: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
