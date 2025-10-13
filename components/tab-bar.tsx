import { cn } from '@/lib/cn';
import { Tabs, useRouter } from 'expo-router';
import { CalendarIcon, QrCodeIcon, UserIcon } from 'lucide-react-native';
import { MotiView, useDynamicAnimation } from 'moti';
import React, { ComponentProps } from 'react';
import { Pressable, Text, View } from 'react-native';

// Infer the correct props from one of the lucide icons:
type IconProps = ComponentProps<typeof UserIcon>;
type IconType = React.ComponentType<IconProps>;

type TabBarProps = Parameters<NonNullable<ComponentProps<typeof Tabs>['tabBar']>>[0];
const TabBar = ({ navigation, state, descriptors, insets }: TabBarProps) => {
  const router = useRouter();
  return (
    <View className="bottom-safe-offset-0 px-5">
      <View className="flex w-full flex-row justify-evenly  rounded-full bg-primary-container py-5">
        <TabBarButton
          Icon={UserIcon}
          selected={state.index === 2}
          label="Profil"
          onPress={() => router.push('/authed/(tabs)/profile')}
        />
        <TabBarButton
          Icon={CalendarIcon}
          selected={state.index === 0}
          label="Arrangementer"
          onPress={() => router.push('/authed/(tabs)/events')}
        />
        <TabBarButton
          Icon={QrCodeIcon}
          selected={state.index === 1}
          label="AbaID"
          onPress={() => router.push('/authed/(tabs)/abaid')}
        />
      </View>
    </View>
  );
};

const TabBarButton = ({
  Icon,
  label,
  selected,
  onPress,
}: {
  Icon: IconType;
  label: string;
  selected?: boolean;
  onPress: () => void;
}) => {
  const animation = useDynamicAnimation(() => ({
    width: 0,
  }));

  if (selected) {
    animation.animateTo(() => ({
      width: 70,
      opacity: 1,
    }));
  } else {
    animation.animateTo(() => ({
      width: 0,
      opacity: 0,
    }));
  }
  return (
    <Pressable className="flex flex-col items-center gap-1" onPress={onPress}>
      <View className="relative flex h-10 w-20 items-center justify-center">
        <View className="absolute inset-0 flex items-center justify-center">
          <MotiView
            state={animation}
            className={cn('h-full rounded-full bg-primary')}
            style={{
              borderRadius: 1000,
            }}
          />
        </View>
        <Icon
          color={selected ? '#FFFFFF' : '#733335'}
          size={20}
          className="transition-colors duration-500"
        />
      </View>
      <Text className={cn('text-on-primary-container', selected ? 'font-semibold' : undefined)}>
        {label}
      </Text>
    </Pressable>
  );
};

export default TabBar;
