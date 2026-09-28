import Icon from '@/components/icon';
import { Card, CardContent } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { components } from '@/lib/types/schema';
import { cn } from '@/lib/utils';
import { format, isAfter } from 'date-fns';
import { nb } from 'date-fns/locale';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import SectionTitle from '../section-title';
import PoolCard from './pool-card';

export type RegistrationPool = components['schemas']['PoolRead'] & {
  registrations?: {
    id?: number;
    user?: {
      id?: number;
      fullName?: string;
      username?: string;
      grade?: string;
      abakusGroup?: { name?: string };
    };
  }[];
};

export type RegistrationPoolsProps = {
  pools?: RegistrationPool[];
  waitingRegistrationCount?: number | string;
  mergeTime?: string | null;
  className?: string;
};

export function RegistrationPools({
  pools = [],
  waitingRegistrationCount,
  mergeTime,
  className,
}: RegistrationPoolsProps) {
  const [expandedPoolId, setExpandedPoolId] = useState<number | null>(null);

  const waitingCount =
    typeof waitingRegistrationCount === 'number'
      ? waitingRegistrationCount
      : parseInt(waitingRegistrationCount ?? '0', 10) || 0;

  if (!pools || pools.length === 0) {
    return null;
  }

  const totalCapacity = pools.reduce((acc, pool) => {
    return acc + (pool.capacity ? Number(pool.capacity) : 0);
  }, 0);

  const totalRegistered = pools.reduce((acc, pool) => {
    return acc + (pool.registrationCount ? Number(pool.registrationCount) : 0);
  }, 0);

  const toggleExpand = (id: number) => {
    setExpandedPoolId(expandedPoolId === id ? null : id);
  };

  const formattedMergeTime = mergeTime ? new Date(mergeTime) : null;
  const isMergeTimeValid = formattedMergeTime && !isNaN(formattedMergeTime.getTime());
  const hasMerged = isMergeTimeValid && !isAfter(formattedMergeTime, new Date());

  return (
    <View className={cn('flex flex-col gap-3', className)}>
      {/* Header Section */}
      <View className="flex-row items-center justify-between px-1">
        <SectionTitle icon="Users" title="Påmeldingspooler" />

        <Text className="text-xs font-medium text-muted-foreground">
          {totalRegistered} / {totalCapacity > 0 ? `${totalCapacity}` : '∞'} plasser
        </Text>
      </View>

      {/* Merge Time Banner */}
      {isMergeTimeValid && (
        <Card className="border-border/60 bg-muted/30 py-3">
          <CardContent className="flex-row items-center gap-3">
            <View className="h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Icon name="GitMerge" size={16} className="text-primary" />
            </View>
            <View className="flex-1">
              <Text className="text-xs font-semibold text-foreground">
                {hasMerged ? 'Poolene er slått sammen' : 'Samling av pooler'}
              </Text>
              <Text className="text-xs text-muted-foreground">
                {hasMerged
                  ? `Poolene ble slått sammen ${format(formattedMergeTime, "d. MMMM 'kl.' HH:mm", { locale: nb })}`
                  : `Restplasser slås sammen ${format(formattedMergeTime, "d. MMMM 'kl.' HH:mm", { locale: nb })}`}
              </Text>
            </View>
          </CardContent>
        </Card>
      )}

      {/* Pool Cards */}
      {pools.map((pool) => {
        return <PoolCard pool={pool} key={pool.id + 'pool'} />;
      })}

      {/* Waitlist Card */}
      {waitingCount > 0 && (
        <Card className="border-amber-500/30 bg-amber-500/10 py-3">
          <CardContent className="flex-row items-center gap-3">
            <View className="h-8 w-8 items-center justify-center rounded-lg bg-amber-500/20">
              <Icon name="Hourglass" size={16} className="text-amber-600 dark:text-amber-400" />
            </View>
            <View className="flex-1">
              <Text className="text-sm font-semibold text-amber-900 dark:text-amber-200">
                Venteliste ({waitingCount})
              </Text>
              <Text className="text-xs text-amber-700 dark:text-amber-300">
                {waitingCount === 1
                  ? '1 person står i kø for ledig plass'
                  : `${waitingCount} personer står i kø for ledig plass`}
              </Text>
            </View>
          </CardContent>
        </Card>
      )}
    </View>
  );
}

export default RegistrationPools;
