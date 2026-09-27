import { useState, useEffect } from 'react';

export interface RegistrationCountdown {
  isExpired: boolean;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  formatted: string;
}

const DEFAULT_STATE: RegistrationCountdown = {
  isExpired: true,
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  formatted: '',
};

function calculateCountdown(activationTime?: string | null): RegistrationCountdown {
  if (!activationTime) {
    return DEFAULT_STATE;
  }

  const target = new Date(activationTime).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) {
    return {
      isExpired: true,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      formatted: 'Åpen nå',
    };
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

  return {
    isExpired: false,
    days,
    hours,
    minutes,
    seconds,
    formatted,
  };
}

export function useRegistrationCountdown(activationTime?: string | null): RegistrationCountdown {
  const [, setTick] = useState(0);

  useEffect(() => {
    if (!activationTime) {
      return;
    }

    const target = new Date(activationTime).getTime();
    if (target <= Date.now()) {
      return;
    }

    const interval = setInterval(() => {
      setTick((prev) => prev + 1);
      if (new Date(activationTime).getTime() <= Date.now()) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [activationTime]);

  return calculateCountdown(activationTime);
}
