import * as React from 'react';
import NavBar from 'src/components/NavBar';

interface MainLayoutProps {}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="w-full min-h-screen py-8 bg-secondary">
      <div className="w-full max-w-4xl mx-auto px-4">
        <header className="flex mx-auto mb-16 rounded bg-white py-2 px-5">
          <NavBar />
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
