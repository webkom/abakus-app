import React from "react";
import moment from "moment";
import { Box, Flex, Text, Image } from "native-base";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack"; // Import navigation type
import { EVENT_CONSTANTS } from "../../lib/types";

// import ShowEvent from "../../screens/ShowEvent";

export type RootStackParamList = {
  Home: undefined; // Home screen doesn't expect any parameters
  ShowEvent: { id: number }; // ShowEvent expects an 'id' parameter of type number
};

function EventItem(
  id: number,
  title: string,
  cover: string,
  location: string,
  eventType: string,
  startTime: string
) {
  const eventTypeToString = (eventT: string) => {
    return EVENT_CONSTANTS[eventT] || EVENT_CONSTANTS.other;
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Pressable onPress={() => navigation.navigate("ShowEvent", { id })}>
      <Box
        rounded="8"
        overflow="hidden"
        borderWidth="3"
        borderColor="red.900"
        width="365"
        height="260"
        shadow="30"
        bg="white"
        key={id}
        alignItems="center"
      >
        <Image
          source={{ uri: cover }}
          alt="Alternate Text"
          width="100%"
          height={110}
        />
        <Text
          color="coolGray.800"
          mt="3"
          fontWeight="medium"
          fontSize="xl"
          textAlign="center"
        >
          {title}
        </Text>
        <Text mt="2" fontSize="sm" textAlign="center" color="coolGray.700">
          {`${moment(startTime)
            .utc(true)
            .format("MMM.Do.HH:mm")} ⊙ ${location} ⊙ ${eventTypeToString(
            eventType
          )}`}
        </Text>
        <Flex>
          <Text mt="2" fontSize={18} fontWeight="medium" color="red.900">
          
            Til Påmelding
          </Text>
        </Flex>
      </Box>
    </Pressable>
  );
}

export default EventItem;
