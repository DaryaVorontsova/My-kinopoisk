import type { ChangeEventHandler } from 'react';

export type InputFieldProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export type TextAreaFieldProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
};
