import type { ChangeEventHandler } from 'react';
import { forwardRef } from 'react';

type Props = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: string;
};

export const TitleField = forwardRef<HTMLInputElement, Props>(
  ({ onChange, value }, ref) => {
    return (
      <div className="mb-5">
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >
          Название фильма
        </label>
        <input
          type="text"
          id="title"
          className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Введите название фильма"
          required
          onChange={onChange}
          value={value}
          ref={ref}
        />
      </div>
    );
  },
);
