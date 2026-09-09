import React from 'react';
import { Modal, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from '@/components/icon';

interface PenaltyModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isPending?: boolean;
  showPenaltyNotice?: boolean;
}

export const PenaltyModal: React.FC<PenaltyModalProps> = ({
  visible,
  onClose,
  onConfirm,
  isPending = false,
  showPenaltyNotice = false,
}) => {
  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <View className="flex-1 items-center justify-center bg-black/50 px-5">
        <View className="w-full max-w-sm rounded-2xl bg-background p-6 shadow-xl">
          <View className="flex-row items-center gap-3">
            <View className="rounded-full bg-red-100 p-2">
              <Icon name="UserMinus" size={24} className="text-red-600" />
            </View>
            <Text className="text-xl font-bold text-gray-900">Bekreft avregistrering</Text>
          </View>

          <Text className="mt-4 text-base text-gray-700">
            Er du sikker på at du vil melde deg av dette arrangementet?
          </Text>

          {showPenaltyNotice && (
            <View className="mt-3 flex-row items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 p-3">
              <Icon name="TriangleAlert" size={18} className="text-amber-600" />
              <Text className="flex-1 text-sm font-semibold text-amber-800">
                NB: Avregistrering etter fristen medfører én prikk!
              </Text>
            </View>
          )}

          <View className="mt-6 flex-row gap-3">
            <TouchableOpacity
              onPress={onClose}
              disabled={isPending}
              className="flex-1 items-center justify-center rounded-xl bg-gray-200 py-3 active:bg-gray-300">
              <Text className="font-semibold text-gray-800">Avbryt</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={onConfirm}
              disabled={isPending}
              className="flex-1 flex-row items-center justify-center gap-2 rounded-xl bg-red-600 py-3 active:bg-red-700">
              {isPending ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <>
                  <Icon name="UserMinus" size={18} className="text-white" />
                  <Text className="font-semibold text-white">Avregistrer</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
