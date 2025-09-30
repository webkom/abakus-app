import React, { useState } from "react";
import {
  Box,
  Text,
  Heading,
  VStack,
  Button,
  Center,
  Image,
} from "native-base";
import { StyleSheet, TextInput } from "react-native";
import { login } from "../services/auth-service";

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    textAlign: "center",
  },
  input: {
    height: 45,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
});

const image = require("../assets/abakus.png");

function LoginForm() {
  const [brukernavn, setBrukernavn] = useState("");
  const [passord, setPassord] = useState("");

  const handleLogin = async () => {
    try {
      await login(brukernavn, passord);
      console.log("Login successful!");
    } catch (error) {
      console.log("ERROR");
    }
  };

  return (
    <Center flex={1} w="100%">
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Image source={image} alt="abakus-logo" width={80} height={55} />
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{ color: "warmGray.50" }}
          style={styles.container}
        >
          <Text>Login</Text>
        </Heading>

        <VStack mt="5">
          <Text>Brukernavn</Text>
          <TextInput
            style={styles.input}
            value={brukernavn}
            onChangeText={setBrukernavn}
            autoCapitalize="none"
            placeholder="Skriv brukernavn"
          />

          <Text>Passord</Text>
          <TextInput
            style={styles.input}
            value={passord}
            onChangeText={setPassord}
            autoCapitalize="none"
            placeholder="Skriv passord"
            secureTextEntry
          />

          <Button mt="3" colorScheme="red" onPress={handleLogin}>
            <Text color="white" fontSize="xl">
              Logg inn
            </Text>
          </Button>
        </VStack>
      </Box>
    </Center>
  );
}

export default LoginForm;
