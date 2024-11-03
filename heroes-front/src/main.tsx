import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HeroesListPage from './pages/HeroesListPage';
import CreateSuperheroPage from './pages/CreateHeroPage';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <HeroesListPage />,
  },
  {
    path: '/create',
    element: <CreateSuperheroPage />,
  },
  {
    path: '/:id',
    element: <CreateSuperheroPage />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <Toaster position='top-center' reverseOrder={false} />
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </QueryClientProvider>
);
