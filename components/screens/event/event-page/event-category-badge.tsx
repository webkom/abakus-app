import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import Icon from '@/components/icon';
import { EventTypeConfig } from '@/lib/types/eventColors';
import { components } from '@/lib/types/schema';
import { cn } from '@/lib/utils';

type EventTypeEnum = components['schemas']['EventTypeEnum'];

interface EventCategoryBadgeProps {
  eventType?: EventTypeEnum;
  isForeignLanguage?: boolean;
  isPriced?: boolean;
  className?: string;
}

export function EventCategoryBadge({
  eventType,
  isForeignLanguage,
  isPriced,
  className,
}: EventCategoryBadgeProps) {
  const config = eventType ? EventTypeConfig[eventType] : undefined;

  return (
    <View className={cn('flex-row flex-wrap items-center gap-2', className)}>
      {config && (
        <View
          style={{ backgroundColor: config.color }}
          className="flex-row items-center rounded-full px-3 py-1 shadow-sm shadow-black/5">
          <Text
            style={{ color: config.textColor }}
            className="text-xs font-bold uppercase tracking-wider">
            {config.displayName}
          </Text>
        </View>
      )}

      {isForeignLanguage && (
        <View className="flex-row items-center gap-1 rounded-full border border-border bg-secondary px-2.5 py-1">
          <Icon name="Globe" size={12} className="text-secondary-foreground" />
          <Text className="text-xs font-medium text-secondary-foreground">English</Text>
        </View>
      )}

      {isPriced && (
        <View className="flex-row items-center gap-1 rounded-full border border-border bg-secondary px-2.5 py-1">
          <Icon name="Receipt" size={12} className="text-secondary-foreground" />
          <Text className="text-xs font-medium text-secondary-foreground">Betalt</Text>
        </View>
      )}
    </View>
  );
}

export default EventCategoryBadge;
