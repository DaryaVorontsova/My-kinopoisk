import { useMovies } from '../movies-context';

import { Movie } from './movie';

export const Movies = () => {
  const movies = useMovies();

  return (
    <div className="flex space-x-5">
      {movies.map((movie) => (
        <Movie key={movie.id} movie={movie} />
      ))}
    </div>
  );
};
