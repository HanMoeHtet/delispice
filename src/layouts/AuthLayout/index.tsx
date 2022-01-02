import * as React from 'react';
import { Link } from 'react-router-dom';
import Logo from 'src/components/Logo';

interface AuthLayoutProps {}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center py-20 bg-secondary">
      <header className="mb-8">
        <Link to="/">
          <Logo />
        </Link>
      </header>
      <main className="w-full px-4 sm-w-1/2 sm max-w-lg overflow-hidden">
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
