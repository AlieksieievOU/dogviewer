import type { Dog } from '../types';

interface DogViewerProps {
    mainDog: Dog | null;
    handleFavorite: () => void;
}

export const DogViewer = ({ mainDog, handleFavorite }: DogViewerProps) => (
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
            <button onClick={handleFavorite}>Add To Favorites</button>
        </div>
    </div>
);
