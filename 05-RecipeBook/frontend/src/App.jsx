import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import RegisterPage from "./pages/RegisterPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";

import HomePage from "./pages/HomePage.jsx";
import CreateRecipePage from "./pages/CreateRecipePage.jsx";
import RecipeDetailPage from "./pages/RecipeDetailPage.jsx";
import EditRecipePage from "./pages/EditRecipePage.jsx";


function App() {

  return (
    <div className="min-h-screen">
      <Navbar />

      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="/recipes/new" element={ <CreateRecipePage /> } />
        <Route path="/recipes/:id/edit" element={ <EditRecipePage /> } />
        <Route path="/recipes/:id" element={ <RecipeDetailPage />} />
        <Route path="/register" element={ <RegisterPage /> } />
        <Route path="/login" element={ <LoginPage /> } />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
