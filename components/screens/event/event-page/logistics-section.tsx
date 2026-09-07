import Icon from '@/components/icon';
import { Card, CardContent } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { DetailedEvent } from '@/lib/types/types';
import { format } from 'date-fns';
import { nb } from 'date-fns/locale';
import { Link } from 'expo-router';
import { Image, TouchableOpacity, View } from 'react-native';

const MazeMapLogo = require('@/assets/images/mazemaplogo.png');

type LogisticsSectionProps = {
  event?: DetailedEvent;
};

export function LogisticsSection({ event }: LogisticsSectionProps) {
  const startTime = event?.startTime ?? new Date();
  const endTime = event?.endTime ?? new Date();

  return (
    <View className="flex flex-col gap-2">
      <Card>
        <CardContent>
          <View className="flex-row gap-4">
            <View className="h-10 w-10 items-center justify-center rounded-lg border border-border bg-background">
              <Icon name="Calendar" size={20} className="text-foreground" />
            </View>
            <View className="flex-1 justify-center">
              <Text className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                Tidspunkt
              </Text>
              <Text className="text-base font-semibold capitalize text-foreground">
                {format(startTime, 'EEEE d. MMMM', { locale: nb })}
              </Text>
              <Text className="text-base text-foreground">
                kl. {format(startTime, 'HH:mm', { locale: nb })} - {format(endTime, 'HH:mm', { locale: nb })}
              </Text>
            </View>
          </View>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <View className="flex-row gap-4">
            <View className="h-10 w-10 items-center justify-center rounded-lg border border-border bg-background">
              {event?.mazemapPoi ? (
                <Image source={MazeMapLogo} className="h-5 w-5" resizeMode="contain" />
              ) : (
                <Icon name="MapPin" size={20} className="text-foreground" />
              )}
            </View>
            <View className="flex-1 justify-center">
              <Text className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                Sted
              </Text>
              <Text className="text-base font-semibold text-foreground">{event?.location}</Text>

              {event?.mazemapPoi && (
                <Link
                  href={`https://use.mazemap.com/#v=1&sharepoitype=poi&sharepoi=${event.mazemapPoi}`}
                  asChild>
                  <TouchableOpacity className="mt-1 flex-row items-center gap-1">
                    <Text className="text-sm font-medium text-primary underline">Finn frem i MazeMap</Text>
                    <Icon name="ArrowUpRight" size={14} className="text-primary" />
                  </TouchableOpacity>
                </Link>
              )}
            </View>
          </View>
        </CardContent>
      </Card>
    </View>
  );
}
