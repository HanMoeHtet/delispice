import * as React from 'react';
import { uploadRestaurantPhoto } from 'src/services/firebase-storage.service';
import { createDish, Dish } from 'src/services/firestore/dish';
import * as yup from 'yup';
import { Form, Formik, FormikConfig } from 'formik';
import Input from '../Input';
import PhotoInput from '../PhotoInput';
import Spinner from '../Spinner';

const createDishSchema = yup.object().shape({
  name: yup.string().required().min(3).max(30).label('Dish Name'),
  price: yup.number().min(50).max(999999),
  phone: yup
    .string()
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    ),
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
  name: string;
  price: string;
  phone: string;
  photoURL: string;
  photoUpload: File | null;
}

const initialFormData: FormData = {
  name: '',
  price: '',
  phone: '',
  photoURL: '',
  photoUpload: null,
};

interface CreateDishFormProps {
  restaurantId: string;
  onComplete: (dish: Dish) => void;
}

const CreateDishForm: React.FC<CreateDishFormProps> = ({
  restaurantId,
  onComplete,
}) => {
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  const clear = () => {
    setErrorMessage('');
  };

  const handleSubmit: FormikConfig<FormData>['onSubmit'] = async (
    { price, name, photoURL, photoUpload, phone },
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
        const newDishData = {
          name,
          phone,
          price: Number(price),
          photo: photoURL,
          restaurantId,
        };
        const dishRef = await createDish(newDishData);
        onComplete({
          ...newDishData,
          id: dishRef.id,
        });
      } catch (err) {
        setErrorMessage((err as Error).message);
      }
    }
  };

  return (
    <Formik<FormData>
      initialValues={initialFormData}
      validationSchema={createDishSchema}
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
          <Form>
            {errorMessage !== '' && (
              <p className="text-red-500 italic">{errorMessage}</p>
            )}
            <Input
              id="dish-name"
              label="Dish Name"
              name="name"
              type="text"
              required
              autoComplete="off"
              value={values.name}
              errorMessage={checkError('name')}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              id="price"
              label="Price"
              name="price"
              type="number"
              required
              min={1}
              max={9999999}
              onWheel={(e) => e.currentTarget.blur()}
              autoComplete="off"
              value={values.price}
              errorMessage={checkError('price')}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Input
              id="phone"
              label="Phone Number"
              name="phone"
              type="tel"
              pattern="[0-9]*"
              required
              autoComplete="phone-number"
              value={values.phone}
              errorMessage={checkError('phone')}
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
              errorMessage={checkError('photoURL') || checkError('photoUpload')}
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
          </Form>
        );
      }}
    </Formik>
  );
};

export default CreateDishForm;
