import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { db } from '.';
import { getDishesInRestaurant } from './dish';
import { RestaurantNotFoundException } from './user';

export interface Restaurant {
  id: string;
  name: string;
  address: string;
  photo: string;
}

export interface CreateRestaurantData extends Omit<Restaurant, 'id'> {
  userId: string;
  phone: string;
}

export const createRestaurant = async ({
  name,
  address,
  photo,
  userId,
  phone,
}: CreateRestaurantData) => {
  const docRef = await addDoc(collection(db, 'restaurants'), {
    name,
    address,
    photo,
    userId,
    phone,
  });
  return docRef;
};

/**
 * @throws RestaurantNotFoundException
 */
export const getRestaurant = async (id: string) => {
  const docRef = doc(db, 'restaurants', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const restaurant = { ...docSnap.data(), id: docSnap.id } as Restaurant;
    const menu = await getDishesInRestaurant(docSnap.id);
    return {
      ...restaurant,
      menu,
    };
  } else {
    throw new RestaurantNotFoundException();
  }
};

// TODO: check
// export const getRestaurantsInUser = async (userId: string) => {
//   const restaurantsRef = collection(db, 'restaurants');
//   const q = query(restaurantsRef, where('userId', '==', userId));
//   const restaurantDocs = await getDocs(q);

//   const restaurants = await Promise.all(
//     restaurantDocs.docs.map(async (doc) => {
//       const restaurant = doc.data() as Restaurant;
//       const menu = await getDishesInRestaurant(doc.id);

//       return {
//         ...restaurant,
//         menu,
//       };
//     })
//   );

//   return restaurants;
// };
