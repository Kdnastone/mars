// Importar las librerías necesarias
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";

// Importar las páginas necesarias
import Home from "../pages/Home";
import About from "../pages/About";
import MarsPhotos from "../pages/MarsPhotos";
import AddPlanet from "../pages/AddPlanet";
import PlanetsList from "../storage/PlanetsList";

const App = () => {
  const handleAddPlanet = (planet) => {
    const savedPlanets = JSON.parse(localStorage.getItem("planets")) || [];
    savedPlanets.push(planet);
    localStorage.setItem("planets", JSON.stringify(savedPlanets));
  };

  return (
    <Router>
      <nav>
        <Link to="/home">Información</Link>
        <Link to="/about">Acerca de</Link>
        <Link to="/mars">Fotos de Marte</Link>
        <Link to="/add-planet">Añadir Planeta</Link>
        <Link to="/planets">Planetas</Link>
      </nav>

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/mars" element={<MarsPhotos />} />
        <Route
          path="/add-planet"
          element={<AddPlanet onAddPlanet={handleAddPlanet} />}
        />
        <Route path="/planets" element={<PlanetsList />} />

        {/* Redirigir a /home por defecto */}
        <Route path="/" element={<Navigate to="/home" replace />} />

        {/* Ruta para manejar 404 Not Found */}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default App;
