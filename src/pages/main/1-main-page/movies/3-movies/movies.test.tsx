import { screen, render } from '@testing-library/react';

import { favorites } from './favorites';
import * as getMoviesModule from './get-movies';
import * as movieModule from './movie';
import { Movies } from './movies';

const firstMovie = {
  id: 258687,
  title: 'Интерстеллар',
  year: 2014,
  posterUrl:
    'https://image.openmoviedb.com/kinopoisk-images/1600647/430042eb-ee69-4818-aed0-a312400a26bf/x1000',
  description:
    'Фантастический эпос про задыхающуюся Землю, космические полеты и парадоксы времени. «Оскар» за спецэффекты',
};

const secondMovie = {
  id: 447301,
  title: 'Начало',
  year: 2010,
  posterUrl:
    'https://image.openmoviedb.com/kinopoisk-images/1629390/8ab9a119-dd74-44f0-baec-0629797483d7/x1000',
  description:
    'Профессиональные воры внедряются в сон наследника огромной империи. Фантастический боевик Кристофера Нолана',
};

const thirdMovie = {
  id: 111543,
  title: 'Темный рыцарь',
  year: 2008,
  posterUrl:
    'https://image.openmoviedb.com/kinopoisk-images/1599028/0fa5bf50-d5ad-446f-a599-b26d070c8b99/x1000',
  description:
    'У Бэтмена появляется новый враг — философ-террорист Джокер. Кинокомикс, который вывел жанр на новый уровень',
};

const movies = [firstMovie, secondMovie, thirdMovie];

describe('1.2 Components', () => {
  // убедитесь, что задаёте атрибут key в цикле map. Иначе тут будет ошибка:
  // expected "getMovies" to be called 1 times, but got 2 times
  it('1.2.2 Rendering Lists', async () => {
    const hasFavorite = vi.spyOn(favorites, 'has');

    const originalGetMovies = getMoviesModule.getMovies;

    const getMoviesMock = vi
      .spyOn(getMoviesModule, 'getMovies')
      .mockImplementation(() => {
        const movies = originalGetMovies();
        vi.spyOn(movies, 'map');
        return movies;
      });

    const Movie = vi.spyOn(movieModule, 'Movie');

    render(<Movies />);

    // 1 раз была вызвана getMovies для получения массива с фильмами
    expect(getMoviesMock).toHaveBeenCalledTimes(1);

    // 1 раз был вызыван метод map на массиве с фильмами
    const moviesWithSpyOnMap = getMoviesMock.mock.results[0].value;
    expect(moviesWithSpyOnMap.map).toHaveBeenCalledTimes(1);

    // 3 раза узнавали в избранном ли фильм, вызывая метод has на Set
    expect(hasFavorite).toHaveBeenCalledTimes(3);

    // компонент Movie использовался 3 раза с пропсами movie и isFavorite
    expect(Movie).toHaveBeenCalledTimes(3);
    expect(Movie).toHaveBeenNthCalledWith(
      1,
      { movie: firstMovie, isFavorite: true },
      {},
    );
    expect(Movie).toHaveBeenNthCalledWith(
      2,
      { movie: secondMovie, isFavorite: false },
      {},
    );
    expect(Movie).toHaveBeenNthCalledWith(
      3,
      { movie: thirdMovie, isFavorite: false },
      {},
    );

    // 3 фильма отображаются на экране
    movies.forEach((movie) => {
      if (movie.id === 258687) {
        // этот фильм будет в избранном. Проверяем вывод названия со звездочкой
        expect(
          screen.getByRole('heading', {
            name: movie.title + '\u2b50',
            level: 4,
          }),
        ).toBeVisible();
      } else {
        // все остальные фильмы не в избранном. Название без звездочки
        expect(
          screen.getByRole('heading', { name: movie.title, level: 4 }),
        ).toBeVisible();
      }

      // img с правильными src и alt
      expect(
        screen.getByRole('img', { name: `${movie.title} (${movie.year})` }),
      ).toHaveAttribute('src', movie.posterUrl);

      // Текст описания отображается на странице
      expect(screen.getByText(movie.description)).toBeVisible();
    });
  });
});
