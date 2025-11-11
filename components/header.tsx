import { View, Text, Image, ViewProps } from 'react-native';
import React from 'react';
import { useUser } from '@/lib/hooks/useUser';
import Button from './button';
import Icon from './icon';
import { cn } from '@/lib/cn';

type HeaderProps = {} & ViewProps;
const Header = ({ className }: HeaderProps) => {
  const user = useUser();
  return (
    <View
      className={cn(
        'pt-safe-offset-10 flex w-full flex-row justify-between gap-2.5 px-5 pb-5',
        className
      )}>
      <Image src={user.profilePicture ?? ''} className="h-14 w-14 rounded-full" />
      <View className="flex flex-row gap-2.5">
        <Button variant="tertiary" className="flex-0 w-fit flex-grow-0 rounded-full">
          <Icon name="Bell" size={20} />
        </Button>

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
