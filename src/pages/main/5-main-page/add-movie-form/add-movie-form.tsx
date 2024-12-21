import type { FormEventHandler } from 'react';
import { useRef, useEffect, useReducer } from 'react';
import { createPortal } from 'react-dom';

import { Button, Notification } from '@/components';

import type { MovieType } from '../movies/types';
import { useMoviesDispatch } from '../movies-context';

import { addMovieFormReducer, initialState } from './add-movie-form-reducer';
import {
  DescriptionField,
  PosterUrlField,
  TitleField,
  YearField,
} from './form-fields';

export const AddMovieForm = () => {
  const dispatchMoviesAction = useMoviesDispatch();

  const [state, dispatch] = useReducer(addMovieFormReducer, initialState);

  const titleFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state.showForm && titleFieldRef.current) {
      titleFieldRef.current.focus();
    }
  }, [state.showForm]);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const newMovie: MovieType = {
      id: Math.round(Math.random() * 10000000),
      title: state.title,
      year: Number(state.year),
      posterUrl: state.posterUrl,
      description: state.description,
      isFavorite: false,
    };

    dispatchMoviesAction({
      type: 'added',
      payload: newMovie,
    });

    dispatch({
      type: 'setNotification',
      notification: `Фильм "${state.title}" добавлен!`,
    });

    dispatch({ type: 'hideForm' });
    dispatch({ type: 'clearForm' });

    setTimeout(() => {
      dispatch({ type: 'setNotification', notification: '' });
    }, 3000);
  };

  const onCancel = () => {
    dispatch({ type: 'hideForm' });
    dispatch({ type: 'clearForm' });
  };

  const onAddMovieClick = () => {
    dispatch({ type: 'showForm' });
  };

  return (
    <div>
      {state.showForm && (
        <form
          aria-label="Форма добавления фильма"
          className="my-5 max-w-sm"
          onSubmit={onSubmit}
        >
          <TitleField
            onChange={(e) => {
              dispatch({
                type: 'setField',
                field: 'title',
                value: e.target.value,
              });
            }}
            value={state.title}
            ref={titleFieldRef}
          />
          <YearField
            onChange={(e) =>
              dispatch({
                type: 'setField',
                field: 'year',
                value: e.target.value,
              })
            }
            value={state.year}
          />
          <PosterUrlField
            onChange={(e) =>
              dispatch({
                type: 'setField',
                field: 'posterUrl',
                value: e.target.value,
              })
            }
            value={state.posterUrl}
          />
          <DescriptionField
            onChange={(e) =>
              dispatch({
                type: 'setField',
                field: 'description',
                value: e.target.value,
              })
            }
            value={state.description}
          />
          <div className="my-5 flex gap-x-4">
            <Button>Добавить</Button>
            <Button type="button" onClick={onCancel}>
              Отмена
            </Button>
          </div>
        </form>
      )}
      {!state.showForm && (
        <div className="my-5 flex gap-x-4">
          <Button type="button" onClick={onAddMovieClick}>
            Добавить фильм
          </Button>
        </div>
      )}
      {state.notification &&
        createPortal(
          <Notification children={state.notification} />,
          document.body,
        )}
    </div>
  );
};
