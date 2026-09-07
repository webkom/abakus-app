import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import Card from '@/components/card';
import Icon from '@/components/icon';
import env from 'env';

interface UnansweredSurveysCardProps {
  unansweredSurveys?: number[];
  isRegistered?: boolean;
}

export const UnansweredSurveysCard: React.FC<UnansweredSurveysCardProps> = ({
  unansweredSurveys = [],
  isRegistered = false,
}) => {
  if (!unansweredSurveys || unansweredSurveys.length === 0) {
    return null;
  }

  const handleOpenSurvey = (surveyId: number) => {
    const webUrl = env.EXPO_PUBLIC_API_URL?.replace('/api/v1', '') || 'https://abakus.no';
    const url = `${webUrl}/surveys/${surveyId}/answer`;
    Linking.openURL(url).catch((err) => console.error('Could not open survey URL', err));
  };

  return (
    <Card className="border-l-4 border-l-red-600 bg-red-50 p-4">
      <View className="flex-row items-start gap-3">
        <Icon name="TriangleAlert" size={24} className="mt-0.5 text-red-600" />
        <View className="flex-1">
          <Text className="text-base font-bold text-red-800">
            Ubesvarte spørreundersøkelser
          </Text>
          <Text className="mt-1 text-sm text-red-700">
            Du kan ikke melde deg {isRegistered ? 'av' : 'på'} dette arrangementet fordi du har ubesvarte spørreundersøkelser.
          </Text>
          <View className="mt-3 flex-col gap-2">
            {unansweredSurveys.map((surveyId, index) => (
              <TouchableOpacity
                key={surveyId}
                onPress={() => handleOpenSurvey(surveyId)}
                className="flex-row items-center gap-2 rounded-lg bg-red-100 px-3 py-2 active:bg-red-200"
              >
                <Icon name="ClipboardList" size={16} className="text-red-700" />
                <Text className="text-sm font-semibold text-red-800">
                  Besvar undersøkelse {index + 1}
                </Text>
                <Icon name="ExternalLink" size={14} className="ml-auto text-red-600" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Card>
  );
};
