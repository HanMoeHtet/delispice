import * as React from 'react';
import { Dish } from 'src/services/firestore/dish';
import { RestaurantWithMenu } from 'src/services/firestore/user';
import CreateDishModal from '../CreateDishModal';

interface CreateDishButtonProps {
  restaurant: RestaurantWithMenu;
  onCreated: (dish: Dish) => void;
}

const CreateDishButton: React.FC<CreateDishButtonProps> = ({
  restaurant,
  onCreated,
}) => {
  const [isCreateDishModalOpen, setIsCreateDishModalOpen] =
    React.useState(false);

  return (
    <>
      <button
        className="text-white px-2 py-2 rounded mr-2 bg-tertiary-light hover:bg-tertiary"
        onClick={() => {
          setIsCreateDishModalOpen(true);
        }}
      >
        Create Dish
      </button>
      <CreateDishModal
        isOpen={isCreateDishModalOpen}
        onClose={() => setIsCreateDishModalOpen(false)}
        restaurantId={restaurant.id}
        onComplete={(dish) => {
          onCreated(dish);
          setIsCreateDishModalOpen(false);
        }}
      />
    </>
  );
};

export default CreateDishButton;
