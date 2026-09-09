import Icon from '@/components/icon';
import { Card, CardContent } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
import React, { useCallback, useMemo, useRef } from 'react';
import { TouchableOpacity, View } from 'react-native';

type EventDatetimeProps = {
  startTime?: Date | null;
  endTime?: Date | null;
};
const EventDatetime = ({ startTime, endTime }: EventDatetimeProps) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('Changed: ', index);
  }, []);

  const handleOpenModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        onChange={handleSheetChanges}
        enablePanDownToClose
        snapPoints={snapPoints}>
        <BottomSheetView className="relative z-20 flex-1 items-center justify-center bg-card p-6">
          <Text className="font-bold text-foreground">Test</Text>
        </BottomSheetView>
      </BottomSheetModal>

      <TouchableOpacity onPress={handleOpenModal} className="flex-1">
        <Card className="w-full border-border bg-card px-0 py-3">
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
      </TouchableOpacity>
    </>
  );
};

export default EventDatetime;
