import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import Icon from '@/components/icon';
import { DetailedEvent } from '@/lib/types/types';
import { EventCategoryBadge } from './event-category-badge';

type TitleSectionProps = {
  event?: DetailedEvent;
  attendeesCount?: number;
  totalCapacity?: number;
  className?: string;
};

export function TitleSection({ event, className }: TitleSectionProps) {
  const responsibleGroupName = event?.responsibleGroup?.name;

  return (
    <View className={`gap-2.5 ${className ?? ''}`}>
      {/* Category & language badges */}
      <EventCategoryBadge
        eventType={event?.eventType}
        isForeignLanguage={event?.isForeignLanguage}
        isPriced={event?.isPriced}
      />

      {/* Main Title */}
      <Text className="text-2xl font-bold leading-tight tracking-tight text-foreground sm:text-3xl">
        {event?.title}
      </Text>

      {/* Organizer Committee Subline */}
      {responsibleGroupName && (
        <View className="flex-row items-center gap-1.5">
          <Icon name="Shield" size={14} className="text-muted-foreground" />
          <Text className="text-xs font-medium text-muted-foreground">
            I regi av <Text className="font-semibold text-foreground">{responsibleGroupName}</Text>
          </Text>
        </View>
      )}
    </View>
  );
}

export default TitleSection;
