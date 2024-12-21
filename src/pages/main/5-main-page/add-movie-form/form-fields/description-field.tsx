import type { ChangeEventHandler } from 'react';

type Props = {
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  value: string;
};

export const DescriptionField = ({ onChange, value }: Props) => {
  return (
    <div className="mb-5">
      <label
        htmlFor="description"
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        Описание
      </label>
      <textarea
        id="description"
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
        rows={4}
        placeholder="Введите описание"
        required
        onChange={onChange}
        value={value}
      />
    </div>
  );
};
