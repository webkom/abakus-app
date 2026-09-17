import { Text } from 'react-native';
import type { ActivityRenderer } from '../types';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const getExtraContext = (aggregatedActivity: any) =>
  aggregatedActivity.lastActivity.extraContext as { weight?: number; reason?: string };

const PenaltyRenderer: ActivityRenderer = {
  Header: ({ aggregatedActivity }) => {
    const { weight } = getExtraContext(aggregatedActivity);
    if (weight === undefined) return null;

    return (
      <CardHeader>
        <CardTitle>
          {'Du har fått '}
          <Text className="text-red-600">
            {weight} prikk{Number(weight) > 1 ? 'er' : ''}
          </Text>
        </CardTitle>
      </CardHeader>
    );
  },
  Content: ({ aggregatedActivity }) => {
    const { reason } = getExtraContext(aggregatedActivity);
    if (!reason) return null;

    return (
      <CardContent>
        <Text>{reason}</Text>
      </CardContent>
    );
  },
};

export default PenaltyRenderer;
