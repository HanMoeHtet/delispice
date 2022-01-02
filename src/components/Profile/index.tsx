import { User, UserInfo } from 'firebase/auth';
import { AnimatePresence, motion } from 'framer-motion';
import * as React from 'react';
import { Avatar } from 'src/assets/images';
import { signOut } from 'src/services/firebase-auth.service';
import Chevron from '../icons/Chevron';
import SignOut from '../icons/SignOut';

interface ProfileProps {
  user: User;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const getField = <T extends keyof UserInfo>(fieldName: T) => {
    if (user[fieldName]) {
      return user[fieldName];
    }

    for (let i = 0; i < user.providerData.length; i++) {
      if (user.providerData[i][fieldName] != null) {
        return user.providerData[i][fieldName];
      }
    }

    return null;
  };

  const displayName = getField('displayName') || getField('email') || 'User';
  const avatar = getField('photoURL') || Avatar;

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="flex items-center px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors ease-in-out duration-300"
        onClick={() => {
          setIsMenuOpen((prev) => !prev);
        }}
      >
        <img
          src={avatar}
          alt={displayName}
          className="h-8 rounded-full mr-2 border border-tertiary"
        />
        <p className="font-bold">{displayName}</p>
        <Chevron
          className={`-mr-1 ml-2 h-5 w-5 ${
            isMenuOpen ? '' : '-rotate-90'
          } transition-transform duration-150 ease-out`}
        />
      </button>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{
              duration: 0.15,
              ease: 'easeOut',
            }}
          >
            <button
              type="button"
              className="flex items-center text-gray-700 w-full px-4 py-2 hover:bg-tertiary-light hover:text-white transition-colors duration-200"
              role="menuitem"
              id="menu-item-3"
              onClick={() => {
                signOut();
              }}
            >
              <SignOut className="rotate-180 h-4 mr-4" />
              <span className="">Sign out</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Profile;
