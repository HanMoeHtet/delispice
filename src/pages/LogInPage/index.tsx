import * as React from 'react';
import LogInForm from 'src/components/LogInForm';
import AuthLayout from 'src/layouts/AuthLayout';

interface LogInPageProps {}

const LogInPage: React.FC<LogInPageProps> = () => {
  return (
    <AuthLayout>
      <LogInForm />
    </AuthLayout>
  );
};

export default LogInPage;
