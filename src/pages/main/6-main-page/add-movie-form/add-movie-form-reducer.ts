export interface AddMovieFormState {
  showForm: boolean;
  title: string;
  year: string;
  posterUrl: string;
  description: string;
  notification: string | null;
}

export const initialState: AddMovieFormState = {
  showForm: false,
  title: '',
  year: '',
  posterUrl: '',
  description: '',
  notification: null,
};

type ACTION =
  | { type: 'showForm' }
  | { type: 'hideForm' }
  | {
      type: 'setField';
      field: 'title' | 'year' | 'posterUrl' | 'description';
      value: string;
    }
  | { type: 'clearForm' }
  | { type: 'setNotification'; notification: string | null };

export const addMovieFormReducer = (
  state: AddMovieFormState,
  action: ACTION,
): AddMovieFormState => {
  switch (action.type) {
    case 'showForm':
      return { ...state, showForm: true };
    case 'hideForm':
      return { ...state, showForm: false };
    case 'setField':
      return { ...state, [action.field]: action.value };
    case 'clearForm':
      return { ...state, title: '', year: '', posterUrl: '', description: '' };
    case 'setNotification':
      return { ...state, notification: action.notification };
    default:
      throw new Error();
  }
};
