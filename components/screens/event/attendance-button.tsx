import Icon from '@/components/icon';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/cn';
import { AnimatePresence, MotiView } from 'moti';
import { useState } from 'react';
import { ActivityIndicator, LayoutChangeEvent, View } from 'react-native';

type AttendanceButtonProps = {
  isUserSignedUp: boolean;
  eventId: string;
  scroll: number;
  isLoading: boolean;
  onSignUp: (eventId: string) => Promise<void> | undefined;
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
  const [containerWidth, setContainerWidth] = useState(0);
  const [small, setSmall] = useState(false);
  const handlePress = () => {
    if (isUserSignedUp) {
      onSignOff(eventId);
      return;
    }

    setSmall(true);

    onSignUp(eventId)?.then(() => {
      setSmall(false);
    });
  };

  const handleLayout = (e: LayoutChangeEvent) => {
    const width = e.nativeEvent.layout.width;
    if (width > 0 && width !== containerWidth) {
      setContainerWidth(width);
    }
  };

  return (
    <View className="flex w-full items-center justify-center" onLayout={handleLayout}>
      {containerWidth > 0 && (
        <MotiView
          className="w-full"
          animate={{
            width: small ? 45 : containerWidth,
            opacity: 1,
          }}
          transition={{ type: 'spring' }}>
          <Button
            size="lg"
            className={cn('h-16 w-full text-nowrap rounded-full shadow-md', '')}
            variant={isUserSignedUp ? 'destructive' : 'default'}
            disabled={isLoading}
            onPress={handlePress}>
            {isLoading ? (
              <ActivityIndicator size="small" className="text-primary-foreground" />
            ) : isUserSignedUp ? (
              <MotiView
                className="flex-row items-center gap-2"
                from={{ opacity: 0, translateY: 10 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: 10 }}
                transition={{ delay: 150, duration: 100 }}>
                <MotiView animate={{ rotate: `${scroll}deg` }}>
                  <Icon name="X" className="text-secondary-foreground" size={18} />
                </MotiView>
                <Text className="text-nowrap text-lg font-bold text-secondary-foreground">
                  Meld deg av
                </Text>
              </MotiView>
            ) : (
              <MotiView
                className="flex-row items-center gap-2"
                from={{ opacity: 0, translateY: 10 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: 10 }}
                transition={{ delay: 500 }}>
                <MotiView animate={{ rotate: `${scroll}deg` }}>
                  <Icon name="Ticket" className="text-primary-foreground" size={18} />
                </MotiView>
                <Text className="whitespace-nowrap text-nowrap text-lg font-bold text-primary-foreground">
                  Meld deg på
                </Text>
              </MotiView>
            )}
          </Button>
        </MotiView>
      )}
    </View>
  );
}
