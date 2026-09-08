import Icon from '@/components/icon';
import { Card, CardContent } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { components } from '@/lib/types/schema';
import { cn } from '@/lib/utils';
import { format, isAfter } from 'date-fns';
import { nb } from 'date-fns/locale';
import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

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
        <View className="flex-row items-center gap-2">
          <Icon name="Users" size={20} className="text-primary" />
          <Text className="text-lg font-bold text-foreground">Påmeldingspooler</Text>
        </View>
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
        const capacity = pool.capacity ? Number(pool.capacity) : 0;
        const registered = pool.registrationCount ? Number(pool.registrationCount) : 0;
        const isFull = capacity > 0 && registered >= capacity;
        const percentage =
          capacity > 0 ? Math.min(100, Math.round((registered / capacity) * 100)) : 0;

        const activationDateObj = pool.activationDate ? new Date(pool.activationDate) : null;
        const isFutureActivation =
          activationDateObj &&
          !isNaN(activationDateObj.getTime()) &&
          isAfter(activationDateObj, new Date());

        const isExpanded = expandedPoolId === pool.id;
        const hasRegistrations = (pool.registrations?.length ?? 0) > 0;

        return (
          <Card key={pool.id} className="border-border bg-card py-4">
            <CardContent className="gap-3">
              {/* Always Visible Collapsed Header */}
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => toggleExpand(pool.id)}
                className="gap-2.5">
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center gap-2">
                    <Text className="text-base font-semibold text-foreground">{pool.name}</Text>

                    {isFull && (
                      <View className="rounded bg-destructive/15 px-2 py-0.5">
                        <Text className="text-xs font-medium text-destructive">Fullt</Text>
                      </View>
                    )}
                  </View>

                  <View className="flex-row items-center gap-2">
                    <Text className="text-sm font-bold text-foreground">
                      {registered} / {capacity > 0 ? capacity : '∞'}
                    </Text>
                    <Icon
                      name={isExpanded ? 'ChevronUp' : 'ChevronDown'}
                      size={18}
                      className="text-muted-foreground"
                    />
                  </View>
                </View>

                {/* Progress Bar */}
                {capacity > 0 && (
                  <View className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                    <View
                      className={cn(
                        'h-full rounded-full',
                        isFull ? 'bg-destructive' : percentage >= 80 ? 'bg-amber-500' : 'bg-primary'
                      )}
                      style={{ width: `${percentage}%` }}
                    />
                  </View>
                )}
              </TouchableOpacity>

              {/* Expanded Details Section */}
              {isExpanded && (
                <View className="mt-1 gap-3 border-t border-border pt-3">
                  {/* Group Access Badges (shown when expanded) */}
                  {pool.permissionGroups && pool.permissionGroups.length > 0 && (
                    <View className="gap-1.5">
                      <Text className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Gruppetilgang
                      </Text>
                      <View className="flex-row flex-wrap items-center gap-1.5">
                        {pool.permissionGroups.map((group) => (
                          <View
                            key={group.id}
                            className="flex-row items-center gap-1 rounded-full border border-border bg-secondary px-2.5 py-0.5">
                            <Text className="text-[11px] font-medium text-secondary-foreground">
                              {group.name}
                            </Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  )}

                  {/* Future Activation Info */}
                  {isFutureActivation && (
                    <View className="flex-row items-center gap-2 rounded-lg bg-muted/50 p-2.5">
                      <Icon name="Clock" size={14} className="text-muted-foreground" />
                      <Text className="text-xs text-muted-foreground">
                        Påmelding åpner{' '}
                        <Text className="text-xs font-semibold text-foreground">
                          {format(activationDateObj, "EEEE d. MMMM 'kl.' HH:mm", { locale: nb })}
                        </Text>
                      </Text>
                    </View>
                  )}

                  {/* Signed Up Users List */}
                  <View className="gap-1.5">
                    <Text className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Påmeldte deltakere
                    </Text>
                    {hasRegistrations ? (
                      <View className="gap-1">
                        {pool.registrations?.map((reg, idx) => (
                          <View
                            key={reg.id ?? idx}
                            className="flex-row items-center justify-between py-1">
                            <Text className="text-sm font-medium text-foreground">
                              {reg.user?.fullName || reg.user?.username || 'Anonym bruker'}
                            </Text>
                            {reg.user?.grade || reg.user?.abakusGroup?.name ? (
                              <Text className="text-xs text-muted-foreground">
                                {reg.user?.grade || reg.user?.abakusGroup?.name}
                              </Text>
                            ) : null}
                          </View>
                        ))}
                      </View>
                    ) : registered === 0 ? (
                      <Text className="text-xs italic text-muted-foreground">
                        Ingen påmeldte i denne poolen ennå.
                      </Text>
                    ) : (
                      <Text className="text-xs text-muted-foreground">
                        {registered} {registered === 1 ? 'person' : 'personer'} påmeldt.
                      </Text>
                    )}
                  </View>
                </View>
              )}
            </CardContent>
          </Card>
        );
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
