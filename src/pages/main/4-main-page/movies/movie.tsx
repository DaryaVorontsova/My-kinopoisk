import { Button } from '@/components';

import { useMoviesDispatch } from '../movies-context';

import type { MovieType } from './types';

type Props = {
  movie: MovieType;
};

export const Movie = ({ movie }: Props) => {
  const dispatch = useMoviesDispatch();

  const favoriteToggle = () => {
    dispatch({ type: 'favoriteToggled', id: movie.id });
  };

  return (
    <div className="max-w-72">
      <h4>
        {movie.title}
        {movie.isFavorite && '\u2b50'}
      </h4>
      <img src={movie.posterUrl} alt={`${movie.title} (${movie.year})`} />
      <Button type="button" onClick={favoriteToggle}>
        {movie.isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
      </Button>
      <div className="text-base">{movie.description}</div>
    </div>
  );
};
