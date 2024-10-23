import { useState } from 'react';
import type { FormEventHandler } from 'react';

import { Button } from '@/components';

import type { MovieType } from '../movies/types';
import { useMoviesDispatch } from '../movies-context';

import {
  TitleField,
  YearField,
  PosterUrlField,
  DescriptionField,
} from './form-fields';

export const AddMovieForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState('');
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useMoviesDispatch();

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setNotification(`Фильм "${title}" добавлен!`);

    const newMovie: MovieType = {
      id: Math.round(Date.now()), // А если генерировать ID на основе текущего времени, то должна быть высокая точность
      title,
      year: Number(year),
      posterUrl,
      description,
      isFavorite: false,
    };

    dispatch({ type: 'added', movie: newMovie });

    setShowForm(false);
    setTitle('');
    setYear('');
    setPosterUrl('');
    setDescription('');
  };

  function onAddMovieClick() {
    setNotification('');
    setShowForm(true);
  }

  return (
    <div>
      {showForm ? (
        <form
          onSubmit={onSubmit}
          aria-label="Форма добавления фильма"
          className="max-w-sm my-5"
        >
          <TitleField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <YearField value={year} onChange={(e) => setYear(e.target.value)} />
          <PosterUrlField
            value={posterUrl}
            onChange={(e) => setPosterUrl(e.target.value)}
          />
          <DescriptionField
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button>Добавить</Button>
        </form>
      ) : (
        <div className="flex my-5 gap-x-4">
          <Button type="button" onClick={onAddMovieClick}>
            Добавить фильм
          </Button>
          {notification && <div className="text-base">{notification}</div>}
        </div>
      )}
    </div>
  );
};
