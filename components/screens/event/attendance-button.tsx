import Icon from '@/components/icon';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { MotiView } from 'moti';
import { ActivityIndicator, View } from 'react-native';

type AttendanceButtonProps = {
  isUserSignedUp: boolean;
  eventId: string;
  scroll: number;
  isLoading: boolean;
  onSignUp: (eventId: string) => void;
  onSignOff: (eventId: string) => void;
};

export function AttendanceButton({
  isUserSignedUp,
  eventId,
  scroll,
  isLoading,
  onSignUp,
  onSignOff,
}: AttendanceButtonProps) {
  const handlePress = () => {
    if (isUserSignedUp) {
      onSignOff(eventId);
      return;
    }

    onSignUp(eventId);
  };

  return (
    <Button
      size="lg"
      className="h-16 w-full rounded-full shadow-md"
      variant={isUserSignedUp ? 'destructive' : 'default'}
      disabled={isLoading}
      onPress={handlePress}>
      {isLoading ? (
        <ActivityIndicator size="small" className="text-primary-foreground" />
      ) : isUserSignedUp ? (
        <View className="flex-row items-center gap-2">
          <MotiView animate={{ rotate: `${scroll}deg` }}>
            <Icon name="X" className="text-primary-foreground" size={18} />
          </MotiView>
          <Text className="text-lg font-bold text-primary-foreground">Meld deg av</Text>
        </View>
      ) : (
        <View className="flex-row items-center gap-2">
          <MotiView animate={{ rotate: `${scroll}deg` }}>
            <Icon name="Ticket" className="text-primary-foreground" size={18} />
          </MotiView>
          <Text className="text-lg font-bold text-primary-foreground">Meld deg på</Text>
        </View>
      )}
    </Button>
  );
}
