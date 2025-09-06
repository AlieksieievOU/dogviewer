import { useQuery } from '@tanstack/react-query';
import type { Dog, DogApiResponse } from '../types';

export const useDogs = () => {
    return useQuery<Dog[]>({
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
};
