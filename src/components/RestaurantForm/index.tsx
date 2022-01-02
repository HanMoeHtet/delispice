import { Formik, FormikConfig } from 'formik';
import { motion } from 'framer-motion';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext, useAuth } from 'src/composables/auth';
import { uploadRestaurantPhoto } from 'src/services/firebase-storage.service';
import { createRestaurant } from 'src/services/firestore/restaurant';
import {
  addRestaurantToUserData,
  getUserData,
} from 'src/services/firestore/user';
import * as yup from 'yup';
import Input from '../Input';
import PhotoInput from '../PhotoInput';
import Spinner from '../Spinner';
import TextArea from '../TextArea';

const restaurantFormSchema = yup.object().shape({
  restaurantName: yup
    .string()
    .required()
    .min(3)
    .max(30)
    .label('Restaurant Name'),
  phone: yup
    .string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    ),
  address: yup.string().required().min(10).max(500).label('Address'),
  photoURL: yup
    .string()
    .optional()
    .test('photoURL', 'Upload a photo or enter a valid URL', function (value) {
      const { photoUpload } = this.parent;
      if (!photoUpload && !value) {
        return false;
      }
      return true;
    })
    .label('Photo URL'),
  photoUpload: yup.mixed().optional().label('Image File'),
});

interface FormData {
  restaurantName: string;
  phone: string;
  address: string;
  photoURL: string;
  photoUpload: File | null;
}

const initialFormData: FormData = Object.freeze({
  restaurantName: '',
  phone: '',
  address: '',
  photoURL: '',
  photoUpload: null,
});

interface RestaurantFormProps {}

const RestaurantForm: React.FC<RestaurantFormProps> = () => {
  const { user } = useAuth();
  const { setUser } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = React.useState<string>('');

  const clear = () => {
    setErrorMessage('');
  };

  if (user === null) {
    throw new Error('User is null');
  }

  const handleSubmit: FormikConfig<FormData>['onSubmit'] = async (
    { restaurantName, address, photoURL, photoUpload, phone },
    { setErrors }
  ) => {
    if (photoUpload) {
      try {
        photoURL = await uploadRestaurantPhoto(photoUpload);
      } catch (err) {
        setErrorMessage((err as Error).message);
      }
    }

    if (photoURL) {
      try {
        setErrors({});
        clear();
        const docRef = await createRestaurant({
          name: restaurantName,
          address,
          photo: photoURL,
          userId: user.uid,
          phone,
        });
        await addRestaurantToUserData(user.uid, docRef);
        const userData = await getUserData(user.uid);
        setUser({
          ...user,
          data: userData,
        });
        navigate(`/restaurants/${userData.restaurant.id}`);
      } catch (err) {
        setErrorMessage((err as Error).message);
      }
    }
  };

  return (
    <motion.div
      className="bg-white shadow-md rounded px-8 pt-6 pb-8"
      initial={{ translateX: '90%' }}
      animate={{ translateX: 0 }}
      transition={{
        duration: 0.5,
        ease: 'easeInOut',
      }}
    >
      <div className="text-center mb-8">
        <h2 className="text-gray-700 text-3xl font-bold mb-3">
          Link your restaurant
        </h2>
        {errorMessage !== '' && (
          <p className="text-red-500 italic">{errorMessage}</p>
        )}
      </div>
      <Formik<FormData>
        initialValues={initialFormData}
        validationSchema={restaurantFormSchema}
        onSubmit={handleSubmit}
        validateOnChange={false}
      >
        {({
          values,
          errors,
          isSubmitting,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
        }) => {
          const checkError = <T extends keyof FormData>(field: T) => {
            if (touched[field]) return errors[field];
          };

          return (
            <form onSubmit={handleSubmit} noValidate>
              <Input
                id="restaurant-name"
                label="Restaurant Name"
                name="restaurantName"
                type="text"
                required
                value={values.restaurantName}
                errorMessage={checkError('restaurantName')}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                id="phone"
                label="Phone Number"
                name="phone"
                type="tel"
                required
                value={values.phone}
                errorMessage={checkError('phone')}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <TextArea
                id="restaurant-address"
                label="Address"
                name="address"
                required
                rows={3}
                autoComplete="address"
                value={values.address}
                errorMessage={checkError('address')}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <PhotoInput
                photoURL={values.photoURL || ''}
                onPhotoURLChange={handleChange}
                photoUpload={values.photoUpload}
                onPhotoUploadChange={(e) => {
                  setFieldValue('photoUpload', e.target.files![0], true);
                }}
                onPhotoUploadRemove={() => {
                  setFieldValue('photoUpload', null, true);
                }}
                onBlur={handleBlur}
                errorMessage={
                  checkError('photoURL') || checkError('photoUpload')
                }
              />
              <div className="flex justify-end">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <Spinner /> : 'Create'}
                </button>
              </div>
            </form>
          );
        }}
      </Formik>
    </motion.div>
  );
};

export default RestaurantForm;
