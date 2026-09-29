import { iconWithClassName } from '@/lib/iconWithClassName';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import { Tabs, usePathname, useRouter } from 'expo-router';
import { CalendarIcon, QrCodeIcon, UserIcon } from 'lucide-react-native';
import { MotiView, useDynamicAnimation } from 'moti';
import React, { ComponentProps } from 'react';
import { Pressable, View } from 'react-native';

const QrCode = iconWithClassName(QrCodeIcon);
const Calendar = iconWithClassName(CalendarIcon);
const User = iconWithClassName(UserIcon);

// Infer the correct props from one of the lucide icons:
type IconProps = ComponentProps<typeof UserIcon> & { className?: string };
type IconType = React.ComponentType<IconProps>;

type TabBarProps = Parameters<NonNullable<ComponentProps<typeof Tabs>['tabBar']>>[0];

const TabBar = ({ navigation, state, descriptors, insets }: TabBarProps) => {
  const router = useRouter();
  const pathName = usePathname();

  return (
    <View className="bottom-safe-offset-2 bg-background px-5">
      <View className="border-border bg-card flex w-full flex-row justify-evenly rounded-full border py-3 shadow-sm">
        <TabBarButton
          Icon={QrCode}
          selected={pathName.includes('abaid')}
          label="AbaID"
          onPress={() => router.push('/authed/(tabs)/abaid')}
        />
        <TabBarButton
          Icon={Calendar}
          selected={pathName.includes('events')}
          label="Arrangementer"
          onPress={() => router.push('/authed/(tabs)/events')}
        />
        <TabBarButton
          Icon={User}
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
            className="bg-primary h-full rounded-full"
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
          selected ? 'text-foreground font-semibold' : 'text-muted-foreground'
        )}>
        {label}
      </Text>
    </Pressable>
  );
};

export default TabBar;
