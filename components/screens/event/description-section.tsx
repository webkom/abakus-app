import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Card, CardContent } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import Icon from '@/components/icon';

type DescriptionSectionProps = {
  description?: string;
  className?: string;
};

export function DescriptionSection({ description, className }: DescriptionSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!description || description.trim() === '') {
    return null;
  }

  const cleanDescription = description.trim();
  const isLong = cleanDescription.length > 250;
  const previewText = isLong && !isExpanded ? `${cleanDescription.slice(0, 240)}...` : cleanDescription;

  return (
    <View className={`gap-2.5 ${className ?? ''}`}>
      <View className="flex-row items-center gap-2 px-1">
        <Icon name="FileText" size={18} className="text-primary" />
        <Text className="text-lg font-bold text-foreground">Om arrangementet</Text>
      </View>

      <Card className="border-border bg-card py-4">
        <CardContent className="gap-3">
          <Text className="text-sm leading-6 text-muted-foreground">{previewText}</Text>

          {isLong && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setIsExpanded(!isExpanded)}
              className="flex-row items-center gap-1 self-start pt-1">
              <Text className="text-xs font-semibold text-primary">
                {isExpanded ? 'Vis mindre' : 'Les hele beskrivelsen'}
              </Text>
              <Icon
                name={isExpanded ? 'ChevronUp' : 'ChevronDown'}
                size={14}
                className="text-primary"
              />
            </TouchableOpacity>
          )}
        </CardContent>
      </Card>
    </View>
  );
}

export default DescriptionSection;
