import { useEffect, useState } from 'react';
import { Image, ImageProps, View } from 'react-native';
import Icon from '../icon';

export type AutoHeightImageProps = {
  uri: string;
} & ImageProps;
const AutoHeightImage = ({ uri, ...props }: AutoHeightImageProps) => {
  const [aspectRatio, setAspectRatio] = useState(1);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (uri) {
      Image.getSize(uri, (width, height) => {
        setAspectRatio(width / height);
      });
    }
  }, [uri]);

  if (error) {
    return (
      <View className="h-20 w-full items-center justify-center bg-secondary/30">
        <Icon
          name="Ghost"
          size={48}
          className="text-muted-foreground/50"
          aria-label="No image available"
        />
      </View>
    );
  }

  return (
    <Image
      source={{ uri }}
      onError={() => setError(true)}
      style={{ width: '100%', aspectRatio }}
      resizeMode="contain"
      {...props}
    />
  );
};

export default AutoHeightImage;
