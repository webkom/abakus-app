import React from 'react';
import { View, Text } from 'react-native';
import Card from '@/components/card';
import Icon from '@/components/icon';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';

interface DeadlinesCardProps {
  activationTime?: string | null;
  unregistrationDeadline?: string | null;
  paymentDeadline?: string | null;
}

export const DeadlinesCard: React.FC<DeadlinesCardProps> = ({
  activationTime,
  unregistrationDeadline,
  paymentDeadline,
}) => {
  if (!activationTime && !unregistrationDeadline && !paymentDeadline) {
    return null;
  }

  const formatDate = (dateStr?: string | null) => {
    if (!dateStr) return 'Ingen';
    return format(new Date(dateStr), 'EEEE dd. MMMM HH:mm', { locale: nb });
  };

  return (
    <Card className="bg-secondary-container/20 gap-3">
      <Text className="text-base font-bold text-gray-900">Viktige frister</Text>

      {activationTime && (
        <View className="flex-row items-center gap-3">
          <Icon name="Calendar" size={18} className="text-gray-600" />
          <View className="flex-1">
            <Text className="text-xs text-gray-500">Påmelding åpner</Text>
            <Text className="text-sm font-medium capitalize text-gray-800">
              {formatDate(activationTime)}
            </Text>
          </View>
        </View>
      )}

      {unregistrationDeadline && (
        <View className="flex-row items-center gap-3">
          <Icon name="Clock" size={18} className="text-gray-600" />
          <View className="flex-1">
            <Text className="text-xs text-gray-500">Avmeldingsfrist</Text>
            <Text className="text-sm font-medium capitalize text-gray-800">
              {formatDate(unregistrationDeadline)}
            </Text>
          </View>
        </View>
      )}

      {paymentDeadline && (
        <View className="flex-row items-center gap-3">
          <Icon name="CreditCard" size={18} className="text-gray-600" />
          <View className="flex-1">
            <Text className="text-xs text-gray-500">Betalingsfrist</Text>
            <Text className="text-sm font-medium capitalize text-gray-800">
              {formatDate(paymentDeadline)}
            </Text>
          </View>
        </View>
      )}
    </Card>
  );
};
