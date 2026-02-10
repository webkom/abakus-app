import { cn } from '@/lib/cn';
import { useUser } from '@/lib/hooks/useUser';
import React from 'react';
import { Image, View, ViewProps } from 'react-native';
import Icon from './icon';
import { Button } from './ui/button';

type HeaderProps = {
  highlight?: boolean;
} & ViewProps;
const Header = ({ highlight = false, className }: HeaderProps) => {
  const user = useUser();

  return (
    <View
      style={highlight ? { shadowOpacity: 0 } : undefined}
      className={cn(
        'pt-safe-offset-10 z-10 flex w-full flex-row items-center justify-between gap-2.5 bg-background px-5 pb-5 shadow-md',
        className,
        highlight ? 'border-b border-border ' : 'shadow-none'
      )}>
      <Image src={user.profilePicture ?? ''} className="h-14 w-14 rounded-full" />
      <View className="flex flex-row gap-2.5">
        <Button variant="outline" className="rounded-full">
          <Icon name="Settings" size={20} className="text-foreground" />
        </Button>

        <View className="w-20">
          <Button variant="secondary" className="flex-0 w-fit flex-grow-0 rounded-full">
            <Icon name="Bell" className="text-secondary-foreground" size={20} />
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Header;
