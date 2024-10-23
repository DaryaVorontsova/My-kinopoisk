import { useState } from 'react';

import { AddMovieForm } from './add-movie-form';
import { getMovies } from './get-movies';
import { Movies } from './movies';
import type { MovieType } from './movies/types';

export const MainPage = () => {
  const [movies, setMovies] = useState<MovieType[]>(getMovies());

  const onSubmit = (newMovie: MovieType) => {
    setMovies((prevMovies) => [...prevMovies, newMovie]);
  };

  return (
    <div>
      <AddMovieForm onSubmit={onSubmit} />
      <Movies movies={movies} />
    </div>
  );
};
