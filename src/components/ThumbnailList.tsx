import type { Dog } from '../types';

interface ThumbnailListProps {
    thumbnails: Dog[];
    setMainDog: (dog: Dog) => void;
    filter: string;
    setFilter: (filter: string) => void;
}

export const ThumbnailList = ({ thumbnails, setMainDog, filter, setFilter }: ThumbnailListProps) => (
    <>
        <div className="thumbnails-header">
            <h2>Thumbnails</h2>
            <input
                type="text"
                placeholder="Filter by breed..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            />
        </div>
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
    </>
);
