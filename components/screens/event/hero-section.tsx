import Icon from '@/components/icon';
import AutoHeightImage from '@/components/ui/auto-height-image';
import { DetailedEvent } from '@/lib/types/types';
import { View } from '@rn-primitives/slot';

type HeroSectionProps = {
  event?: DetailedEvent;
};
export function HeroSection({ event }: HeroSectionProps) {
  return (
    <View className="overflow-hidden rounded-2xl border border-border bg-muted shadow-sm">
      {event?.cover ? (
        <AutoHeightImage uri={event.cover} />
      ) : (
        <View className="h-52 w-full items-center justify-center bg-secondary/30">
          <Icon name="Image" size={48} className="text-muted-foreground/50" />
        </View>
      )}
    </View>
  );
}
