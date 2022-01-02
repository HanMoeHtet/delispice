import 'dotenv/config';
import '../firebase.service';
import '../firestore';
import { signUpWithEmailAndPassword } from '../firebase-auth.service';
import faker from 'faker';
import { createRestaurant } from '../firestore/restaurant';
import { User } from 'firebase/auth';
import { restaurantImages } from './data.json';
import { addRestaurantToUserData } from '../firestore/user';
import { createDish } from '../firestore/dish';
import fetch from 'node-fetch';

const numUsers = 5;
const numDishesPerRestaurant = 10;

export const run = async () => {
  let newUsers: User[] = [];

  const password = (() => {
    let s = process.env.FAKE_PASSWORD;
    if (s === undefined || s === '') {
      throw new Error('process.env.FAKE_PASSWORD is empty.');
    }
    return s;
  })();

  interface MealType {
    idMeal: string;
    strMealThumb: string;
    strMeal: string;
  }
  const mealResponse = (await (
    await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
  ).json()) as { meals: MealType[] };

  for (let i = 0; i < numUsers; i++) {
    const email = faker.internet.email();

    const newUser = await signUpWithEmailAndPassword(email, password);
    console.log('Created a user.');
    newUsers.push(newUser);

    const newPhoneNumber = faker.phone.phoneNumber();

    const restaurantRef = await createRestaurant({
      address: faker.address.streetAddress(true),
      name: faker.company.companyName(),
      photo: restaurantImages[i % restaurantImages.length],
      userId: newUser.uid,
      phone: newPhoneNumber,
    });
    console.log('Created a restaurant.');

    await addRestaurantToUserData(newUser.uid, restaurantRef);

    const meals = faker.random.arrayElements(
      mealResponse.meals,
      numDishesPerRestaurant
    );

    for (let i = 0; i < meals.length; i++) {
      await createDish({
        restaurantId: restaurantRef.id,
        name: meals[i].strMeal,
        phone: newPhoneNumber,
        photo: meals[i].strMealThumb,
        price: faker.datatype.number({ min: 500, max: 10000 }),
      });
      console.log('Created a dish.');
    }
  }

  process.exit(0);
};

run();
