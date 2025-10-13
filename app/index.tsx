import { Link } from 'expo-router';
import React from 'react';
import { Button, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Page = () => {
  return (
    <SafeAreaView className="flex flex-col gap-5 px-5 py-10">
      <Text className="text-3xl font-bold">Do not put anything on this page</Text>
      <Link href="/authed/(tabs)/events" asChild>
        <Button title="Go to events page" />
      </Link>
      <Link href="/non-authed/sign-in" asChild>
        <Button title="Go to sign-in page" />
      </Link>
      <Link href="/non-authed/onboarding" asChild>
        <Button title="Go to Onboarding page" />
      </Link>
    </SafeAreaView>
  );
};

export default Page;
