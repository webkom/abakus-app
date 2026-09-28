import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Card, CardContent } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import Icon from '@/components/icon';
import SectionTitle from './event-page/section-title';
import { RenderHTML } from '@nanogiants/react-native-render-html';

type DescriptionSectionProps = {
  description?: string;
  previewDescription?: string;
  className?: string;
};

export function DescriptionSection({
  description,
  previewDescription,
  className,
}: DescriptionSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!description || description.trim() === '') {
    return null;
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => setIsExpanded((prev) => !prev)}
      className={className}>
      <View className={`gap-2.5`}>
        <SectionTitle title="Om arrangementet" icon="FileText" />

        <Card className="border-border bg-card py-4">
          <CardContent className="gap-3">
            {!isExpanded && (
              <Text className="text-sm leading-6 text-muted-foreground">{previewDescription}</Text>
            )}

            {isExpanded && <RenderHTML html={description} />}

            <View className="flex-row items-center gap-1 self-start pt-1">
              <Text className="text-xs font-semibold text-primary">
                {isExpanded ? 'Vis mindre' : 'Vis mer'}
              </Text>
              <Icon
                name={isExpanded ? 'ChevronUp' : 'ChevronDown'}
                size={14}
                className="text-primary"
              />
            </View>
          </CardContent>
        </Card>
      </View>
    </TouchableOpacity>
  );
}

export default DescriptionSection;
