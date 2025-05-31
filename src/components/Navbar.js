import { Link } from "react-router-dom";

export default function Navbar({ isLoggedIn, onLogout }) {
  const navStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 2rem",
    backgroundColor: "#f8f9fa",
    borderBottom: "1px solid #dee2e6",
  };

  const linkStyle = {
    textDecoration: "none",
    margin: "0 1rem",
    color: "#007bff",
    fontWeight: "500",
  };

  return (
    <nav style={navStyle}>
      <div>
        <Link
          to="/"
          style={{ ...linkStyle, fontSize: "1.2rem", fontWeight: "bold" }}
        >
          Recipe App
        </Link>
      </div>
      <div>
        <Link to="/" style={linkStyle}>
          All Recipes
        </Link>
        {isLoggedIn ? (
          <>
            <Link to="/add" style={linkStyle}>
              Add Recipe
            </Link>
            <Link to="/myrecipes" style={linkStyle}>
              My Recipes
            </Link>
            <button
              onClick={onLogout}
              style={{
                background: "#dc3545",
                color: "white",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
                cursor: "pointer",
                marginLeft: "1rem",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={linkStyle}>
              Login
            </Link>
            <Link to="/register" style={linkStyle}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
