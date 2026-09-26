import { useState, useEffect } from 'react';

export function useRegistrationCountdown(activationTime?: string | null) {
  const [timeLeft, setTimeLeft] = useState<{
    isExpired: boolean;
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    formatted: string;
  }>({
    isExpired: true,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    formatted: '',
  });

  useEffect(() => {
    if (!activationTime) {
      setTimeLeft((prev) => ({ ...prev, isExpired: true, formatted: '' }));
      return;
    }

    const calculateTimeLeft = () => {
      const target = new Date(activationTime).getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff <= 0) {
        setTimeLeft({
          isExpired: true,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          formatted: 'Åpen nå',
        });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      let formatted = '';
      if (days > 0) {
        formatted = `${days} dager ${hours} timer`;
      } else if (hours > 0) {
        formatted = `${hours}t ${minutes}m ${seconds}s`;
      } else {
        formatted = `${minutes}m ${seconds}s`;
      }

      setTimeLeft({
        isExpired: false,
        days,
        hours,
        minutes,
        seconds,
        formatted,
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [activationTime]);

  return timeLeft;
}
