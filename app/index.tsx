import { Link } from 'expo-router';
import React from 'react';
import { Button, Text, View } from 'react-native';

const Page = () => {
  return (
    <View className="flex flex-col gap-5">
      <Text className="text-3xl font-bold">Do not put anything on this page</Text>
      <Link href="/authed/(tabs)/events" asChild>
        <Button title="Go to events page" />
      </Link>
      <Link href="/non-authed/sign-in" asChild>
        <Button title="Go to sign-in page" />
      </Link>
    </View>
  );
};

export default Page;
