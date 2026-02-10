import { cn } from '@/lib/cn';
import { Tabs, usePathname, useRouter } from 'expo-router';
import { CalendarIcon, QrCodeIcon, UserIcon } from 'lucide-react-native';
import { MotiView, useDynamicAnimation } from 'moti';
import React, { ComponentProps } from 'react';
import { Pressable, View } from 'react-native';
import { Text } from './ui/text';
import Icon from './icon';

// Infer the correct props from one of the lucide icons:
type IconProps = ComponentProps<typeof UserIcon>;
type IconType = React.ComponentType<IconProps>;

type TabBarProps = Parameters<NonNullable<ComponentProps<typeof Tabs>['tabBar']>>[0];
const TabBar = ({ navigation, state, descriptors, insets }: TabBarProps) => {
  const router = useRouter();
  const pathName = usePathname();
  return (
    <View className="bottom-safe-offset-2 absolute w-full px-5">
      <View className="flex w-full flex-row justify-evenly rounded-full border border-border bg-background py-5 shadow-md">
        <TabBarButton
          icon={'QrCode'}
          selected={pathName === '/authed/abaid'}
          label="AbaID"
          onPress={() => router.push('/authed/(tabs)/abaid')}
        />
        <TabBarButton
          icon={'Calendar'}
          selected={pathName === '/authed/events'}
          label="Arrangementer"
          onPress={() => router.push('/authed/(tabs)/events')}
        />

        <TabBarButton
          icon={'User'}
          selected={pathName === '/authed/profile'}
          label="Profil"
          onPress={() => router.push('/authed/(tabs)/profile')}
        />
      </View>
    </View>
  );
};

const TabBarButton = ({
  icon,
  label,
  selected,
  onPress,
}: {
  icon: ComponentProps<typeof Icon>['name'];
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
    <Pressable className="flex flex-col items-center gap-0.5" onPress={onPress}>
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
          name={icon}
          size={20}
          className={cn(selected ? 'text-primary-foreground' : 'text-card-foreground')}
        />
      </View>
      <Text className={cn('text-card-foreground', selected ? 'font-semibold' : undefined)}>
        {label}
      </Text>
    </Pressable>
  );
};

export default TabBar;
