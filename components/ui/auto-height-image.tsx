import { useEffect, useState } from 'react';
import { Image, ImageProps } from 'react-native';

export type AutoHeightImageProps = {
  uri: string;
} & ImageProps;
const AutoHeightImage = ({ uri, ...props }: AutoHeightImageProps) => {
  const [aspectRatio, setAspectRatio] = useState(1);

  useEffect(() => {
    if (uri) {
      Image.getSize(uri, (width, height) => {
        setAspectRatio(width / height);
      });
    }
  }, [uri]);

  return (
    <Image
      source={{ uri }}
      style={{ width: '100%', aspectRatio }}
      resizeMode="contain"
      {...props}
    />
  );
};

export default AutoHeightImage;
