import * as React from 'react';

interface SortUpProps extends React.SVGProps<SVGSVGElement> {}

const SortUp: React.FC<SortUpProps> = (props) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 320 512"
      { ... props }
    >
      <path
        fill="currentColor"
        d="M279 224H41c-21.4 0-32.1-25.9-17-41L143 64c9.4-9.4 24.6-9.4 33.9 0l119 119c15.2 15.1 4.5 41-16.9 41z"
      ></path>
    </svg>
  );
};

export default SortUp;
