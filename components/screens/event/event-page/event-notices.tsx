import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Card, CardContent } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import Icon from '@/components/icon';
import { penaltyHours } from '@/lib/penalties';
import { DetailedEvent } from '@/lib/types/types';
import { format, isAfter } from 'date-fns';
import { nb } from 'date-fns/locale';
import { Link } from 'expo-router';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CircleAlert, ClockAlert } from 'lucide-react-native';

interface EventNoticesProps {
  event?: DetailedEvent;
  totalCurrentPenalties?: number;
  canSignUp?: boolean;
  isUserSignedUp?: boolean;
  className?: string;
}

export function EventNotices({
  event,
  totalCurrentPenalties = 0,
  canSignUp = false,
  isUserSignedUp = false,
  className,
}: EventNoticesProps) {
  const showPenaltyWarning = Boolean(totalCurrentPenalties > 0 && !isUserSignedUp && canSignUp);

  const unregistrationDeadline = event?.unregistrationDeadline
    ? new Date(event.unregistrationDeadline)
    : null;
  const isPastUnregisterDeadline =
    unregistrationDeadline && !isNaN(unregistrationDeadline.getTime())
      ? isAfter(new Date(), unregistrationDeadline)
      : false;

  const activationTime = event?.activationTime ? new Date(event.activationTime) : null;
  const isFutureActivation =
    activationTime && !isNaN(activationTime.getTime()) && isAfter(activationTime, new Date());

  if (!showPenaltyWarning && !unregistrationDeadline && !isFutureActivation) {
    return null;
  }

  return (
    <View className={`gap-2.5 ${className ?? ''}`}>
      {/* 1. Penalty Warning */}
      {showPenaltyWarning && (
        <Link
          className="w-full"
          href="https://abakus.no/pages/arrangementer/26-arrangementsregler"
          asChild>
          <TouchableOpacity activeOpacity={0.8}>
            <Card className="w-full border-destructive/30 bg-destructive/10 py-3">
              <CardContent className="flex-row items-center gap-3">
                <View className="h-8 w-8 items-center justify-center rounded-lg bg-destructive/20">
                  <Icon name="TriangleAlert" size={16} className="text-destructive" />
                </View>
                <View className="flex-1">
                  <Text className="text-xs font-bold uppercase tracking-wider text-destructive">
                    Du har {totalCurrentPenalties} prikk{totalCurrentPenalties !== 1 ? 'er' : ''}
                  </Text>
                  <Text className="text-xs text-destructive/90">
                    {totalCurrentPenalties > 2
                      ? `Påmelding forskjøvet med ${penaltyHours(totalCurrentPenalties)} timer.`
                      : 'Du legges på venteliste ved påmelding.'}
                  </Text>
                </View>
                <Icon name="ChevronRight" size={16} className="text-destructive" />
              </CardContent>
            </Card>
          </TouchableOpacity>
        </Link>
      )}

      {/* 2. Registration Opens Countdown / Alert */}
      {isFutureActivation && !isUserSignedUp && (
        <Card className="border-primary/20 bg-primary/5 py-3">
          <CardContent className="flex-row items-center gap-3">
            <View className="h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Icon name="Clock" size={16} className="text-primary" />
            </View>
            <View className="flex-1">
              <Text className="text-xs font-bold uppercase tracking-wider text-primary">
                Påmelding åpner snart
              </Text>
              <Text className="text-xs text-muted-foreground">
                Åpner {format(activationTime, "EEEE d. MMMM 'kl.' HH:mm", { locale: nb })}
              </Text>
            </View>
          </CardContent>
        </Card>
      )}

      {/* 3. Unregistration Deadline Notice */}
      {unregistrationDeadline && (
        <Alert
          icon={isPastUnregisterDeadline ? CircleAlert : ClockAlert}
          variant={isPastUnregisterDeadline ? 'destructive' : 'default'}>
          <AlertTitle>
            {isPastUnregisterDeadline ? 'Avmeldingsfrist utløpt' : 'Avmeldingsfrist'}
          </AlertTitle>
          <AlertDescription>
            {isPastUnregisterDeadline
              ? `Fristen var ${format(unregistrationDeadline, "d. MMM 'kl.' HH:mm", {
                  locale: nb,
                })}. Avmelding gir prikk.`
              : `${format(unregistrationDeadline, "EEEE d. MMMM 'kl.' HH:mm", { locale: nb })}`}
          </AlertDescription>
        </Alert>
        // <Card
        //   className={`py-3 ${
        //     isPastUnregisterDeadline
        //       ? 'border-destructive/30 bg-destructive/10'
        //       : 'border-amber-500/30 bg-amber-500/10'
        //   }`}>
        //   <CardContent className="flex-row items-center gap-3">
        //     <View
        //       className={`h-8 w-8 items-center justify-center rounded-lg ${
        //         isPastUnregisterDeadline ? 'bg-destructive/20' : 'bg-amber-500/20'
        //       }`}>
        //       <Icon
        //         name={isPastUnregisterDeadline ? 'CircleAlert' : 'ClockAlert'}
        //         size={16}
        //         className={isPastUnregisterDeadline ? 'text-destructive' : 'text-amber-600 dark:text-amber-400'}
        //       />
        //     </View>
        //     <View className="flex-1">
        //       <Text
        //         className={`text-xs font-bold uppercase tracking-wider ${
        //           isPastUnregisterDeadline
        //             ? 'text-destructive'
        //             : 'text-amber-900 dark:text-amber-300'
        //         }`}>
        //         {isPastUnregisterDeadline ? 'Avmeldingsfrist utløpt' : 'Avmeldingsfrist'}
        //       </Text>
        //       <Text
        //         className={`text-xs ${
        //           isPastUnregisterDeadline
        //             ? 'text-destructive/90'
        //             : 'text-amber-800 dark:text-amber-400'
        //         }`}>
        //         {isPastUnregisterDeadline
        //           ? `Fristen var ${format(unregistrationDeadline, "d. MMM 'kl.' HH:mm", { locale: nb })}. Avmelding gir prikk.`
        //           : `${format(unregistrationDeadline, "EEEE d. MMMM 'kl.' HH:mm", { locale: nb })}`}
        //       </Text>
        //     </View>
        //   </CardContent>
        // </Card>
      )}
    </View>
  );
}

export default EventNotices;
