import * as React from 'react';
import NavBar from 'src/components/NavBar';
import { theme } from 'src/theme';

interface MainLayoutProps {}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div
      className="w-full min-h-screen py-8"
      style={{ backgroundColor: theme.colors.secondary }}
    >
      <header className="flex max-w-4xl mx-auto mb-16 rounded bg-white py-2 px-5">
        <NavBar />
      </header>
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
