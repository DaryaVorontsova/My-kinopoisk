import type { ChangeEventHandler } from 'react';

type Props = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
};

export const PosterUrlField = ({ onChange, value }: Props) => {
  return (
    <div className="mb-5">
      <label
        htmlFor="posterUrl"
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        URL постера
      </label>
      <input
        type="text"
        id="posterUrl"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder="Введите URL постера"
        required
        onChange={onChange}
        value={value}
      />
    </div>
  );
};
