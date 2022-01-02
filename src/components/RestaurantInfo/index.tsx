import * as React from 'react';
import { useAuth } from 'src/composables/auth';
import { Restaurant } from 'src/services/firestore/restaurant';
import { theme } from 'src/theme';
import Location from '../icons/Location';
import Mail from '../icons/Mail';

interface RestaurantInfoProps {
  restaurant: Restaurant;
}

const RestaurantInfo: React.FC<RestaurantInfoProps> = ({ restaurant }) => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col-reverse sm:flex-row rounded overflow-hidden mb-5">
      <div className="flex flex-col sm:w-1/2 bg-white py-5 px-5">
        <h2
          className="font-bold text-3xl mb-4 sm:mb-auto"
          style={{ color: theme.colors.primary }}
        >
          {restaurant.name}
        </h2>
        {user && (
          <div className="flex mb-4">
            <Mail className="h-4 mr-4" />
            <p className="text-sm">{user.email}</p>
          </div>
        )}
        <div className="flex">
          <Location className="h-4 mr-4" />
          <p className="text-sm">{restaurant.address}</p>
        </div>
      </div>
      <div className="sm:w-1/2">
        <img src={restaurant.photo} alt={restaurant.name} className="w-full" />
      </div>
    </div>
  );
};

export default RestaurantInfo;
