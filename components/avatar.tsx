import React from 'react';
import { View } from 'react-native';
import Cookie from './cookie';
import { CookieClip } from './cookie-clip';
import Icon from './icon';

type AvatarProps = {
  src: string;
};
const Avatar = ({ src }: AvatarProps) => {
  return (
    <View className="flex w-fit items-center justify-center">
      <View className="absolute h-full w-auto">
        <View className="">
          <Cookie />
        </View>
      </View>

      <View className="absolute flex h-full w-full items-center justify-center">
        <Icon name="UserRound" size={100} className="text-on-tertiary-container" />
      </View>

      <CookieClip uri={src} />
    </View>
  );
};

export default Avatar;
