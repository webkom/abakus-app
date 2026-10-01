import { View, Text } from 'react-native';
import React, { ComponentProps } from 'react';
import Icon from '@/components/icon';
import { Card, cn } from 'heroui-native';

type InfoCardProps = {
  children?: React.ReactNode;
  title?: string;
  icon?: ComponentProps<typeof Icon>['name'];
  iconComponent?: React.ReactNode;
} & ComponentProps<typeof Card>;

const InfoCard = ({ children, title, icon, iconComponent, className }: InfoCardProps) => {
  return (
    <Card className={cn('flex-1 shrink-0', className)}>
      <Card.Header>
        <InfoCard.Title icon={icon} iconComponent={iconComponent} title={title} />
      </Card.Header>
      <Card.Body>{children}</Card.Body>
    </Card>
  );
};

type InfoCardTitleProps = {
  title?: string;
  icon?: ComponentProps<typeof Icon>['name'];
  iconComponent?: React.ReactNode;
  className?: string;
};

InfoCard.Title = ({ icon, iconComponent, title, className }: InfoCardTitleProps) => {
  return (
    <View className="flex-row items-center gap-1.5">
      {(icon || iconComponent) && (
        <View className="bg-primary/10 h-6 w-6 items-center justify-center rounded-md">
          {icon && <Icon name={icon} size={14} className="text-primary" />}
          {iconComponent}
        </View>
      )}
      <Text className="text-foreground text-[11px] font-semibold uppercase tracking-wider">
        {title}
      </Text>
    </View>
  );
};

export default InfoCard;
