import React from 'react';
import { Share, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import Icon from '@/components/icon';
import { DetailedEvent } from '@/lib/types/types';

type HeroSectionProps = {
  event?: DetailedEvent;
  onBack?: () => void;
};

export function HeroSection({ event, onBack }: HeroSectionProps) {
  const handleShare = async () => {
    if (!event) return;
    try {
      await Share.share({
        title: event.title,
        message: `${event.title} – https://abakus.no/events/${event.id}`,
      });
    } catch (err) {
      console.error('Error sharing event:', err);
    }
  };

  return (
    <View className="relative w-full overflow-hidden rounded-2xl border border-border bg-muted shadow-sm">
      {/* Cover Image or Fallback */}
      {event?.cover ? (
        <Image
          source={{ uri: event.cover }}
          style={{ width: '100%', height: 220 }}
          contentFit="cover"
          transition={200}
        />
      ) : (
        <View className="h-52 w-full items-center justify-center bg-secondary/40">
          <Icon name="CalendarDays" size={48} className="text-muted-foreground/40" />
        </View>
      )}

      {/* Floating Action Buttons Overlay (Back & Share) */}
      <View className="absolute left-3 right-3 top-3 flex-row items-center justify-between">
        {onBack && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onBack}
            className="h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-background/80 shadow-md backdrop-blur-md dark:border-white/10">
            <Icon name="ArrowLeft" size={20} className="text-foreground" />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleShare}
          className="ml-auto h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-background/80 shadow-md backdrop-blur-md dark:border-white/10">
          <Icon name="Share2" size={18} className="text-foreground" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default HeroSection;
