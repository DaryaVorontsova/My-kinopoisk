import type { MovieType } from './types';

type Props = {
  movie: MovieType;
  isFavorite: boolean;
};

export const Movie = ({ movie, isFavorite }: Props) => {
  return (
    <div className="max-w-72">
      <h4>
        {movie.title}
        {isFavorite && '\u2b50'}
      </h4>
      <img src={movie.posterUrl} alt={`${movie.title} (${movie.year})`} />
      <div className="text-base">{movie.description}</div>
    </div>
  );
};
