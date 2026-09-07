import Icon from '@/components/icon';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useState } from 'react';
import { View } from 'react-native';

type DescriptionSectionProps = {
  description?: string;
};

export function DescriptionSection({ description }: DescriptionSectionProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  return (
    <View className="mb-6 gap-3">
      <Text className="text-xl font-bold text-foreground">Om arrangementet</Text>
      {!showFullDescription && (
        <>
          <Text className="text-base leading-7 text-muted-foreground">{description}</Text>
          <Button variant="outline" onPress={() => setShowFullDescription(true)}>
            <Text>Vis mer</Text>
            <Icon name="ChevronDown" className="text-secondary-foreground" size={16} />
          </Button>
        </>
      )}
      {showFullDescription && (
        <>
          <View className="overflow-hidden">
            <Text className="text-base leading-7 text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque perferendis, debitis
              omnis dolor architecto repudiandae soluta voluptatem ad dolorum dolore in illo quo ut
              saepe consequuntur nulla iste id pariatur. {description} Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Dolorem nemo doloribus voluptas debitis dolore aperiam.
              Laudantium, quisquam. Accusamus minus commodi, amet rem dolor suscipit magni neque
              blanditiis placeat eligendi facilis.
            </Text>
          </View>
          <Button variant="outline" onPress={() => setShowFullDescription(false)}>
            <Text>Vis mindre</Text>
            <Icon name="ChevronUp" className="text-secondary-foreground" size={16} />
          </Button>
        </>
      )}
    </View>
  );
}
