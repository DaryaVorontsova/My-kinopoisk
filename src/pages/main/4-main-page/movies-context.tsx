import { createContext, useReducer, useContext } from 'react';
import type { Dispatch } from 'react';

import { getMovies } from './get-movies';
import type { MovieType } from './movies/types';

type ACTIONTYPE =
  | { type: 'added'; movie: MovieType }
  | { type: 'favoriteToggled'; id: number };

export const MoviesContext = createContext<MovieType[]>([]);
export const MoviesDispatchContext = createContext<Dispatch<ACTIONTYPE>>(
  () => {},
);

export const MoviesProvider = ({ children }: { children: React.ReactNode }) => {
  const [movies, dispatch] = useReducer(moviesReducer, initialMovies);
  return (
    <MoviesContext.Provider value={movies}>
      <MoviesDispatchContext.Provider value={dispatch}>
        {children}
      </MoviesDispatchContext.Provider>
    </MoviesContext.Provider>
  );
};

export const useMovies = () => {
  const context = useContext(MoviesContext);
  if (context === undefined) {
    throw new Error('useMovies must be used within a MoviesProvider');
  }
  return context;
};

export const useMoviesDispatch = () => {
  const context = useContext(MoviesDispatchContext);
  if (context === undefined) {
    throw new Error('useMoviesDispatch must be used within a MoviesProvider');
  }
  return context;
};

const initialMovies = getMovies().map((movie) => ({
  ...movie,
  isFavorite: false,
}));

function moviesReducer(movies: MovieType[], action: ACTIONTYPE): MovieType[] {
  switch (action.type) {
    case 'added': {
      return [...movies, action.movie];
    }
    case 'favoriteToggled': {
      return movies.map((movie) =>
        movie.id === action.id
          ? { ...movie, isFavorite: !movie.isFavorite }
          : movie,
      );
    }
    default: {
      return movies;
    }
  }
}
