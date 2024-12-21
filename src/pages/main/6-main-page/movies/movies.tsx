import { Loading } from '@/components';

import { useMovies } from '../movies-context';

import { Movie } from './movie';

export const Movies = () => {
  const state = useMovies();

  if (state.loading) {
    return <Loading />;
  }

  return (
    <div className="flex space-x-5">
      {Object.values(state.movies).map((movie) => (
        <Movie key={movie.id} movie={movie} />
      ))}
    </div>
  );
};
