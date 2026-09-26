import { Text } from '@/components/ui/text';
import { BottomSheet, Column } from '@expo/ui';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import InfoCard from './info-card';

type EventDatetimeProps = {
  startTime?: Date | null;
  endTime?: Date | null;
};
const EventDatetime = ({ startTime, endTime }: EventDatetimeProps) => {
  const [isPresented, setIsPresented] = useState(false);
  return (
    <>
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

      <BottomSheet isPresented={isPresented} onDismiss={() => setIsPresented(false)}>
        <Column spacing={12}>
          <Text>{startTime ? format(startTime, 'EEEE d. MMM', { locale: nb }) : 'TBA'}</Text>
          <Text>
            {startTime && endTime
              ? `kl. ${format(startTime, 'HH:mm')} - ${format(endTime, 'HH:mm')}`
              : 'Tid ikke satt'}
          </Text>
        </Column>
      </BottomSheet>
    </>
  );
};

export default EventDatetime;
