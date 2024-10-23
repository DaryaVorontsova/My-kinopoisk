import { favorites } from './favorites';
import { Movie } from './movie';
import type { MovieType } from './types';

type Props = {
  movies: MovieType[];
};

export const Movies = ({ movies }: Props) => {
  return (
    <div className="flex space-x-5">
      {movies.map((movie) => {
        return (
          <Movie
            key={movie.id}
            movie={movie}
            isFavorite={favorites.has(movie.id)}
          />
        );
      })}
    </div>
  );
};
