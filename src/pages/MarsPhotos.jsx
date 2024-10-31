// Importar las librerías necesarias
import { useEffect, useState } from 'react';

// Componente para el Modal
const Modal = ({ photo, onClose }) => {
    return (
        <div style={modalOverlayStyle}>
            <div style={modalStyle}>
                <h2>Descripción</h2>
                <p><strong>Nombre del rover:</strong> {photo.rover.name}</p>
                <p><strong>Fecha:</strong> {photo.earth_date}</p>
                <p><strong>Cámara:</strong> {photo.camera.full_name}</p>
                <p><strong>Estado del rover:</strong> {photo.rover.status}</p>
                <img 
                    src={photo.img_src} 
                    alt="Selected" 
                    style={{ width: '300px', marginTop: '10px' }} 
                />
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
};

// Estilos para el modal
const modalOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
};

const modalStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
};

// Componente principal para mostrar fotos de Marte
const MarsPhotos = () => {
    // Estados para fotos, foto seleccionada, error y carga
    const [photos, setPhotos] = useState([]);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    // useEffect para obtener las fotos de Marte
    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await fetch(
                    'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=5ZEFGk7cKld6DJwvhpi8QxEBncgWTks72tJFEB0y'
                );
                if (!response.ok) {
                    throw new Error('Error al obtener las fotos');
                }
                const data = await response.json();
                setPhotos(data.photos);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchPhotos();
    }, []);

    if (loading) {
        return <div>Cargando fotos de Marte...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Fotos de Marte</h1>
            <div className="photo-grid" style={{ display: 'flex', flexWrap: 'wrap' }}>
                {photos.length > 0 ? (
                    photos.map((photo) => (
                        <img
                            key={photo.id}
                            src={photo.img_src}
                            alt={`Mars photo ${photo.id}`}
                            onClick={() => setSelectedPhoto(photo)} // Establecer la foto seleccionada al hacer clic
                            style={{
                                cursor: 'pointer',
                                width: '150px',
                                height: 'auto',
                                margin: '5px',
                                border: selectedPhoto?.id === photo.id ? '3px solid blue' : '1px solid gray',
                            }}
                        />
                    ))
                ) : (
                    <p>No se encontraron fotos.</p>
                )}
            </div>

            {/* Mostrar el modal si hay una foto seleccionada */}
            {selectedPhoto && (
                <Modal 
                    photo={selectedPhoto} 
                    onClose={() => setSelectedPhoto(null)} // Cerrar el modal
                />
            )}
        </div>
    );
};

export default MarsPhotos;
