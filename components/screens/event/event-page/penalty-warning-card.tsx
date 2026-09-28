import Icon from '@/components/icon';
import { Card, CardContent } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { penaltyHours } from '@/lib/penalties';
import { Link } from 'expo-router';
import { View } from 'react-native';

type PenaltyWarningCardProps = {
  totalCurrentPenalties: number;
};

export function PenaltyWarningCard({ totalCurrentPenalties }: PenaltyWarningCardProps) {
  return (
    <Link className="w-full" href="https://abakus.no/pages/arrangementer/26-arrangementsregler">
      <Card className="bg-destructive w-full border-red-500">
        <CardContent>
          <View className="flex-row gap-4">
            <View className="h-10 w-10 items-center justify-center rounded-lg border border-red-500 bg-red-400">
              <Icon name="TriangleAlert" size={20} className="text-destructive-foreground" />
            </View>
            <View className="flex-1 justify-center">
              <Text className="text-destructive-foreground text-sm font-medium uppercase tracking-wide opacity-70">
                Du har prikker
              </Text>
              <Text className="text-foreground dark:text-background text-base font-semibold">
                {totalCurrentPenalties > 2
                  ? `Påmeldingen din er forskjøvet ${penaltyHours(totalCurrentPenalties)} timer fordi du har ${totalCurrentPenalties} prikk${totalCurrentPenalties !== 1 ? 'er' : ''}`
                  : 'Du blir lagt på venteliste hvis du melder deg på'}
              </Text>
              <Text variant="muted" className="text-destructive-foreground mt-2.5 opacity-50">
                Trykk for å lese arrangementsreglene
              </Text>
            </View>
          </View>
        </CardContent>
      </Card>
    </Link>
  );
}
