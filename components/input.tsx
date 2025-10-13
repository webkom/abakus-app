import { cn } from '@/lib/cn';
import { AnimatePresence, MotiView } from 'moti';
import React, { ComponentProps } from 'react';
import { Text, TextInput, View } from 'react-native';

type InputProps = {
  inputProps?: ComponentProps<typeof TextInput>;
  label?: string;
  error?: string;
} & ComponentProps<typeof View>;
const Input = ({ error, label, inputProps, className, ...props }: InputProps) => {
  return (
    <View className={cn('min-w-[180px]', className)} {...props}>
      <View className={cn('relative min-w-[180px]')}>
        <View className="absolute flex h-full w-full flex-row rounded-3xl">
          <View
            className={cn(
              'h-full w-7 rounded-bl-3xl rounded-tl-3xl border-2 border-r-0 border-outline',
              error ? 'border-error' : undefined
            )}
          />
          <View
            className={cn(
              'h-full flex-col justify-between border-b-2 border-outline',
              label === undefined ? 'border-t-2' : undefined,
              error ? 'border-error' : undefined
            )}>
            {label && (
              <Text
                className={cn(
                  'z-20 -translate-y-1/2 px-2.5 font-semibold text-outline',
                  error ? 'text-error' : undefined
                )}>
                {label}
              </Text>
            )}
          </View>
          <View
            className={cn(
              'h-full flex-1 rounded-br-3xl rounded-tr-3xl border-2 border-l-0 border-outline',
              error ? 'border-error' : undefined
            )}
          />
        </View>
        <TextInput
          className="h-16 overflow-hidden rounded-3xl bg-background/10 px-5 text-on-background"
          selectionColor={'#904a4b'}
          {...inputProps}
        />
      </View>
      <AnimatePresence>
        {error && (
          <MotiView
            key="error-label"
            from={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: 18,
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            className="left-5 translate-y-full">
            <Text className="text-error">{error}</Text>
          </MotiView>
        )}
      </AnimatePresence>
    </View>
  );
};

export default Input;
