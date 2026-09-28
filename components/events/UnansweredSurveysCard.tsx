import React from 'react';
import { View, TouchableOpacity, Linking } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Card, CardContent } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import Icon from '@/components/icon';

export interface UnansweredSurveysCardProps {
  unansweredSurveys?: number[];
  isRegistered?: boolean;
  onSurveyClosed?: () => void;
  className?: string;
}

export const UnansweredSurveysCard: React.FC<UnansweredSurveysCardProps> = ({
  unansweredSurveys = [],
  onSurveyClosed,
  className,
}) => {
  if (!unansweredSurveys || unansweredSurveys.length === 0) {
    return null;
  }

  const handleOpenSurvey = async (surveyId: number) => {
    const url = `https://abakus.no/surveys/${surveyId}/answer`;
    try {
      await WebBrowser.openBrowserAsync(url, {
        presentationStyle: WebBrowser.WebBrowserPresentationStyle.PAGE_SHEET,
      });
      onSurveyClosed?.();
    } catch {
      await Linking.openURL(url);
    }
  };

  return (
    <Card className={`w-full border-destructive/30 bg-destructive/10 py-3 ${className ?? ''}`}>
      <CardContent className="flex-col gap-3">
        <View className="flex-row items-center gap-3">
          <View className="h-8 w-8 items-center justify-center rounded-lg bg-destructive/20">
            <Icon name="TriangleAlert" size={16} className="text-destructive" />
          </View>
          <View className="flex-1">
            <Text className="text-xs font-bold uppercase tracking-wider text-destructive">
              Du har ubesvarte spørreundersøkelser
            </Text>
            <Text className="text-xs text-destructive/90">
              Du må svare på disse før du kan melde deg på arrangementet.
            </Text>
          </View>
        </View>

        <View className="gap-2">
          {unansweredSurveys.map((surveyId, index) => (
            <TouchableOpacity
              key={surveyId}
              activeOpacity={0.7}
              onPress={() => handleOpenSurvey(surveyId)}
              className="flex-row items-center justify-between rounded-lg border border-destructive/20 bg-background/80 px-3.5 py-2.5 active:bg-background">
              <View className="flex-row items-center gap-2.5">
                <Icon name="ClipboardList" size={16} className="text-destructive" />
                <Text className="text-xs font-semibold text-foreground">
                  Besvar undersøkelse {unansweredSurveys.length > 1 ? `#${index + 1}` : ''}
                </Text>
              </View>
              <Icon name="ExternalLink" size={14} className="text-muted-foreground" />
            </TouchableOpacity>
          ))}
        </View>
      </CardContent>
    </Card>
  );
};

export default UnansweredSurveysCard;
