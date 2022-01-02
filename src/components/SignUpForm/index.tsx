import { Form, Formik, FormikConfig } from 'formik';
import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  signInWithGoogle,
  signUpWithEmailAndPassword,
} from 'src/services/firebase-auth.service';
import * as yup from 'yup';
import Input from '../Input';
import OrDivider from '../OrDivider';
import SignInWithGoogle from '../SignInWithGoogleButton';
import Spinner from '../Spinner';

const signUpFormSchema = yup.object().shape({
  email: yup.string().email().required().label('Email'),
  password: yup.string().required().min(8).label('Password'),
  password_confirmation: yup
    .string()
    .required()
    .equals([yup.ref('password')], 'Passwords do not match')
    .label('Password'),
});

interface FormData {
  email: string;
  password: string;
  password_confirmation: string;
}

const initialFormData = Object.freeze({
  email: '',
  password: '',
  password_confirmation: '',
});

interface SignUpFormProps {}

const SignUpForm: React.FC<SignUpFormProps> = () => {
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  const clear = () => {
    setErrorMessage('');
  };

  const handleSubmit: FormikConfig<FormData>['onSubmit'] = async (
    values,
    { setErrors }
  ) => {
    try {
      setErrors({});
      clear();
      await signUpWithEmailAndPassword(values.email, values.password);
    } catch (err) {
      setErrorMessage((err as Error).message);
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-4 sm:px-8 pt-6 pb-8">
      <div className="text-center mb-8">
        <h2 className="text-gray-700 text-3xl font-bold mb-3">Sign Up</h2>
        {errorMessage !== '' && (
          <p className="text-red-500 italic">{errorMessage}</p>
        )}
      </div>
      <Formik<FormData>
        initialValues={initialFormData}
        validationSchema={signUpFormSchema}
        onSubmit={handleSubmit}
        validateOnChange={false}
      >
        {({
          values,
          errors,
          handleChange,
          isSubmitting,
          touched,
          handleBlur,
        }) => {
          const checkError = <T extends keyof FormData>(field: T) => {
            if (touched[field]) return errors[field];
          };

          return (
            <Form noValidate>
              <Input
                id="email"
                label="Email"
                name="email"
                type="email"
                placeholder="yourname@domain.com"
                required
                autoComplete="email"
                value={values.email}
                errorMessage={checkError('email')}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                id="password"
                label="Password"
                name="password"
                type="password"
                required
                autoComplete="new-password"
                value={values.password}
                errorMessage={checkError('password')}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Input
                id="password_confirmation"
                label="Confirm Password"
                name="password_confirmation"
                type="password"
                required
                autoComplete="new-password"
                value={values.password_confirmation}
                errorMessage={checkError('password_confirmation')}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div className="flex flex-col gap-y-4 sm:flex-row sm:gap-y-0 justify-between items-center">
                <Link
                  to="/login"
                  className="text-blue-500 font-bold hover:text-blue-700 hover:underline"
                >
                  Already have an account?
                </Link>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <Spinner /> : 'Continue'}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
      <OrDivider />
      <SignInWithGoogle
        className="mx-auto max-w-full"
        style={{
          lineHeight: 'unset !important',
        }}
        label="Continue with Google"
        onClick={async () => {
          clear();
          await signInWithGoogle();
        }}
      />
    </div>
  );
};

export default SignUpForm;
