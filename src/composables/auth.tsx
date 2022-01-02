import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import * as React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { SignUpStep } from 'src/pages/SignUpPage';
import { getAuth } from 'src/services/firebase-auth.service';
import {
  getUserData,
  RestaurantNotFoundException,
  UserData,
} from 'src/services/firestore/user';

export interface User extends FirebaseUser {
  data?: UserData;
}

export type TAuthContext = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AuthContext = React.createContext<TAuthContext>({
  user: null,
  setUser: () => {},
  isLoading: true,
  setIsLoading: () => {},
});

interface AuthProviderProps {}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      getAuth(),
      async (user) => {
        if (user) {
          let userData;
          try {
            userData = await getUserData(user.uid);
            setUser({
              ...user,
              data: userData,
            });
          } catch (e) {
            if (e instanceof RestaurantNotFoundException) {
              setUser({
                ...user,
              });
            } else {
              // TODO: Handle error
              console.error(e);
            }
          }
        } else {
          setUser(null);
        }
        setIsLoading(false);
      },
      (err) => {
        // TODO: handle error
        console.error(err);
        setIsLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        setIsLoading,
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const { user, isLoading } = React.useContext(AuthContext);

  return {
    isLoading,
    user,
  };
};

interface GuestProps {
  redirectTo?: string;
}

export const Guest: React.FC<GuestProps> = ({ children, redirectTo }) => {
  const { isLoading, user } = useAuth();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (user) {
    if (user.data) {
      return (
        <Navigate
          replace
          to={redirectTo || `/restaurants/${user.data.restaurant.id}`}
        />
      );
    } else {
      const newSearchParams = new URLSearchParams();
      newSearchParams.set('step', SignUpStep.CREATE_RESTAURANT);
      return (
        <Navigate
          replace
          to={
            redirectTo || {
              pathname: '/signup',
              search: newSearchParams.toString(),
            }
          }
        />
      );
    }
  }

  return <>{children}</>;
};

interface AuthProps {
  redirectTo?: string;
}

export const Auth: React.FC<AuthProps> = ({ children, redirectTo }) => {
  const { isLoading, user } = useAuth();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (!user) {
    return <Navigate replace to={redirectTo || '/login'} />;
  }

  return <>{children}</>;
};
