import { createContext, useContext, useEffect } from 'react';
import type { Dispatch } from 'react';
import { useImmerReducer } from 'use-immer';

import type { MovieType } from './movies/types';
import { useData } from './use-data';

const MoviesContext = createContext<MovieState | undefined>(undefined);
const MoviesDispatchContext = createContext<Dispatch<Action>>(() => {});

type Props = {
  children: React.ReactNode;
};

type MovieState = {
  movies: Record<string, MovieType>;
  loading: boolean;
};

const initialState = {
  movies: {},
  loading: false,
};

export const MoviesProvider = ({ children }: Props) => {
  const [state, dispatch] = useImmerReducer(moviesReducer, initialState);
  const { data: movies, loading } = useData<MovieType[]>('/api/movies');

  useEffect(() => {
    if (loading) {
      dispatch({ type: 'loadingStarted' });
    } else if (movies) {
      dispatch({ type: 'moviesLoaded', payload: movies });
    }
  }, [loading, movies]);

  return (
    <MoviesContext.Provider value={state}>
      <MoviesDispatchContext.Provider value={dispatch}>
        {children}
      </MoviesDispatchContext.Provider>
    </MoviesContext.Provider>
  );
};

export function useMovies() {
  const context = useContext(MoviesContext);

  if (context === undefined) {
    throw new Error('useMovies must be used within a MoviesProvider');
  }

  return context;
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

type MoviesLoadedAction = {
  type: 'moviesLoaded';
  payload: MovieType[];
};

type LoadingStartedAction = {
  type: 'loadingStarted';
};

type Action =
  | AddedAction
  | FavoriteToggledAction
  | MoviesLoadedAction
  | LoadingStartedAction;

function moviesReducer(draft: MovieState, action: Action): void {
  switch (action.type) {
    case 'added': {
      draft.movies[action.payload.id] = action.payload;
      break;
    }

    case 'favoriteToggled': {
      const movie = draft.movies[action.payload];

      movie.isFavorite = !movie.isFavorite;
      break;
    }

    case 'moviesLoaded': {
      action.payload.forEach((movie) => {
        draft.movies[movie.id] = movie;
      });
      draft.loading = false;
      break;
    }

    case 'loadingStarted': {
      draft.loading = true;
      break;
    }

    default: {
      throw new Error('Unknown action: ');
    }
  }
}
