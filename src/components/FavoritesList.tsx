import type { Dog } from '../types';

interface FavoritesListProps {
    favorites: Dog[];
    setMainDog: (dog: Dog) => void;
    handleRemoveFavorite: (dog: Dog) => void;
}

export const FavoritesList = ({ favorites, setMainDog, handleRemoveFavorite }: FavoritesListProps) => (
    <div className="right-panel">
        <h2>Favorites</h2>
        <ul className="favorites-list">
            {favorites.map((dog, index) => (
                <li key={index}>
                    <button onClick={() => setMainDog(dog)}>
                        <h5>{dog.breed}</h5>
                    </button>
                    <button onClick={() => handleRemoveFavorite(dog)}>
                        Remove
                    </button>
                </li>
            ))}
        </ul>
    </div>
);
