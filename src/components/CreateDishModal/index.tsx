import * as React from 'react';
import { Modal } from 'src/composables/modals';
import { Dish } from 'src/services/firestore/dish';
import CreateDishForm from '../CreateDishForm';
import Close from '../icons/Close';

interface CreateDishModalProps extends React.ComponentProps<typeof Modal> {
  restaurantId: string;
  onComplete: (dish: Dish) => void;
}

const CreateDishModal: React.FC<CreateDishModalProps> = ({
  restaurantId,
  onComplete,
  ...modalProps
}) => {
  return (
    <Modal {...modalProps}>
      <div className="mx-auto sm:w-1/2 bg-white p-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-2xl text-primary">Create New Dish</h3>
          <button onClick={modalProps.onClose} className="">
            <Close aria-label="close" className="h-6 text-gray-500" />
          </button>
        </div>
        <CreateDishForm restaurantId={restaurantId} onComplete={onComplete} />
      </div>
    </Modal>
  );
};

export default CreateDishModal;
