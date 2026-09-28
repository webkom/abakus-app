import { Link } from 'expo-router';

// Start environment variable validation
import 'env';

import { Button } from 'heroui-native';
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context';
import { withUniwind } from 'uniwind';

const SafeAreaView = withUniwind(RNSafeAreaView);

const Page = () => {
  return (
    <SafeAreaView className="flex flex-col gap-5 px-5 py-10 items-center justify-center flex-1">
      <Link href="/authed/(tabs)/events" asChild>
      <Button variant="danger" className='w-full'>
        <Button.Label>Events</Button.Label>
      </Button>
      </Link>
      <Link href="/non-authed/sign-in" asChild>
        <Button variant="danger"  className='w-full'>
          <Button.Label>Go to sign-in page</Button.Label>
        </Button>
      </Link>
      <Link href="/non-authed/onboarding" asChild>
        <Button variant="danger"  className='w-full'>
          <Button.Label>Go to Onboarding page</Button.Label>
        </Button>
      </Link>
    </SafeAreaView>
  );
};

export default Page;
