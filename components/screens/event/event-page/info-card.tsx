import { View, Text } from 'react-native';
import React, { ComponentProps } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/icon';

type InfoCardProps = {
  children?: React.ReactNode;
  title?: string;
  icon?: ComponentProps<typeof Icon>['name'];
};

const InfoCard = ({ children, title, icon }: InfoCardProps) => {
  return (
    <Card className="flex-1 border-border bg-card px-0 py-3">
      <CardContent className="gap-1 px-3.5">
        <View className="flex-row items-center gap-1.5">
          {icon && (
            <View className="h-6 w-6 items-center justify-center rounded-md bg-primary/10">
              <Icon name={icon} size={14} className="text-primary" />
            </View>
          )}
          <Text className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {title}
          </Text>
        </View>
        {children}
      </CardContent>
    </Card>
  );
};

export default InfoCard;
