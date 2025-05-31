import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import API from "../api";

export default function MyRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await API.get("/api/myrecipes");
        setRecipes(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch your recipes. Please try again later.");
        setLoading(false);
        console.error("Error fetching recipes:", err);
      }
    };

    fetchRecipes();
  }, []);

  const handleDelete = async (recipeId) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      try {
        await API.delete(`/api/recipes/${recipeId}`);
        // Remove the deleted recipe from state
        setRecipes(recipes.filter((recipe) => recipe.id !== recipeId));
      } catch (err) {
        setError("Failed to delete the recipe. Please try again.");
        console.error("Delete error:", err);
      }
    }
  };

  if (loading) {
    return <div>Loading your recipes...</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>My Recipes</h1>
      {error && (
        <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>
      )}

      {recipes.length === 0 ? (
        <div>
          <p>You haven't created any recipes yet.</p>
          <Link
            to="/add"
            style={{ display: "inline-block", marginTop: "10px" }}
          >
            <button>Create Your First Recipe</button>
          </Link>
        </div>
      ) : (
        <div>
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              style={{
                marginBottom: "20px",
                padding: "15px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <h2>{recipe.title}</h2>
              <p>
                <strong>Ingredients:</strong> {recipe.ingredients}
              </p>
              <p>
                <strong>Instructions:</strong> {recipe.instructions}
              </p>
              <div style={{ marginTop: "10px" }}>
                <Link
                  to={`/edit-recipe/${recipe.id}`}
                  style={{ marginRight: "10px" }}
                >
                  <button>Edit</button>
                </Link>
                <button
                  onClick={() => handleDelete(recipe.id)}
                  style={{ backgroundColor: "#dc3545", color: "white" }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
