import Icon from '@/components/icon';
import { Card, CardContent } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { BottomSheet, Column, Host } from '@expo/ui';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
import { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import InfoCard from './info-card';

type EventDatetimeProps = {
  startTime?: Date | null;
  endTime?: Date | null;
};
const EventDatetime = ({ startTime, endTime }: EventDatetimeProps) => {
  const [isPresented, setIsPresented] = useState(false);
  return (
    <>
      <Host className="w-full">
        <TouchableOpacity onPress={() => setIsPresented(true)} className="flex-1">
          <InfoCard title="Tid" icon="Calendar">
            <Text className="text-sm font-bold capitalize text-foreground" numberOfLines={1}>
              {startTime ? format(startTime, 'EEEE d. MMM', { locale: nb }) : 'TBA'}
            </Text>
            <Text className="text-xs text-muted-foreground" numberOfLines={1}>
              {startTime && endTime
                ? `kl. ${format(startTime, 'HH:mm')} - ${format(endTime, 'HH:mm')}`
                : 'Tid ikke satt'}
            </Text>
          </InfoCard>
        </TouchableOpacity>
      </Host>
      <BottomSheet isPresented={isPresented} onDismiss={() => setIsPresented(false)}>
        <Column spacing={12}>
          <Text>adasd</Text>
        </Column>
      </BottomSheet>
    </>
  );
};

export default EventDatetime;
