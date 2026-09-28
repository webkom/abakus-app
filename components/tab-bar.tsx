import { iconWithClassName } from '@/lib/iconWithClassName';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { Tabs, usePathname, useRouter } from 'expo-router';
import { CalendarIcon, QrCodeIcon, UserIcon } from 'lucide-react-native';
import { MotiView, useDynamicAnimation } from 'moti';
import React, { ComponentProps } from 'react';
import { Pressable, View } from 'react-native';

iconWithClassName(QrCodeIcon);
iconWithClassName(CalendarIcon);
iconWithClassName(UserIcon);

// Infer the correct props from one of the lucide icons:
type IconProps = ComponentProps<typeof UserIcon>;
type IconType = React.ComponentType<IconProps>;

type TabBarProps = Parameters<NonNullable<ComponentProps<typeof Tabs>['tabBar']>>[0];

const TabBar = ({ navigation, state, descriptors, insets }: TabBarProps) => {
  const router = useRouter();
  const pathName = usePathname();

  return (
    <View className="bottom-safe-offset-2 bg-background px-5">
      <View className="flex w-full flex-row justify-evenly rounded-full border border-border bg-card py-3 shadow-sm">
        <TabBarButton
          Icon={QrCodeIcon}
          selected={pathName.includes('abaid')}
          label="AbaID"
          onPress={() => router.push('/authed/(tabs)/abaid')}
        />
        <TabBarButton
          Icon={CalendarIcon}
          selected={pathName.includes('events')}
          label="Arrangementer"
          onPress={() => router.push('/authed/(tabs)/events')}
        />
        <TabBarButton
          Icon={UserIcon}
          selected={pathName.includes('profile')}
          label="Profil"
          onPress={() => router.push('/authed/(tabs)/profile')}
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
    <Pressable className="flex flex-col items-center gap-0.5" onPress={onPress}>
      <View className="relative flex h-10 w-20 items-center justify-center">
        <View className="absolute inset-0 flex items-center justify-center">
          <MotiView
            state={animation}
            className="h-full rounded-full bg-primary"
            style={{
              borderRadius: 1000,
            }}
          />
        </View>
        <Icon
          size={22}
          className={selected ? 'text-primary-foreground' : 'text-muted-foreground'}
        />
      </View>
      <Text
        className={cn(
          'text-xs',
          selected ? 'font-semibold text-foreground' : 'text-muted-foreground'
        )}>
        {label}
      </Text>
    </Pressable>
  );
};

export default TabBar;
