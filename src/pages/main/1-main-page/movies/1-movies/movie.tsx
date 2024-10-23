import { getMovie } from './get-movie';

export const Movie = () => {
  const movie = getMovie();
  return (
    <div>
      <h4>{movie.title}</h4>
      <img
        src={movie.posterUrl}
        alt={`${movie.title} (${movie.year})`}
        style={{ width: 300 }}
      />
      <div>{movie.description}</div>
    </div>
  );
};
