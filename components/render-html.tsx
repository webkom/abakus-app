import React from 'react';
import { useWindowDimensions, ScrollView } from 'react-native';
import { RenderHTML } from '@nanogiants/react-native-render-html';
import { Image } from 'expo-image'; // Optimized image rendering
import { SafeAreaView } from 'react-native-safe-area-context';

const htmlContent = `
  <h1>Hello Expo!</h1>
  <p>This is <strong>HTML content</strong> rendered as native components.</p>
  <img src="https://picsum.photos" alt="Sample Image" />
`;

export default function App() {
  const { width } = useWindowDimensions();
  // RenderHTML typings in this project don't include contentWidth — cast to any to avoid TS error
  const RenderHTMLAny = RenderHTML as any;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ padding: 16 }}>
        <RenderHTMLAny
          contentWidth={width}
          source={{ html: htmlContent }}
          // Inject expo-image for fast caching and smooth layout sizing
          renderImage={(props: any) => (
            <Image {...props} contentFit="contain" style={{ width: '100%', height: 200 }} />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
