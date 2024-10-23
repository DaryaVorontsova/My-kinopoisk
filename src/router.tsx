import { createBrowserRouter } from 'react-router-dom';

import { Layout } from './components';
import { MainPage } from './pages/main';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <MainPage />
      </Layout>
    ),
  },
]);
