import { useState, useEffect, useMemo } from 'react';
import './App.css';
import type { Dog } from './types';
import { useDogs } from './hooks/useDogs';
import { DogViewer } from './components/DogViewer';
import { ThumbnailList } from './components/ThumbnailList';
import { FavoritesList } from './components/FavoritesList';

function App() {
    const [mainDog, setMainDog] = useState<Dog | null>(null);
    const [favorites, setFavorites] = useState<Dog[]>([]);
    const [filter, setFilter] = useState<string>('');
    const { isPending, isError, data: dogs, error } = useDogs();

    useEffect(() => {
        if (dogs && dogs.length > 0) {
            setMainDog(dogs[Math.floor(Math.random() * dogs.length)]);
        }
    }, [dogs]);

    const handleFavorite = () => {
        if (mainDog && !favorites.some((fav) => fav.imageUrl === mainDog.imageUrl)) {
            setFavorites([...favorites, mainDog]);
        }
    };

    const handleRemoveFavorite = (dogToRemove: Dog) => {
        setFavorites(favorites.filter((fav) => fav.imageUrl !== dogToRemove.imageUrl));
    };

    if (isPending) {
        return <span>Loading...</span>;
    }

    if (isError) {
        return <span>Error: {error.message}</span>;
    }

    const filteredThumbnails = useMemo(
        () =>
            (dogs ?? [])
                .map((dog) => ({
                    imageUrl: dog.imageUrl,
                    breed: dog.breed,
                }))
                .filter((dog) => dog.breed.toLowerCase().includes(filter.toLowerCase())),
        [dogs, filter]
    );

    return (
        <div className="app-container">
            <h1>Dog Viewer</h1>
            <div className="main-content-container">
                <div className="left-panel">
                    <DogViewer mainDog={mainDog} handleFavorite={handleFavorite} />
                    <ThumbnailList
                        thumbnails={filteredThumbnails}
                        setMainDog={setMainDog}
                        filter={filter}
                        setFilter={setFilter}
                    />
                </div>
                {favorites.length > 0 ? (
                    <FavoritesList
                        favorites={favorites}
                        setMainDog={setMainDog}
                        handleRemoveFavorite={handleRemoveFavorite}
                    />
                ) : null}
            </div>
        </div>
    );
}

export default App;
