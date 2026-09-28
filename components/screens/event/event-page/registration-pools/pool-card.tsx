import Icon from '@/components/icon';
import { Card, CardContent } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import React, { useMemo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { RegistrationPool } from './registration-pools';
import { format, isAfter } from 'date-fns';
import { nb } from 'date-fns/locale';

type PoolCardProps = {
  pool: RegistrationPool;
};
const PoolCard = ({ pool }: PoolCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const capacity = pool.capacity ? Number(pool.capacity) : 0;
  const registered = pool.registrationCount ? Number(pool.registrationCount) : 0;
  const isFull = capacity > 0 && registered >= capacity;
  const percentage = useMemo(() => {
    return capacity > 0 ? Math.min(100, Math.round((registered / capacity) * 100)) : 0;
  }, [capacity, registered]);

  const activationDateObj = pool.activationDate ? new Date(pool.activationDate) : null;
  const isFutureActivation =
    activationDateObj &&
    !isNaN(activationDateObj.getTime()) &&
    isAfter(activationDateObj, new Date());

  const hasRegistrations = (pool.registrations?.length ?? 0) > 0;

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => setExpanded((prev) => !prev)}>
      <Card key={pool.id} className="border-border bg-card py-4">
        <CardContent className="gap-3">
          {/* Always Visible Collapsed Header */}
          <View className="gap-2.5">
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
                  name={expanded ? 'ChevronUp' : 'ChevronDown'}
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
          </View>

          {/* Expanded Details Section */}
          {expanded && (
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
    </TouchableOpacity>
  );
};

export default PoolCard;
