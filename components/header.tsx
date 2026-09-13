import { View, ViewProps } from 'react-native';
import React from 'react';
import { useUser } from '@/lib/hooks/useUser';
import Button from './button';
import Icon from './icon';
import { cn } from '@/lib/cn';
import { Link } from 'expo-router';
import { Avatar, AvatarImage } from './ui/avatar';
import { useNotificationsData } from '@/lib/hooks/useNotificationsFeed';
import { Text } from './ui/text';

type HeaderProps = {} & ViewProps;
const Header = ({ className }: HeaderProps) => {
  const user = useUser();
  const { data } = useNotificationsData();
  const unreadCount = data?.unreadCount ?? 0;

  return (
    <View
      className={cn(
        'pt-safe-offset-10 flex w-full flex-row justify-between gap-2.5 px-5 pb-5',
        className
      )}>
      <Avatar alt="Profile Picture" className="h-14 w-14">
        <AvatarImage source={{ uri: user.profilePicture ?? '' }} />
      </Avatar>
      <View className="flex flex-row gap-2.5">
        <Link href={'/authed/(tabs)/notification-feed'} asChild>
          <Button variant="tertiary" className="rounded-full">
            <View>
              <Icon name={unreadCount > 0 ? 'BellRing' : 'Bell'} size={20} />
              {unreadCount > 0 && (
                <View className="absolute -right-2 -top-2 h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1">
                  <Text className="text-xs text-white">{unreadCount}</Text>
                </View>
              )}
            </View>
          </Button>
        </Link>

        <View className="w-20">
          <Button variant="tertiary" className="rounded-full">
            <Icon name="Settings" size={20} />
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Header;
