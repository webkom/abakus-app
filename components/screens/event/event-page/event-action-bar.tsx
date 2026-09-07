import { AttendanceButton } from '@/components/screens/event/attendance-button';
import { Text } from '@/components/ui/text';
import { AnimatePresence, MotiView } from 'moti';
import { ActivityIndicator, View } from 'react-native';

type EventActionBarProps = {
  canSignUp: boolean;
  turnstileToken: string | null;
  isUserSignedUp: boolean;
  eventId: string;
  scroll: number;
  isLoading: boolean;
  onSignUp: () => void;
  onSignOff: () => void;
};

export function EventActionBar({
  canSignUp,
  turnstileToken,
  isUserSignedUp,
  eventId,
  scroll,
  isLoading,
  onSignUp,
  onSignOff,
}: EventActionBarProps) {
  if (!canSignUp) {
    return null;
  }

  return (
    <View className="pb-safe-offset-0 absolute bottom-0 w-full border-t border-border bg-background">
      <AnimatePresence>
        {!turnstileToken && (
          <View className="absolute -top-12 w-full items-center justify-center overflow-hidden">
            <MotiView
              key="verifying-message"
              className="flex-row items-center gap-2 rounded-full bg-secondary px-5 py-2"
              from={{ translateY: 100 }}
              animate={{ translateY: 0 }}
              exit={{ translateY: 100 }}>
              <ActivityIndicator className="text-secondary-foreground" />
              <Text>Verifiserer at du er et menneske</Text>
            </MotiView>
          </View>
        )}
      </AnimatePresence>
      <View className="px-5 py-4">
        <AttendanceButton
          isUserSignedUp={isUserSignedUp}
          eventId={eventId}
          scroll={scroll}
          isLoading={isLoading}
          onSignUp={() => onSignUp()}
          onSignOff={() => onSignOff()}
        />
      </View>
    </View>
  );
}
