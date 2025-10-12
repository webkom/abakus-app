import Button from '@/components/button';
import Input from '@/components/input';
import { cn } from '@/lib/cn';
import { PixelifySans_400Regular, useFonts } from '@expo-google-fonts/pixelify-sans';
import { zodResolver } from '@hookform/resolvers/zod';
import { BlurView } from '@react-native-community/blur';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, Text, View } from 'react-native';
import { z } from 'zod';
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
    console.log(data);
  };

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

          <Controller
            control={form.control}
            name={'username'}
            render={({ field, fieldState }) => (
              <Input
                className="mt-5 w-full"
                label="Brukernavn"
                error={fieldState.error?.message}
                inputProps={{
                  value: field.value,
                  onBlur: field.onBlur,
                  onChangeText: field.onChange,
                  autoCapitalize: 'none',
                }}
              />
            )}
          />

          <Controller
            control={form.control}
            name="password"
            render={({ field, fieldState }) => (
              <Input
                className="mt-2.5 w-full"
                label="Passord"
                inputProps={{
                  ...field,
                  secureTextEntry: true,
                  value: field.value,
                  onBlur: field.onBlur,
                  onChangeText: field.onChange,
                }}
                error={fieldState.error?.message}
              />
            )}
          />
          <Button
            size="lg"
            className="mt-5 w-full max-w-[300px]"
            onPress={() => {
              form.handleSubmit(handleSubmit)();
            }}>
            <Text className="text-xl font-semibold text-on-primary">Logg inn</Text>
          </Button>
        </View>
      </BlurView>
    </View>
  );
};

const blobStyle = 'absolute z-10 aspect-square w-[150%] rounded-full bg-red-500/50';

export default SignInPage;
