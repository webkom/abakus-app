import { Link } from 'expo-router';
import React from 'react';
import { Button, Text, View } from 'react-native';

const Page = () => {
  return (
    <View className="flex flex-col gap-10">
      <Text className="text-3xl font-bold">Do not put anything on this page</Text>
      <Text>Mor di</Text>
      <Link href="/authed/(tabs)/events">
        <Text>Go to events page</Text>
      </Link>
      <Link href="/non-authed/sign-in">
        <Text>Go to sign-in page</Text>
      </Link>
    </View>
  );
};

export default Page;
