import * as React from 'react';

interface SpinnerProps {}

const Spinner: React.FC<SpinnerProps> = () => {
  return (
    <svg
      className="animate-spin p-2 border-4 border-t-transparent rounded-full"
      viewBox="0 0 24 24"
    ></svg>
  );
};

export default Spinner;
