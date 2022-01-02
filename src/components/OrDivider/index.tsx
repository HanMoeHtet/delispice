import * as React from 'react';

interface OrDividerProps {}

const OrDivider: React.FC<OrDividerProps> = () => {
  return (
    <div className="relative w-full py-10">
      <hr className="w-full border-t border-t-gray-200 mt-1" />
      <p className="absolute top-1/2 left-1/2 bg-white px-2 py-4 -translate-x-1/2 -translate-y-1/2 font-bold text-gray-400 text-xs">
        (OR)
      </p>
    </div>
  );
};

export default OrDivider;
