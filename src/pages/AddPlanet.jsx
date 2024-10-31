import React, { useState } from "react";

const AddPlanet = ({ onAddPlanet }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(""); // Estado para la imagen cargada
  const [imageUrl, setImageUrl] = useState(""); // Estado para la URL de la imagen

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPlanet = { name, description, image: imageUrl || image }; // Usa la URL de la imagen o la imagen cargada
    onAddPlanet(newPlanet); // Llama a la función proporcionada para agregar el planeta
    // Reiniciar el formulario
    setName("");
    setDescription("");
    setImage(""); // Reiniciar la imagen cargada
    setImageUrl(""); // Reiniciar la URL de la imagen
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Establece la URL de la imagen cargada
        setImageUrl(""); // Asegúrate de que no haya una URL al cargar una imagen
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Nombre:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Descripción:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Imagen (Seleccionar archivo):
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
      </div>
      <div>
        <label>
          Imagen (Usar URL):
          <input
            type="text"
            placeholder="Ingresa la URL de la imagen"
            value={imageUrl}
            onChange={(e) => {
              setImageUrl(e.target.value);
              setImage(""); // Asegúrate de que no haya una imagen cargada al ingresar una URL
            }}
          />
        </label>
      </div>
      {/* Previsualización de la imagen */}
      {image && (
        <div>
          <h3>Previsualización de la imagen cargada:</h3>
          <img src={image} alt="Vista previa" style={{ width: "100px", height: "100px" }} />
        </div>
      )}
      {imageUrl && (
        <div>
          <h3>Previsualización de la imagen de la URL:</h3>
          <img src={imageUrl} alt="Vista previa de URL" style={{ width: "100px", height: "100px" }} />
        </div>
      )}
      <button type="submit">Añadir Planeta</button>
    </form>
  );
};

export default AddPlanet;
