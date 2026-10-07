import { Text } from 'react-native';
import type { ActivityRenderer, AggregatedFeedItem } from '../types';
import { Card } from 'heroui-native';
import Icon from '@/components/icon';

const getExtraContext = (aggregatedActivity: AggregatedFeedItem) =>
  aggregatedActivity.lastActivity.extraContext as { weight?: number; reason?: string };

const PenaltyRenderer: ActivityRenderer = {
  Header: ({ aggregatedActivity }) => {
    const { weight } = getExtraContext(aggregatedActivity);
    if (weight === undefined) return null;

    return (
      <Card.Title>
        {'Du har fått '}
        <Text className="text-red-600">
          {weight} prikk{Number(weight) > 1 ? 'er' : ''}
        </Text>
      </Card.Title>
    );
  },
  Icon: () => <Icon name="CircleAlert" className="text-red-600" />,
  Content: ({ aggregatedActivity }) => {
    const { reason } = getExtraContext(aggregatedActivity);
    if (!reason) return null;

    return (
      <Card.Body>
        <Text>{reason}</Text>
      </Card.Body>
    );
  },
};

export default PenaltyRenderer;
