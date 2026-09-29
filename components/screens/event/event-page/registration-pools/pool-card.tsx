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
                <Text className="text-foreground text-base font-semibold">{pool.name}</Text>

                {isFull && (
                  <View className="bg-destructive/15 rounded px-2 py-0.5">
                    <Text className="text-destructive text-xs font-medium">Fullt</Text>
                  </View>
                )}
              </View>

              <View className="flex-row items-center gap-2">
                <Text className="text-foreground text-sm font-bold">
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
              <View className="bg-secondary h-2 w-full overflow-hidden rounded-full">
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
            <View className="border-border mt-1 gap-3 border-t pt-3">
              {/* Group Access Badges (shown when expanded) */}
              {pool.permissionGroups && pool.permissionGroups.length > 0 && (
                <View className="gap-1.5">
                  <Text className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                    Gruppetilgang
                  </Text>
                  <View className="flex-row flex-wrap items-center gap-1.5">
                    {pool.permissionGroups.map((group) => (
                      <View
                        key={group.id}
                        className="border-border bg-secondary flex-row items-center gap-1 rounded-full border px-2.5 py-0.5">
                        <Text className="text-secondary-foreground text-[11px] font-medium">
                          {group.name}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {/* Future Activation Info */}
              {isFutureActivation && (
                <View className="bg-muted/50 flex-row items-center gap-2 rounded-lg p-2.5">
                  <Icon name="Clock" size={14} className="text-muted-foreground" />
                  <Text className="text-muted-foreground text-xs">
                    Påmelding åpner{' '}
                    <Text className="text-foreground text-xs font-semibold">
                      {format(activationDateObj, "EEEE d. MMMM 'kl.' HH:mm", { locale: nb })}
                    </Text>
                  </Text>
                </View>
              )}

              {/* Signed Up Users List */}
              <View className="gap-1.5">
                <Text className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                  Påmeldte deltakere
                </Text>
                {hasRegistrations ? (
                  <View className="gap-1">
                    {pool.registrations?.map((reg, idx) => (
                      <View
                        key={reg.id ?? idx}
                        className="flex-row items-center justify-between py-1">
                        <Text className="text-foreground text-sm font-medium">
                          {reg.user?.fullName || reg.user?.username || 'Anonym bruker'}
                        </Text>
                        {reg.user?.grade || reg.user?.abakusGroup?.name ? (
                          <Text className="text-muted-foreground text-xs">
                            {reg.user?.grade || reg.user?.abakusGroup?.name}
                          </Text>
                        ) : null}
                      </View>
                    ))}
                  </View>
                ) : registered === 0 ? (
                  <Text className="text-muted-foreground text-xs italic">
                    Ingen påmeldte i denne poolen ennå.
                  </Text>
                ) : (
                  <Text className="text-muted-foreground text-xs">
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
