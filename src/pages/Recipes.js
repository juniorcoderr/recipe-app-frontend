import { useEffect, useState } from "react";
import API from "../api";

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      setLoading(true);
      const res = await API.get("/api/recipes");
      setRecipes(res.data);
    } catch (error) {
      console.error("Fetch recipes error:", error);
      setError("Failed to load recipes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    maxWidth: "800px",
    margin: "2rem auto",
    padding: "0 1rem",
  };

  const recipeCardStyle = {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "1.5rem",
    margin: "1rem 0",
    backgroundColor: "#fff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  const titleStyle = {
    color: "#007bff",
    marginBottom: "1rem",
    borderBottom: "2px solid #007bff",
    paddingBottom: "0.5rem",
  };

  const sectionStyle = {
    marginBottom: "1rem",
  };

  const labelStyle = {
    fontWeight: "bold",
    color: "#495057",
    marginBottom: "0.5rem",
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h2>Loading recipes...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={containerStyle}>
        <div
          style={{
            color: "#dc3545",
            backgroundColor: "#f8d7da",
            padding: "1rem",
            borderRadius: "4px",
            textAlign: "center",
          }}
        >
          {error}
        </div>
        <div style={{ textAlign: "center", marginTop: "1rem" }}>
          <button
            onClick={fetchRecipes}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>All Recipes ({recipes.length})</h2>

      {recipes.length === 0 ? (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <p>No recipes found. Be the first to add one!</p>
        </div>
      ) : (
        recipes.map((recipe) => (
          <div key={recipe.id} style={recipeCardStyle}>
            <h3 style={{ color: "#28a745", marginBottom: "1rem" }}>
              {recipe.title}
            </h3>

            <div style={sectionStyle}>
              <div style={labelStyle}>Ingredients:</div>
              <p style={{ whiteSpace: "pre-line", lineHeight: "1.5" }}>
                {recipe.ingredients}
              </p>
            </div>

            <div style={sectionStyle}>
              <div style={labelStyle}>Instructions:</div>
              <p style={{ whiteSpace: "pre-line", lineHeight: "1.5" }}>
                {recipe.instructions}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
