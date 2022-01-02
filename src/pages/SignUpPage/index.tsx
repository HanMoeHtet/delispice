import * as React from 'react';
import { useSearchParams } from 'react-router-dom';
import RestaurantForm from 'src/components/RestaurantForm';
import SignUpForm from 'src/components/SignUpForm';
import { Auth, Guest } from 'src/composables/auth';
import AuthLayout from 'src/layouts/AuthLayout';

export enum SignUpStep {
  REGISTER = 'register',
  CREATE_RESTAURANT = 'restaurant',
}

const isSignUpStep = (step: string): step is SignUpStep => {
  return Object.values(SignUpStep).includes(step as SignUpStep);
};

const validateStep = (step: string | null) => {
  if (step !== null && isSignUpStep(step)) {
    return step;
  } else {
    return SignUpStep.REGISTER;
  }
};

interface SignUpPageProps {}

const SignUpPage: React.FC<SignUpPageProps> = () => {
  const [searchParams] = useSearchParams();
  const [step, setStep] = React.useState<SignUpStep>(
    validateStep(searchParams.get('step'))
  );

  React.useEffect(() => {
    setStep(validateStep(searchParams.get('step')));
  }, [searchParams]);

  const renderSignUpForm = () => {
    return (
      <Guest>
        <AuthLayout>
          <SignUpForm />
        </AuthLayout>
      </Guest>
    );
  };

  const renderRestaurantForm = () => {
    return (
      <Auth>
        <AuthLayout>
          <RestaurantForm />
        </AuthLayout>
      </Auth>
    );
  };

  switch (step) {
    case SignUpStep.REGISTER:
      return renderSignUpForm();
    case SignUpStep.CREATE_RESTAURANT:
      return renderRestaurantForm();
    default:
      throw new Error('Invalid step');
  }
};

export default SignUpPage;
