import Icon from '@/components/icon';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { View } from 'react-native';

type ErrorStateProps = {
  onBack: () => void;
};

export function ErrorState({ onBack }: ErrorStateProps) {
  return (
    <View className="flex-1 items-center justify-center bg-background px-6">
      <View className="items-center gap-4">
        <View className="h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <Icon name="FileWarning" size={32} className="text-destructive" />
        </View>
        <View className="gap-1">
          <Text className="text-center text-xl font-semibold">Fant ikke arrangementet</Text>
          <Text className="text-center text-muted-foreground">
            Det kan ha blitt fjernet, eller du mangler tilgang.
          </Text>
        </View>
        <Button variant="outline" onPress={onBack} className="mt-4">
          <Text>Gå tilbake</Text>
        </Button>
      </View>
    </View>
  );
}
