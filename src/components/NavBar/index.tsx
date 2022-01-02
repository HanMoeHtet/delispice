import * as React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from 'src/composables/auth';
import Logo from '../Logo';
import Profile from '../Profile';

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  const { user } = useAuth();

  return (
    <nav className="w-full flex justify-between items-center">
      <Link to="/">
        <Logo />
      </Link>
      {user && <Profile user={user} />}
    </nav>
  );
};

export default NavBar;
