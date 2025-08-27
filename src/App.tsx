import { useState, useEffect } from 'react';
import './App.css';
import type { Dog, DogApiResponse } from './types';
import { useQuery } from '@tanstack/react-query';

function App() {
    const [mainDog, setMainDog] = useState<Dog | null>(null);
    const [favorites, setToFavorites] = useState<Dog[]>([]);
    const {
        isPending,
        isError,
        data: dogs,
        error,
    } = useQuery<Dog[]>({
        queryKey: ['dogs'],
        queryFn: async (): Promise<Dog[]> => {
            const response = await fetch(
                'https://dog.ceo/api/breeds/image/random/10'
            );

            if (!response.ok) {
                throw new Error('Failed to fetch dogs');
            }

            const data = (await response.json()) as DogApiResponse;

            return data.message.map((imageUrl) => {
                const urlParts = imageUrl.split('/');
                const breedIndex =
                    urlParts.findIndex((part) => part === 'breeds') + 1;
                const breed = urlParts[breedIndex] || 'unknown';

                return {
                    imageUrl,
                    breed: breed.replace('-', ' '),
                };
            });
        },
    });

    useEffect(() => {
        if (dogs && dogs.length > 0) {
            setMainDog(dogs[Math.floor(Math.random() * dogs.length)]);
        }
    }, [dogs]);

    const handleFavorite = () => {
        if (
            mainDog &&
            !favorites.some((fav) => fav.imageUrl === mainDog.imageUrl)
        ) {
            setToFavorites([...favorites, mainDog]);
        }
    };

    if (isPending) {
        return <span>Loading...</span>;
    }

    if (isError) {
        return <span>Error: {error.message}</span>;
    }

    const thumbnails: Dog[] = dogs.map((dog) => ({
        imageUrl: dog.imageUrl,
        breed: dog.breed,
    }));

    return (
        <div className="app-container">
            <h1>Dog Viewer</h1>
            <div className="main-content-container">
                <div className="left-panel">
                    <div className="main-dog-viewer">
                        {mainDog ? (
                            <>
                                <h2>{mainDog.breed}</h2>
                                <img
                                    src={mainDog.imageUrl}
                                    alt={`${mainDog.breed}`}
                                    className="main-dog-image"
                                />
                            </>
                        ) : (
                            <p>No dog selected.</p>
                        )}
                        <div className="button-container">
                            <button onClick={handleFavorite}>
                                Add To Favorites
                            </button>
                        </div>
                    </div>
                    <h2>Thumbnails</h2>
                    <ul className="thumbnail-list">
                        {thumbnails.map((dog, index) => (
                            <li key={index}>
                                <h5>{dog.breed}</h5>
                                <button onClick={() => setMainDog(dog)}>
                                    <img
                                        src={dog.imageUrl}
                                        alt={dog.breed}
                                        className="thumbnail-image"
                                    />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                {favorites.length > 0 ? (
                    <div className="right-panel">
                        <h2>Favorites</h2>
                        <ul className="favorites-list">
                            {favorites.map((dog, index) => (
                                <li key={index}>
                                    <button onClick={() => setMainDog(dog)}>
                                        <h5>{dog.breed}</h5>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default App;
