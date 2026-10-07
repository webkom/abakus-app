import { router } from 'expo-router';
import { Linking, Text } from 'react-native';
import { TagProps } from './types';

export const navigateToTag = ({ link, linkType }: Pick<TagProps, 'link' | 'linkType'>) => {
  if (linkType === 'internal') {
    router.push(link);
  }
  if (linkType === 'external') {
    Linking.openURL(link);
  }
};

export const Tag = ({ link, text, linkableContent, linkType }: TagProps) => {
  if (!linkableContent) {
    return <Text>{text}</Text>;
  }

  return (
    <Text
      className="font-semibold text-red-600 active:text-red-700"
      onPress={() => navigateToTag({ link, linkType })}>
      {text}
    </Text>
  );
};
