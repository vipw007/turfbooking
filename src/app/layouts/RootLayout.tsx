import React from 'react';
import { Outlet } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { SportProvider } from '../contexts/SportContext';

export const RootLayout: React.FC = () => {
  return (
    <SportProvider>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </SportProvider>
  );
};
