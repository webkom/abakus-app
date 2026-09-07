import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Card from '@/components/card';
import Icon from '@/components/icon';

interface AllergyWarningBannerProps {
  hasAllergiesOrPreferences?: boolean;
}

export const AllergyWarningBanner: React.FC<AllergyWarningBannerProps> = ({
  hasAllergiesOrPreferences = true,
}) => {
  const router = useRouter();

  if (hasAllergiesOrPreferences) {
    return null;
  }

  return (
    <Card className="border-l-4 border-l-amber-500 bg-amber-50 p-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-3 flex-1">
          <Icon name="Utensils" size={20} className="text-amber-600" />
          <Text className="text-sm font-medium text-amber-900 flex-1">
            Husk å oppdatere matallergier og preferanser i din profil!
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => router.push('/authed/(tabs)/profile')}
          className="ml-2 rounded-full bg-amber-200 px-3 py-1.5 active:bg-amber-300"
        >
          <Text className="text-xs font-semibold text-amber-900">Endre profile</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
};
