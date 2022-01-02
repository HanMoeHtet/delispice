import * as React from 'react';
import { Link } from 'react-router-dom';
import { Background } from 'src/assets/images';
import Logo from 'src/components/Logo';
import styles from './index.module.css';

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  return (
    <div>
      <section
        className="min-h-screen bg-center bg-cover bg-no-repeat bg-blend-multiply py-8 px-8"
        style={{
          backgroundImage: `url(${Background})`,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        }}
      >
        <nav className="flex justify-between items-center mb-40">
          <header>
            <h1 className="flex items-center gap-x-4">
              <Link to="/">
                <Logo className="h-20 rounded-full" />
              </Link>
              <Link to="/">
                <span
                  className={`text-4xl font-bold font-sans text-tertiary ${styles.brand}`}
                >
                  DeliSpice
                </span>
              </Link>
            </h1>
          </header>
          <div>
            <Link
              to="/login"
              className="py-4 px-6 bg-tertiary-light font-bold text-white hover:bg-tertiary rounded-lg"
            >
              Sign In
            </Link>
          </div>
        </nav>
        <h3 className="text-6xl font-medium font-sans text-white text-center w-1/2 mx-auto mb-10">
          Manage your restaurant and serve delicious food
        </h3>
        <div className="flex justify-center">
          <Link
            to="/login"
            className="py-4 px-6 bg-tertiary-light font-medium text-white hover:bg-tertiary rounded-lg"
          >
            Get Started
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
