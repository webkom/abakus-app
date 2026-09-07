import { Text } from '@/components/ui/text';
import { DetailedEvent } from '@/lib/types/types';
import { View } from 'react-native';

type TitleSectionProps = {
  event?: DetailedEvent;
  attendeesCount: number;
  totalCapacity?: number;
};

export function TitleSection({ event, attendeesCount, totalCapacity }: TitleSectionProps) {
  const canSignUp = totalCapacity !== undefined;

  return (
    <View className="gap-2">
      <Text className="text-3xl font-bold leading-tight tracking-tight text-foreground">
        {event?.title}
      </Text>
      <Text>{canSignUp ? `${attendeesCount} / ${totalCapacity} påmeldte` : 'Ingen åpen påmelding'}</Text>
    </View>
  );
}
