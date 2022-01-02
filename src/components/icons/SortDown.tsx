import * as React from 'react';

interface SortDownProps extends React.SVGProps<SVGSVGElement> {}

const SortDown: React.FC<SortDownProps> = (props) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"
      ></path>
    </svg>
  );
};

export default SortDown;
