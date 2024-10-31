// Importar las librerías necesarias
import { useEffect, useState } from 'react';

const MarsPhotos = () => {
    const [photos, setPhotos] = useState([]);
    const [selectedPhoto, setSelectedPhoto] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await fetch('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=DEMO_KEY');
                if (!response.ok) {
                    throw new Error('Error al obtener las fotos');
                }
                const data = await response.json();
                setPhotos(data.photos);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchPhotos();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Fotos de Marte</h1>
            <div className="photo-grid">
                {photos.length > 0 ? (
                    photos.map(photo => (
                        <img
                            key={photo.id}
                            src={photo.img_src}
                            alt={`Mars photo ${photo.id}`}
                            onClick={() => setSelectedPhoto(photo)}
                            style={{ cursor: 'pointer', width: '150px', height: 'auto', margin: '5px' }}
                        />
                    ))
                ) : (
                    <p>No se encontraron fotos.</p>
                )}
            </div>
            {selectedPhoto && (
                <div>
                    <h2>Descripción</h2>
                    <p>Nombre del rover: {selectedPhoto.rover.name}</p>
                    <p>Fecha: {selectedPhoto.earth_date}</p>
                    <img src={selectedPhoto.img_src} alt="Selected" style={{ width: '300px' }} />
                </div>
            )}
        </div>
    );
};

export default MarsPhotos;
