import * as React from 'react';
import { Dish as DishType } from 'src/services/firestore/dish';
import { theme } from 'src/theme';
import Phone from '../icons/Phone';

interface DishProps extends DishType {}

const Dish: React.FC<DishProps> = ({ name, phone, photo, price }) => {
  return (
    <div className="w-full rounded overflow-hidden">
      <img src={photo} alt={name} className="" />
      <div className="bg-gray-100 p-3">
        <h4
          className="text-lg font-bold mb-4"
          style={{ color: theme.colors.tertiary }}
        >
          {name[0].toUpperCase() + name.slice(1)}
        </h4>
        <p className="mb-3">
          <span className="text-xs mr-1">MMK</span>{' '}
          <span>{price.toFixed()}</span>
        </p>
        <div className="flex items-center">
          <Phone className="h-4 mr-3" />
          <p>{phone}</p>
        </div>
      </div>
    </div>
  );
};

export default Dish;
