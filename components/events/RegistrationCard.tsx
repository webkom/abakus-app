import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import Card from '@/components/card';
import Icon from '@/components/icon';
import { useRegistrationCountdown } from '@/lib/hooks/useRegistrationCountdown';
import { PenaltyModal } from './PenaltyModal';

interface RegistrationCardProps {
  activationTime?: string | null;
  unregistrationDeadline?: string | null;
  userReg?: any | null;
  isAdmitted?: boolean;
  registrationCount?: number;
  totalCapacity?: number;
  onRegister: (feedback: string) => Promise<any>;
  onUnregister: (registrationId: number) => Promise<any>;
  isRegistering?: boolean;
  isUnregistering?: boolean;
  eventStatusType?: string;
}

export const RegistrationCard: React.FC<RegistrationCardProps> = ({
  activationTime,
  unregistrationDeadline,
  userReg,
  isAdmitted,
  onRegister,
  onUnregister,
  isRegistering = false,
  isUnregistering = false,
}) => {
  const countdown = useRegistrationCountdown(activationTime);
  const [feedback, setFeedback] = useState('');
  const [showPenaltyModal, setShowPenaltyModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isRegistered = Boolean(userReg);
  const isPendingOpening = !countdown.isExpired;
  const isPastUnregisterDeadline = unregistrationDeadline
    ? new Date() > new Date(unregistrationDeadline)
    : false;

  const handleRegister = async () => {
    setErrorMsg(null);
    try {
      await onRegister(feedback);
    } catch (err: any) {
      console.error('Registration failed:', err);
      setErrorMsg('Klarte ikke å melde på. Vennligst prøv igjen.');
    }
  };

  const handleConfirmUnregister = async () => {
    if (!userReg?.id) return;
    setErrorMsg(null);
    try {
      await onUnregister(userReg.id);
      setShowPenaltyModal(false);
    } catch (err: any) {
      console.error('Unregistration failed:', err);
      setErrorMsg('Klarte ikke å melde av. Vennligst prøv igjen.');
    }
  };

  return (
    <Card className="gap-4 border border-gray-200 bg-background p-5 shadow-sm">
      {/* Registration Status Header */}
      <View className="flex-row items-center justify-between">
        {isRegistered ? (
          <View
            className={`flex-row items-center gap-1.5 rounded-full px-3 py-1 ${
              isAdmitted ? 'bg-green-100' : 'bg-amber-100'
            }`}>
            <Icon
              name={isAdmitted ? 'CircleCheck' : 'Clock'}
              size={16}
              className={isAdmitted ? 'text-green-700' : 'text-amber-700'}
            />
            <Text
              className={`text-xs font-semibold ${
                isAdmitted ? 'text-green-800' : 'text-amber-800'
              }`}>
              {isAdmitted ? 'Påmeldt (Plass bekreftet)' : 'På venteliste'}
            </Text>
          </View>
        ) : (
          <View className="rounded-full bg-gray-100 px-3 py-1">
            <Text className="text-xs font-semibold text-gray-600">
              {isPendingOpening ? 'Åpner snart' : 'Ikke påmeldt'}
            </Text>
          </View>
        )}
      </View>

      {/* Error display */}
      {errorMsg && (
        <View className="flex-row items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3">
          <Icon name="CircleAlert" size={16} className="text-red-600" />
          <Text className="flex-1 text-xs font-medium text-red-700">{errorMsg}</Text>
        </View>
      )}

      {/* Countdown View */}
      {isPendingOpening && !isRegistered && (
        <View className="items-center rounded-xl border border-red-100 bg-red-50/60 p-4">
          <Text className="text-xs font-semibold uppercase tracking-wider text-red-600">
            Påmeldingen åpner om
          </Text>
          <Text className="mt-1 text-2xl font-bold text-red-700">{countdown.formatted}</Text>
        </View>
      )}

      {/* Registration / Unregistration Actions */}
      {!isRegistered ? (
        <TouchableOpacity
          onPress={handleRegister}
          disabled={isPendingOpening || isRegistering}
          className={`flex-row items-center justify-center gap-2 rounded-xl py-3.5 ${
            isPendingOpening || isRegistering ? 'bg-gray-300' : 'bg-red-600 active:bg-red-700'
          }`}>
          {isRegistering ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <>
              <Icon name="BadgeCheck" size={20} className="text-white" />
              <Text className="text-base font-bold text-white">
                {isPendingOpening ? 'Påmelding ikke åpnet' : 'Meld deg på'}
              </Text>
            </>
          )}
        </TouchableOpacity>
      ) : (
        <View className="gap-3">
          {userReg?.feedback ? (
            <View className="rounded-xl border border-gray-200 bg-gray-50 p-3">
              <Text className="text-xs font-semibold text-gray-500">Din tilbakemelding:</Text>
              <Text className="mt-0.5 text-sm text-gray-800">{userReg.feedback}</Text>
            </View>
          ) : null}

          <TouchableOpacity
            onPress={() => setShowPenaltyModal(true)}
            disabled={isUnregistering}
            className="flex-row items-center justify-center gap-2 rounded-xl border border-gray-300 bg-gray-100 py-3.5 active:bg-gray-200">
            {isUnregistering ? (
              <ActivityIndicator color="#dc2626" />
            ) : (
              <>
                <Icon name="UserMinus" size={20} className="text-red-600" />
                <Text className="text-base font-bold text-red-600">Avregistrer deg</Text>
              </>
            )}
          </TouchableOpacity>

          <PenaltyModal
            visible={showPenaltyModal}
            onClose={() => setShowPenaltyModal(false)}
            onConfirm={handleConfirmUnregister}
            isPending={isUnregistering}
            showPenaltyNotice={isPastUnregisterDeadline}
          />
        </View>
      )}
    </Card>
  );
};
