import { View, Text } from 'react-native';
import React from 'react';
import { Card } from '@/components/ui/card';
import { components } from '@/lib/types/schema';

type RegistrationPoolsProps = {
  pools: components['schemas']['PoolRead'][];
};
const RegistrationPools = () => {
  return (
    <View>
      <Card></Card>
    </View>
  );
};

export default RegistrationPools;
