import { cn } from '@/lib/cn';
import { BlurView } from '@react-native-community/blur';
import React, { useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import { useFonts, PixelifySans_400Regular } from '@expo-google-fonts/pixelify-sans';
import Input from '@/components/input';
import Button from '@/components/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
const AbakusLogo = require('@/assets/images/abakus-logo.png');

const formSchema = z.object({
  username: z.string().min(1, 'Brukernavn er påkrevd'),
  password: z.string().min(1, 'Passord er påkrevd'),
});

const SignInPage = () => {
  const _ = useFonts({
    PixelifySans_400Regular,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      password: '',
      username: '',
    },
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    alert('Yes');
    console.log(data);
  };

  form.handleSubmit(handleSubmit);

  return (
    <View className="relative flex h-full flex-col">
      <View className={cn(blobStyle, '-left-3/4 top-0 -translate-y-1/2')} />
      <View className={cn(blobStyle, '-bottom-0 -right-3/4 translate-y-1/2')} />
      <View className={cn(blobStyle, '-right-3/4 top-0  bg-[#0A613033]')} />
      <View className={cn(blobStyle, '-left-3/4 bottom-0  bg-[#DBA7FD66]')} />
      <BlurView
        style={{
          width: '100%',
          position: 'relative',
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        blurType="light"
        blurAmount={30}
        reducedTransparencyFallbackColor="white">
        <View className="z-30 flex h-full w-full flex-col items-center justify-center gap-5 px-10">
          <Image
            source={AbakusLogo}
            className="top-safe-offset-20 absolute h-32 w-96 max-w-full"
            resizeMode="contain"
          />
          <Text className="bottom-safe-offset-10 absolute w-full text-center text-lg font-semibold text-on-background">
            Laget med 💖 av Webkom
          </Text>
          <Text
            style={{
              fontFamily: 'PixelifySans_400Regular',
            }}
            className="text-5xl text-primary">
            &gt; Velkommen
          </Text>

          <Input
            className="mt-5 w-full"
            label="Brukernavn"
            error={form.formState.errors.username?.message}
            inputProps={{
              ...form.register('username'),
            }}
          />
          <Input
            className="mt-5 w-full"
            label="Passord"
            inputProps={{
              secureTextEntry: true,
              onChange: (e) => form.register('password').onChange,
            }}
            error={form.formState.errors.password?.message}
          />
          <Button size="lg" className="mt-5 w-full max-w-[300px]" onPress={() => form.trigger()}>
            <Text className="text-xl font-semibold text-on-primary">Logg inn</Text>
          </Button>
        </View>
      </BlurView>
    </View>
  );
};

const blobStyle = 'absolute z-10 aspect-square w-[150%] rounded-full bg-red-500/50';

export default SignInPage;
