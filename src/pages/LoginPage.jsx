import React from 'react';
import { Helmet } from 'react-helmet-async';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>כניסה למערכת | מערכת גורם מפנה</title>
        <meta name="description" content="כניסה למערכת גורם מפנה" />
      </Helmet>
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-lg shadow-lg">
          <div className="text-center">
            <h1 className="text-2xl font-bold">כניסה למערכת</h1>
            <p className="mt-2 text-muted-foreground">הזן את פרטי הכניסה שלך</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
