import { createContext, useContext, useReducer } from 'react';
import type { Dispatch } from 'react';

import { getMovies } from './get-movies';
import type { MovieType } from './movies/types';

const MoviesContext = createContext<MovieType[]>([]);

const MoviesDispatchContext = createContext<Dispatch<Action>>(() => {});

type Props = {
  children: React.ReactNode;
};

const initialMovies: MovieType[] = getMovies().map((movie) => ({
  ...movie,
  isFavorite: false,
}));

export const MoviesProvider = ({ children }: Props) => {
  const [movies, dispatch] = useReducer(moviesReducer, initialMovies);

  return (
    <MoviesContext.Provider value={movies}>
      <MoviesDispatchContext.Provider value={dispatch}>
        {children}
      </MoviesDispatchContext.Provider>
    </MoviesContext.Provider>
  );
};

export function useMovies() {
  return useContext(MoviesContext);
}

export function useMoviesDispatch() {
  return useContext(MoviesDispatchContext);
}

type AddedAction = {
  type: 'added';
  payload: MovieType;
};

type FavoriteToggledAction = {
  type: 'favoriteToggled';
  payload: MovieType['id'];
};

type Action = AddedAction | FavoriteToggledAction;

function moviesReducer(movies: MovieType[], action: Action): MovieType[] {
  const { type } = action;

  switch (type) {
    case 'added': {
      const { id, title, year, posterUrl, description, isFavorite } =
        action.payload;

      return [
        ...movies,
        {
          id,
          title,
          year,
          posterUrl,
          description,
          isFavorite,
        },
      ];
    }

    case 'favoriteToggled': {
      const { payload: movieId } = action;

      return movies.map((movie) => {
        if (movie.id === movieId) {
          return {
            ...movie,
            isFavorite: !movie.isFavorite,
          };
        }

        return movie;
      });
    }

    default: {
      throw Error('Unknown action: ' + type);
    }
  }
}
