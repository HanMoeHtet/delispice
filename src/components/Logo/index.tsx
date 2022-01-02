import * as React from 'react';
import { Logo as LogoImage } from 'src/assets/images';

interface LogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const Logo: React.FC<LogoProps> = (props) => {
  return (
    <img
      src={LogoImage}
      alt="DeliSpice"
      className="h-20 rounded-full"
      {...props}
    />
  );
};

export default Logo;
