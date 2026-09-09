import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Card from '@/components/card';
import Icon from '@/components/icon';

interface Pool {
  id: number;
  name: string;
  capacity?: number;
  registrationCount?: number | string;
  registrations?: {
    id?: number;
    user?: {
      fullName?: string;
      username?: string;
      grade?: string;
      abakusGroup?: { name?: string };
    };
  }[];
}

interface PoolsSectionProps {
  pools?: Pool[];
  waitingRegistrations?: number;
  totalCapacity?: number;
}

export const PoolsSection: React.FC<PoolsSectionProps> = ({
  pools = [],
  waitingRegistrations = 0,
}) => {
  const [expandedPoolId, setExpandedPoolId] = useState<number | null>(null);

  if (!pools || pools.length === 0) {
    return null;
  }

  const toggleExpand = (id: number) => {
    setExpandedPoolId(expandedPoolId === id ? null : id);
  };

  return (
    <View className="gap-3">
      <View className="flex-row items-center justify-between px-1">
        <Text className="text-xl font-bold text-gray-900">Påmeldte og plasser</Text>
        {waitingRegistrations > 0 && (
          <View className="rounded-full bg-amber-100 px-2.5 py-1">
            <Text className="text-xs font-semibold text-amber-800">
              {waitingRegistrations} på venteliste
            </Text>
          </View>
        )}
      </View>

      {pools.map((pool) => {
        const isExpanded = expandedPoolId === pool.id;
        const capacity = Number(pool.capacity) || 0;
        const registrationCount = Number(pool.registrationCount) || 0;
        const percentage =
          capacity > 0 ? Math.min(100, Math.round((registrationCount / capacity) * 100)) : 0;
        const isFull = capacity > 0 && registrationCount >= capacity;
        const registrations = pool.registrations || [];

        return (
          <Card key={pool.id} className="border border-gray-200 bg-background p-4">
            <TouchableOpacity
              onPress={() => toggleExpand(pool.id)}
              className="flex-row items-center justify-between">
              <View className="flex-1 pr-2">
                <View className="flex-row items-center gap-2">
                  <Text className="text-base font-semibold text-gray-900">{pool.name}</Text>
                  {isFull && (
                    <Text className="rounded bg-red-50 px-2 py-0.5 text-xs font-medium text-red-600">
                      Fullt
                    </Text>
                  )}
                </View>
                <Text className="mt-0.5 text-xs text-gray-500">
                  {registrationCount} / {capacity} plasser tatt
                </Text>
              </View>

              <View className="flex-row items-center gap-2">
                <Text className="text-sm font-bold text-gray-700">{percentage}%</Text>
                <Icon
                  name={isExpanded ? 'ChevronUp' : 'ChevronDown'}
                  size={20}
                  className="text-gray-500"
                />
              </View>
            </TouchableOpacity>

            {/* Progress Bar */}
            <View className="mt-3 h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <View
                className={`h-full rounded-full ${
                  isFull ? 'bg-red-500' : percentage > 80 ? 'bg-amber-500' : 'bg-green-600'
                }`}
                style={{ width: `${percentage}%` }}
              />
            </View>

            {/* Expanded Registration Details */}
            {isExpanded && (
              <View className="mt-4 border-t border-gray-100 pt-3">
                {registrations.length > 0 ? (
                  <View className="gap-2">
                    <Text className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Deltakere ({registrations.length})
                    </Text>
                    {registrations.map((reg, idx) => (
                      <View
                        key={reg.id || idx}
                        className="flex-row items-center justify-between py-1">
                        <Text className="text-sm font-medium text-gray-800">
                          {reg.user?.fullName || reg.user?.username || 'Anonym bruker'}
                        </Text>
                        <Text className="text-xs text-gray-500">
                          {reg.user?.grade || reg.user?.abakusGroup?.name || ''}
                        </Text>
                      </View>
                    ))}
                  </View>
                ) : (
                  <Text className="text-sm italic text-gray-500">
                    Ingen påmeldte i denne gruppen ennå.
                  </Text>
                )}
              </View>
            )}
          </Card>
        );
      })}
    </View>
  );
};
