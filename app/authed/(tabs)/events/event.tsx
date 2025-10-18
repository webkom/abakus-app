import { useLocalSearchParams } from 'expo-router';
import { View, Text, ActivityIndicator } from 'react-native';
import useEvent from '../../../../hooks/useEvent';


export default function EventsPage() {
    const { id } = useLocalSearchParams();
    const { data: eventData, isLoading, isError } = useEvent(id.toString());


    if (isLoading) {
        return (
            <View className="flex-row justify-center items-center h-full space-x-3">
                <ActivityIndicator size="large" color="#dc2626" />
                <Text className="text-xl text-red-600 font-semibold">Loading...</Text>
            </View>
        );
    }

    if (isError) {
        return (
            <View>
                <Text>
                    Fant ikke arrangement:/
                </Text>
            </View>
        )
    }


    return (
        <View>
            <Text>Event page</Text>
            <Text>Event ID: {id}</Text>
            <Text>{eventData?.title}</Text>
        </View>
    );
}