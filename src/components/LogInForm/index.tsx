import { Form, Formik, FormikConfig } from 'formik';
import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  signInWithGoogle,
} from 'src/services/firebase-auth.service';
import * as yup from 'yup';
import Input from '../Input';
import OrDivider from '../OrDivider';
import SignInWithGoogle from '../SignInWithGoogleButton';
import Spinner from '../Spinner';

const logInFormSchema = yup.object().shape({
  email: yup.string().email().required().label('Email'),
  password: yup.string().required().label('Password'),
});

interface FormData {
  email: string;
  password: string;
}

const initialFormData = {
  email: '',
  password: '',
};

interface LogInFormProps {}

const LogInForm: React.FC<LogInFormProps> = () => {
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
      await signInWithEmailAndPassword(values.email, values.password);
    } catch (err) {
      setErrorMessage((err as Error).message);
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">
      <div className="text-center mb-8">
        <h2 className="text-gray-700 text-3xl font-bold mb-3">Log In</h2>
        {errorMessage !== '' && (
          <p className="text-red-500 italic">{errorMessage}</p>
        )}
      </div>
      <Formik<FormData>
        initialValues={initialFormData}
        validationSchema={logInFormSchema}
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
                autoComplete="current-password"
                value={values.password}
                errorMessage={checkError('password')}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div className="flex justify-between items-center">
                <Link
                  to="/signup"
                  className="text-blue-500 font-bold hover:text-blue-700 hover:underline"
                >
                  Create an account
                </Link>
                <button
                  className="bg-blue-500 hover:bg-blue-700 disabled:bg-blue-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <Spinner /> : 'Sign In'}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
      <OrDivider />
      <SignInWithGoogle
        className="mx-auto"
        label="Continue with Google"
        onClick={async () => {
          clear();
          await signInWithGoogle();
        }}
      />
    </div>
  );
};

export default LogInForm;
