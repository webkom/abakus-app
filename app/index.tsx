import { Redirect } from 'expo-router';
import React from 'react';

// Start environment variable validation
import 'env';

const Page = () => {
  return <Redirect href="/non-authed/sign-in" />;
};

export default Page;
