import {
  doc,
  DocumentReference,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '.';
import { Dish, getDishesInRestaurant } from './dish';
import { Restaurant } from './restaurant';

export interface UserDataRaw {
  restaurant: DocumentReference;
}

export const isUserDataRaw = (data: {}): data is UserDataRaw => {
  return 'restaurant' in data;
};

export interface RestaurantWithMenu extends Restaurant {
  menu: Dish[];
}

export interface UserData {
  restaurant: RestaurantWithMenu;
}

export class RestaurantNotFoundException extends Error {}

export const createNewUserData = async (userId: string) => {
  const docRef = doc(db, 'users', userId);
  await setDoc(docRef, {});
};

export const addRestaurantToUserData = async (
  userId: string,
  restaurantRef: DocumentReference
) => {
  const docRef = doc(db, 'users', userId);
  await updateDoc(docRef, {
    restaurant: restaurantRef,
  });
};

/**
 * @throws RestaurantNotFoundException
 */
export const getUserData = async (id: string) => {
  const docRef = doc(db, 'users', id);
  const docSnap = await getDoc(docRef);

  let userDataRaw;

  if (docSnap.exists()) {
    userDataRaw = docSnap.data();
  } else {
    await createNewUserData(id);
    userDataRaw = {};
  }

  if (isUserDataRaw(userDataRaw)) {
    let restaurantDoc;
    restaurantDoc = await getDoc(userDataRaw.restaurant);

    const dishes = await getDishesInRestaurant(restaurantDoc.id);
    const restaurant = {
      ...({
        ...restaurantDoc.data(),
        id: restaurantDoc.id,
      } as RestaurantWithMenu),
      menu: dishes,
    };
    return {
      ...userDataRaw,
      restaurant,
    };
  } else {
    throw new RestaurantNotFoundException();
  }
};
