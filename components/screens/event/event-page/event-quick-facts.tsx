import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Card, CardContent } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import Icon from '@/components/icon';
import { DetailedEvent } from '@/lib/types/types';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
import { Link } from 'expo-router';

const MazeMapLogo = require('@/assets/images/mazemaplogo.png');

interface EventQuickFactsProps {
  event?: DetailedEvent;
  attendeesCount: number;
  totalCapacity?: number;
  className?: string;
}

export function EventQuickFacts({
  event,
  attendeesCount,
  totalCapacity,
  className,
}: EventQuickFactsProps) {
  const startTime = event?.startTime ? new Date(event.startTime) : null;
  const endTime = event?.endTime ? new Date(event.endTime) : null;

  const isFull =
    totalCapacity !== undefined && totalCapacity > 0 && attendeesCount >= totalCapacity;
  const spotsLeft =
    totalCapacity !== undefined ? Math.max(0, totalCapacity - attendeesCount) : undefined;

  const priceDisplay = event?.isPriced
    ? event.priceMember
      ? `${event.priceMember} kr`
      : event.price
        ? `${event.price} kr`
        : 'Betalt'
    : 'Gratis';

  return (
    <View className={className}>
      <View className="flex-row gap-2.5">
        {/* 1. Tidspunkt */}
        <Card className="flex-1 border-border bg-card px-0 py-3">
          <CardContent className="gap-1 px-3.5">
            <View className="flex-row items-center gap-1.5">
              <View className="h-6 w-6 items-center justify-center rounded-md bg-primary/10">
                <Icon name="Calendar" size={14} className="text-primary" />
              </View>
              <Text className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Tid
              </Text>
            </View>
            <Text className="text-sm font-bold capitalize text-foreground" numberOfLines={1}>
              {startTime ? format(startTime, 'EEEE d. MMM', { locale: nb }) : 'TBA'}
            </Text>
            <Text className="text-xs text-muted-foreground" numberOfLines={1}>
              {startTime && endTime
                ? `kl. ${format(startTime, 'HH:mm')} - ${format(endTime, 'HH:mm')}`
                : 'Tid ikke satt'}
            </Text>
          </CardContent>
        </Card>

        {/* 2. Sted */}
        <Card className="flex-1 border-border bg-card px-0 py-3">
          <CardContent className="gap-1 px-3.5">
            <View className="flex-row items-center gap-1.5">
              <View className="h-6 w-6 items-center justify-center rounded-md bg-primary/10">
                {event?.mazemapPoi ? (
                  <Image source={MazeMapLogo} className="h-3.5 w-3.5" resizeMode="contain" />
                ) : (
                  <Icon name="MapPin" size={14} className="text-primary" />
                )}
              </View>
              <Text className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Sted
              </Text>
            </View>
            <Text className="text-sm font-bold text-foreground" numberOfLines={1}>
              {event?.location || 'TBA'}
            </Text>
            {event?.mazemapPoi ? (
              <Link
                href={`https://use.mazemap.com/#v=1&sharepoitype=poi&sharepoi=${event.mazemapPoi}`}
                asChild>
                <TouchableOpacity className="flex-row items-center gap-1">
                  <Text className="text-xs font-semibold text-primary underline">MazeMap</Text>
                  <Icon name="ArrowUpRight" size={12} className="text-primary" />
                </TouchableOpacity>
              </Link>
            ) : (
              <Text className="text-xs text-muted-foreground" numberOfLines={1}>
                Gløshaugen
              </Text>
            )}
          </CardContent>
        </Card>
      </View>

      <View className="mt-2.5 flex-row gap-2.5">
        {/* 3. Pris */}
        <Card className="flex-1 border-border bg-card px-0 py-3">
          <CardContent className="gap-1 px-3.5">
            <View className="flex-row items-center gap-1.5">
              <View className="h-6 w-6 items-center justify-center rounded-md bg-primary/10">
                <Icon name="Ticket" size={14} className="text-primary" />
              </View>
              <Text className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Pris
              </Text>
            </View>
            <Text className="text-sm font-bold text-foreground" numberOfLines={1}>
              {priceDisplay}
            </Text>
          </CardContent>
        </Card>

        {/* 4. Kapasitet */}
        <Card className="flex-1 border-border bg-card px-0 py-3">
          <CardContent className="gap-1 px-3.5">
            <View className="flex-row items-center gap-1.5">
              <View className="h-6 w-6 items-center justify-center rounded-md bg-primary/10">
                <Icon name="Users" size={14} className="text-primary" />
              </View>
              <Text className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Kapasitet
              </Text>
            </View>
            <Text className="text-sm font-bold text-foreground" numberOfLines={1}>
              {totalCapacity !== undefined
                ? `${attendeesCount} / ${totalCapacity}`
                : 'Ingen påmelding'}
            </Text>
          </CardContent>
        </Card>
      </View>
    </View>
  );
}

export default EventQuickFacts;
