import { View, Text } from 'react-native';
import React, { ComponentProps } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/icon';

type InfoCardProps = {
  children?: React.ReactNode;
  title?: string;
  icon?: ComponentProps<typeof Icon>['name'];
  iconComponent?: React.ReactNode;
};

const InfoCard = ({ children, title, icon, iconComponent }: InfoCardProps) => {
  return (
    <Card className="border-border bg-card flex-1 shrink-0 px-0 py-3">
      <CardContent className="gap-1 px-3.5">
        <View className="flex-row items-center gap-1.5">
          {(icon || iconComponent) && (
            <View className="bg-primary/10 h-6 w-6 items-center justify-center rounded-md">
              {icon && <Icon name={icon} size={14} className="text-primary" />}
              {iconComponent}
            </View>
          )}
          <Text className="text-muted-foreground text-[11px] font-semibold uppercase tracking-wider">
            {title}
          </Text>
        </View>
        {children}
      </CardContent>
    </Card>
  );
};

export default InfoCard;
