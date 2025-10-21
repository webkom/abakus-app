import { cn } from '@/lib/cn';
import { Portal } from '@gorhom/portal';
import { AnimatePresence, MotiView } from 'moti';
import React, { ComponentProps } from 'react';
import { Pressable, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

type DialogProps = {
  onDismiss?: () => void;
  show?: boolean;
} & ComponentProps<typeof View>;
const Dialog = ({ className, children, onDismiss, show, ...props }: DialogProps) => {
  const start = useSharedValue(0);
  const offset = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(show ? offset.value : 560, {}),
        },
      ],
    };
  });
  const gesture = Gesture.Pan()
    .onUpdate(({ translationY }) => {
      const value = translationY + start.value;
      if (value < 0) {
        return;
      }

      offset.value = value;
    })
    .onEnd(() => {
      if (offset.value <= 100) {
        offset.value = 0;
        start.value = 0;
        return;
      }
      if (offset.value > 100) {
        if (onDismiss) {
          scheduleOnRN(onDismiss);
          offset.value = 0;
          start.value = 0;
        }
      }

      start.value = offset.value;
    });
  return (
    <Portal>
      <View
        className={cn(
          'absolute bottom-0 left-0 z-[100] flex h-screen w-full',
          show ? '' : 'pointer-events-none'
        )}>
        <AnimatePresence>
          {show && (
            <MotiView
              key="background"
              from={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              className={cn('absolute left-0 top-0 h-full w-full bg-black/70')}>
              <Pressable onPress={onDismiss} className="h-full w-full" />
            </MotiView>
          )}
        </AnimatePresence>
        <GestureDetector gesture={gesture}>
          <Animated.View
            style={[
              {
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '100%',
              },
              animatedStyles,
            ]}
            className={'rounded-t-[2rem] bg-background p-10 pt-2'}>
            <View className="mx-auto h-2 w-20 rounded-full bg-gray-300" />
            <View className={cn('h-fit min-h-96 w-full pt-10', className)} {...props}>
              {children}
            </View>
          </Animated.View>
        </GestureDetector>
      </View>
    </Portal>
  );
};

export default Dialog;
