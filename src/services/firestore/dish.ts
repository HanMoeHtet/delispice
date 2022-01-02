import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { db } from '.';

export interface Dish {
  id: string;
  name: string;
  phone: string;
  photo: string;
  price: number;
  restaurantId: string;
}

export const getDishesInRestaurant = async (restaurantId: string) => {
  const menuRef = collection(db, 'dishes');
  const q = query(menuRef, where('restaurantId', '==', restaurantId));
  const dishDocs = await getDocs(q);
  const dishes = dishDocs.docs.map((dishDoc) => {
    return { ...dishDoc.data(), id: dishDoc.id } as Dish;
  });
  return dishes;
};

export interface CreateDishData extends Omit<Dish, 'id'> {}

export const createDish = async ({
  name,
  phone,
  photo,
  price,
  restaurantId,
}: CreateDishData) => {
  const docRef = await addDoc(collection(db, 'dishes'), {
    name,
    price,
    photo,
    phone,
    restaurantId,
  });
  return docRef;
};
