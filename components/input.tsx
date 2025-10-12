import { cn } from '@/lib/cn';
import React, { ComponentProps } from 'react';
import { Text, TextInput, View } from 'react-native';

type InputProps = {
  inputProps?: ComponentProps<typeof TextInput>;
  label?: string;
} & ComponentProps<typeof View>;
const Input = ({ label, inputProps, className, ...props }: InputProps) => {
  return (
    <View className={cn('relative min-w-[180px]', className)} {...props}>
      <View className="absolute flex h-full w-full flex-row rounded-3xl">
        <View className="border-outline h-full w-7 rounded-bl-3xl rounded-tl-3xl border-2 border-r-0" />
        <View className="border-outline h-full flex-col justify-between border-b-2">
          {label && <Text className="-translate-y-1/2 px-2.5">{label}</Text>}
        </View>
        <View className="border-outline h-full flex-1 rounded-br-3xl rounded-tr-3xl border-2 border-l-0" />
      </View>
      <TextInput className="text-on-background bg-background/10 h-16  px-5" {...inputProps} />
    </View>
  );
};

export default Input;
