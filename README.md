## 🍽️ Recipe App – Frontend (React)

This repository contains the **frontend code** for a basic Recipe App built using **React.js**. The application allows users to browse and view recipes with essential details such as ingredients, cooking instructions, and images. It serves as the user-facing interface of a full-stack application, where the backend is powered by **Flask** (Python).

### 🔧 Tech Stack

* **React.js** – JavaScript library for building the user interface.
* **React Router DOM** – Handles routing within the application.
* **Axios** – Used for making HTTP requests to the Flask backend API.
* **CSS** – For basic styling and layout of components.

### 📁 Folder Structure Overview

* `/components` – Reusable React components like Navbar, Recipe Cards, etc.
* `/pages` – Different routes/pages such as Home, Recipe Details, etc.
* `/App.js` – Main application file that configures routing and layout.
* `/index.js` – Entry point of the React application.
* `/api.js` – API calls and service logic for interacting with the backend

### ✨ Features

* **Home Page** – Displays a list of recipes fetched from the backend.
* **Recipe Details Page** – Clicking on a recipe opens a detailed view with ingredients and instructions.
* **Modular Component Structure** – Each feature is split into clean and reusable components.
* **API Integration** – Fetches dynamic data from a Flask-based backend server using Axios.
* **Routing** – Smooth client-side navigation using React Router.

### 🚀 How to Run

1. Clone the repository:

   ```bash
   git clone https://github.com/juniorcoderr/recipe-app-frontend.git
   cd recipe-app-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Make sure the Flask backend is running on the correct port (configured in the API calls).
