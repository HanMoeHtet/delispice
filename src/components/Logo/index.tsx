import * as React from 'react';
import { Logo as LogoImage } from 'src/assets/images';

interface LogoProps {}

const Logo: React.FC<LogoProps> = () => {
  return <img src={LogoImage} alt="DeliSpice" className="h-20 rounded-full" />;
};

export default Logo;
