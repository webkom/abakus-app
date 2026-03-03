import Card from '@/components/card';
import Icon from '@/components/icon';
import Input from '@/components/input';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useSignIn, useToken } from '@/lib/hooks/useAuth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { MotiView } from 'moti';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Image, View } from 'react-native';
import { z } from 'zod';

const AbakusLogo = require('@/assets/images/abakus-logo.png');
const BlurBackground = require('@/assets/images/blur-background.png');

const formSchema = z.object({
  username: z.string().min(1, 'Brukernavn er påkrevd'),
  password: z.string().min(1, 'Passord er påkrevd'),
});

const SignInPage = () => {
  const token = useToken();
  const { signInAsync, error, isPending, signOut, isError } = useSignIn();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      password: '',
      username: '',
    },
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    void signInAsync({ ...data }).then(() => {
      router.push('non-authed/onboarding');
    });
  };

  return (
    <View className="relative flex h-full flex-col">
      <StatusBar style="auto" />
      <Image
        source={BlurBackground}
        className="absolute inset-0 h-full w-full"
        resizeMode="cover"
      />

      <View className="z-30 flex h-full w-full flex-col items-center justify-center gap-5 px-10">
        <Image
          source={AbakusLogo}
          className="top-safe-offset-20 absolute h-32 w-72 max-w-full"
          resizeMode="contain"
        />
        <View className="bottom-safe-offset-10 absolute flex w-full flex-col items-center gap-5">
          {/* This is just temporary, for easy debugging and stuff */}
          {!(token === undefined || token === '') && (
            <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
              <Card variant="error" title="Allerede logget inn" className="w-full">
                <Button onPress={() => signOut()} variant="secondary" className="rounded-full">
                  <Text className="text-on-secondary font-semibold">Logg ut</Text>
                </Button>
              </Card>
            </MotiView>
          )}
          <Text className="text-on-background mt-10 w-full text-center text-lg font-semibold">
            Laget med 🌚 av Webkom
          </Text>
        </View>
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
                autoComplete: 'username',
              }}
            />
          )}
        />

        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Input
              className="w-full"
              label="Passord"
              inputProps={{
                ...field,
                secureTextEntry: true,
                value: field.value,
                onBlur: field.onBlur,
                onChangeText: field.onChange,
                autoComplete: 'password',
              }}
              error={fieldState.error?.message}
            />
          )}
        />

        <Button
          size="lg"
          className="mt-5 h-20 w-full max-w-[300px] rounded-full"
          onPress={() => {
            form.handleSubmit(handleSubmit)();
          }}>
          {!isPending && <Icon name="LogIn" className="text-primary-foreground" />}
          <Text className="text-xl text-primary-foreground">
            {isPending && <ActivityIndicator size="large" className="text-primary-foreground" />}
            {!isPending && 'Logg inn'}
          </Text>
        </Button>

        <Text className="font-bold text-destructive">
          {isError && 'Noe gikk galt under innlogging'}
        </Text>
      </View>
    </View>
  );
};

export default SignInPage;
