import { favorites } from './favorites';
import { getMovies } from './get-movies';
import { Movie } from './movie';

export const Movies = () => {
  const movies = getMovies();
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
