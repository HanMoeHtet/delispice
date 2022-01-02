import * as React from 'react';
import GoogleButton from 'react-google-button';

interface SignInWithGoogleProps
  extends React.ComponentProps<typeof GoogleButton> {
  onClick: () => void;
}

const SignInWithGoogle: React.FC<SignInWithGoogleProps> = ({
  onClick,
  ...rest
}) => {
  const [error, setError] = React.useState('');

  const handleClick = async () => {
    try {
      onClick();
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  };

  return (
    <div>
      <GoogleButton onClick={handleClick} {...rest} />
      {error && <p className="text-red-500 text-xs italic">{error}</p>}
    </div>
  );
};

export default SignInWithGoogle;
