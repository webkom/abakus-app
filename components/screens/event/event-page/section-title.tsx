import Icon from '@/components/icon';
import { cn } from '@/lib/cn';
import { ComponentProps } from 'react';
import { Text, View, ViewProps } from 'react-native';

type SeconTitleProps = {
  icon: ComponentProps<typeof Icon>['name'];
  title: string;
} & ViewProps;

const SectionTitle = ({ title, icon, className, ...props }: SeconTitleProps) => {
  return (
    <View className={cn('flex-row items-center gap-2', className)} {...props}>
      <Icon name={icon} size={20} className="text-primary" />
      <Text className="text-lg font-bold text-foreground">{title}</Text>
    </View>
  );
};

export default SectionTitle;
