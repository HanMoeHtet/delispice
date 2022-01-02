import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const storage = getStorage();

export const uploadRestaurantPhoto = async (photoUpload: File) => {
  const name = uuidv4();
  const storageRef = ref(storage, `restaurants/${name}`);
  await uploadBytes(storageRef, photoUpload);
  const url = await getDownloadURL(storageRef);

  return url;
};
