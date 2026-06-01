import React from 'react';
import { TopAppBar } from './TopAppBar';
import { BottomNavBar } from './BottomNavBar';
import { Outlet } from 'react-router-dom';

export const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <TopAppBar />
      <main className="pt-20 pb-24 px-4 max-w-md mx-auto">
        <Outlet />
      </main>
      <BottomNavBar />
    </div>
  );
};
