import * as React from 'react';
import { useParams } from 'react-router-dom';
import Menu from 'src/components/Menu';
import RestaurantInfo from 'src/components/RestaurantInfo';
import { useAuth } from 'src/composables/auth';
import MainLayout from 'src/layouts/MainLayout';
import { getRestaurant } from 'src/services/firestore/restaurant';
import { RestaurantWithMenu } from 'src/services/firestore/user';

interface RestaurantPageProps {}

const RestaurantPage: React.FC<RestaurantPageProps> = () => {
  const { isLoading: isAuthLoding } = useAuth();
  const [restaurant, setRestaurant] = React.useState<RestaurantWithMenu | null>(
    null
  );
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const [isRestaurantLoading, setIsRestaurantLoading] = React.useState(true);

  const isLoading = () => {
    return isAuthLoding || isRestaurantLoading;
  };

  React.useEffect(() => {
    (async () => {
      if (!restaurantId) {
        return;
      }
      try {
        setIsRestaurantLoading(true);
        const restaurant = await getRestaurant(restaurantId);
        setRestaurant(restaurant);
      } catch (err) {
        // TODO: handle error
        console.error(err);
      } finally {
        setIsRestaurantLoading(false);
      }
    })();
  }, [restaurantId]);

  if (isLoading()) {
    return <div>Loading ...</div>;
  }

  if (!restaurant) {
    return <p>Restaurant Not Found</p>;
  }

  return (
    <MainLayout>
      <RestaurantInfo restaurant={restaurant} />
      <Menu restaurant={restaurant} />
    </MainLayout>
  );
};

export default RestaurantPage;
