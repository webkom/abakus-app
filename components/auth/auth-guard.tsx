import { useToken } from '@/lib/hooks/useAuth';
import { useUser } from '@/lib/hooks/useUser';
import { usePathname, useRouter } from 'expo-router';
import React, { useEffect } from 'react';

type AuthGuardProps = {
  children: React.ReactNode;
};

const AuthGuard = ({ children }: AuthGuardProps) => {
  const token = useToken();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!token) {
      if (pathname.startsWith('/authed')) {
        router.push('/non-authed/sign-in');
      }
    }

    if (pathname.startsWith('/non-authed') && token) {
      router.push('/authed/events');
    }
  }, [token, pathname, router]);

  return <>{children}</>;
};

export default AuthGuard;
