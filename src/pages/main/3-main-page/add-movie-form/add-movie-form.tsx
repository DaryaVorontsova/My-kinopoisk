import { useState } from 'react';
import type { FormEventHandler } from 'react';

import { Button } from '@/components';

import type { MovieType } from '../movies/types';

import {
  TitleField,
  YearField,
  PosterUrlField,
  DescriptionField,
} from './form-fields';

type Props = {
  onSubmit: (newMovie: MovieType) => void;
};

export const AddMovieForm = (props: Props) => {
  const [showForm, setShowForm] = useState(false);
  const [notification, setNotification] = useState('');
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [description, setDescription] = useState('');

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setNotification(`Фильм "${title}" добавлен!`);

    const newMovie: MovieType = {
      id: Math.round(Math.random() * 10000000),
      title,
      year: Number(year),
      posterUrl,
      description,
    };

    props.onSubmit(newMovie);

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
